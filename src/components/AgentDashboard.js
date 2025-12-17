import React, { useState, useEffect } from 'react';
import './AgentDashboard.css';

const AgentDashboard = () => {
  const [rechargeData, setRechargeData] = useState({
    phoneNumber: '',
    amount: '',
    operator: ''
  });
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const operators = ['Airtel', 'Jio', 'Vi', 'BSNL'];

  useEffect(() => {
    fetchRechargeHistory();
  }, []);

  const fetchRechargeHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/agent/recharges', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setRechargeHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleInputChange = (e) => {
    setRechargeData({
      ...rechargeData,
      [e.target.name]: e.target.value
    });
  };

  const processRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/recharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          phoneNumber: rechargeData.phoneNumber,
          amount: parseFloat(rechargeData.amount),
          operator: rechargeData.operator,
          status: 'completed'
        })
      });

      if (response.ok) {
        alert('Recharge processed successfully!');
        // Clear form fields after successful recharge processing
        setRechargeData({ phoneNumber: '', amount: '', operator: '' });
        fetchRechargeHistory();
        
        // Notify other components about recharge completion
        window.dispatchEvent(new CustomEvent('rechargeCompleted'));
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to process recharge');
      }
    } catch (error) {
      console.error('Error processing recharge:', error);
      alert('Error processing recharge');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      completed: 'status-success',
      pending: 'status-warning',
      failed: 'status-error'
    };
    return <span className={`status-badge ${statusClass[status]}`}>{status}</span>;
  };

  return (
    <div className="agent-dashboard">
      <div className="dashboard-header">
        <h1>Agent Dashboard</h1>
        <p>Process customer recharges and manage transactions</p>
      </div>

      <div className="dashboard-content">
        {/* Process Recharge Section */}
        <div className="card recharge-form-card">
          <div className="card-header">
            <h2>Process Customer Recharge</h2>
          </div>
          <form onSubmit={processRecharge} className="recharge-form">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={rechargeData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter 10-digit mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={rechargeData.amount}
                onChange={handleInputChange}
                placeholder="Enter recharge amount"
                min="10"
                max="5000"
                required
              />
            </div>

            <div className="form-group">
              <label>Operator</label>
              <select
                name="operator"
                value={rechargeData.operator}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Operator</option>
                {operators.map(op => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className="process-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Process Recharge'}
            </button>
          </form>
        </div>

        {/* Recharge History Section */}
        <div className="card history-card">
          <div className="card-header">
            <h2>Customer Recharge History</h2>
            <span className="record-count">{rechargeHistory.length} records</span>
          </div>
          
          <div className="table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rechargeHistory.length > 0 ? (
                  rechargeHistory.map((recharge, index) => (
                    <tr key={index} className="table-row">
                      <td className="customer-cell">
                        <div className="customer-info">
                          <div className="customer-avatar">
                            {recharge.userId?.firstName?.[0] || 'U'}
                          </div>
                          <span>
                            {recharge.userId?.firstName} {recharge.userId?.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="phone-cell">
                        {recharge.phoneNumber || recharge.userId?.phone}
                      </td>
                      <td className="amount-cell">
                        ₹{recharge.amount}
                      </td>
                      <td className="date-cell">
                        {new Date(recharge.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="status-cell">
                        {getStatusBadge(recharge.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No recharge history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;