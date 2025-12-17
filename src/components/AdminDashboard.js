import React, { useState, useEffect } from 'react';
import { apiController } from '../controller/apiController';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planForm, setPlanForm] = useState({ name: '', amount: '', validity: '', data: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, statsData] = await Promise.all([
        apiController.getAllUsers(),
        apiController.getSystemStats()
      ]);
      setUsers(usersData);
      setStats(statsData);
      await fetchPlans();
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/plans', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan._id);
    setPlanForm({
      name: plan.name,
      amount: plan.amount,
      validity: plan.validity,
      data: plan.data
    });
  };

  const handleSavePlan = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/plans/${editingPlan}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(planForm)
      });
      
      if (response.ok) {
        alert('Plan updated successfully!');
        // Clear form fields after successful update
        setEditingPlan(null);
        setPlanForm({ name: '', amount: '', validity: '', data: '' });
        fetchPlans();
        window.dispatchEvent(new CustomEvent('plansUpdated'));
      }
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await apiController.updateUserStatus(userId, status);
      loadData();
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'status-badge status-active',
      inactive: 'status-badge status-inactive',
      suspended: 'status-badge status-suspended'
    };
    return statusClasses[status] || 'status-badge';
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      admin: 'role-badge role-admin',
      agent: 'role-badge role-agent',
      customer: 'role-badge role-customer'
    };
    return roleClasses[role] || 'role-badge';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Manage users and monitor system performance</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers || 0}</p>
          </div>
        </div>
        <div className="stat-card stat-success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Active Users</h3>
            <p className="stat-number">{stats.activeUsers || 0}</p>
          </div>
        </div>
        <div className="stat-card stat-info">
          <div className="stat-icon">📱</div>
          <div className="stat-content">
            <h3>Total Recharges</h3>
            <p className="stat-number">{stats.totalRecharges || 0}</p>
          </div>
        </div>
        <div className="stat-card stat-warning">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-number">₹{stats.totalRevenue || 0}</p>
          </div>
        </div>
      </div>

      <div className="users-section">
        <div className="section-header">
          <h2>User Management</h2>
          <div className="user-count">{users.length} users</div>
        </div>
        
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="user-row">
                  <td className="user-name">
                    <div className="name-container">
                      <div className="avatar">
                        {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                      </div>
                      <span>{user.firstName} {user.lastName}</span>
                    </div>
                  </td>
                  <td className="user-email">{user.email}</td>
                  <td>
                    <span className={getRoleBadge(user.role)}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="status-select"
                      value={user.status} 
                      onChange={(e) => handleStatusChange(user._id, e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="plans-section">
        <div className="section-header">
          <h2>Manage Recharge Plans</h2>
        </div>
        <div className="plans-management">
          {plans.map((plan) => (
            <div key={plan._id} className="plan-item" style={{
              background: 'white',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '1px solid #ddd'
            }}>
              {editingPlan === plan._id ? (
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', alignItems: 'center'}}>
                  <input
                    type="text"
                    value={planForm.name}
                    onChange={(e) => setPlanForm({...planForm, name: e.target.value})}
                    placeholder="Plan Name"
                    style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                  />
                  <input
                    type="number"
                    value={planForm.amount}
                    onChange={(e) => setPlanForm({...planForm, amount: e.target.value})}
                    placeholder="Amount"
                    style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                  />
                  <input
                    type="text"
                    value={planForm.validity}
                    onChange={(e) => setPlanForm({...planForm, validity: e.target.value})}
                    placeholder="Validity"
                    style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                  />
                  <input
                    type="text"
                    value={planForm.data}
                    onChange={(e) => setPlanForm({...planForm, data: e.target.value})}
                    placeholder="Data"
                    style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                  />
                  <div style={{display: 'flex', gap: '5px'}}>
                    <button onClick={handleSavePlan} style={{
                      background: '#28a745', color: 'white', border: 'none',
                      padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'
                    }}>Save</button>
                    <button onClick={() => setEditingPlan(null)} style={{
                      background: '#6c757d', color: 'white', border: 'none',
                      padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'
                    }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <strong>{plan.name}</strong> - ₹{plan.amount} - {plan.validity} - {plan.data}
                  </div>
                  <button onClick={() => handleEditPlan(plan)} style={{
                    background: '#007bff', color: 'white', border: 'none',
                    padding: '8px 12px', borderRadius: '4px', cursor: 'pointer'
                  }}>Edit</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;