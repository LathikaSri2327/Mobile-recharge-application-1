import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedService, setSelectedService] = useState('');
  const [billDetails, setBillDetails] = useState({
    consumerNumber: '',
    amount: '',
    billType: ''
  });
  const [rechargeProgress, setRechargeProgress] = useState(null);
  const [billProgress, setBillProgress] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const rechargePlans = [
    { name: 'Basic Plan', amount: 199, validity: '28 Days', data: '1GB/day' },
    { name: 'Standard Plan', amount: 299, validity: '30 Days', data: '2GB/day' },
    { name: 'Premium Plan', amount: 499, validity: '28 Days', data: 'Unlimited' },
    { name: 'Ultra Plan', amount: 699, validity: '30 Days', data: '5GB/day' },
    { name: 'Family Plan', amount: 999, validity: '30 Days', data: '10GB shared' },
    { name: 'Student Plan', amount: 149, validity: '28 Days', data: '500MB/day' },
    { name: 'Senior Plan', amount: 99, validity: '30 Days', data: '200MB/day' },
    { name: 'Business Plan', amount: 1299, validity: '30 Days', data: '20GB/day' },
    { name: 'Gaming Plan', amount: 799, validity: '28 Days', data: '8GB/day' },
    { name: 'Entertainment Plan', amount: 599, validity: '30 Days', data: '4GB/day' },
    { name: 'Travel Plan', amount: 399, validity: '15 Days', data: '3GB/day' },
    { name: 'Weekend Plan', amount: 249, validity: '7 Days', data: '2GB/day' }
  ];

  const billServices = [
    { id: 'electric', name: 'Electricity Bill', icon: '⚡', color: '#FFD700' },
    { id: 'water', name: 'Water Bill', icon: '💧', color: '#00BFFF' },
    { id: 'dth', name: 'DTH Recharge', icon: '📺', color: '#FF4500' }
  ];

  const handleRecharge = (planIndex) => {
    setRechargeProgress(planIndex);
    setSuccessMessage('');
    // Simulate progress
    setTimeout(() => {
      setRechargeProgress(null);
      setSuccessMessage('Recharge successfully completed!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 3000);
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();
    setBillProgress(selectedService);
    setSuccessMessage('');
    // Simulate progress
    setTimeout(() => {
      setBillProgress(null);
      setSuccessMessage('Bill payment successfully completed!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 3000);
  };

  return (
    <div className="dashboard">
      <div className="container">
        <motion.h1 
          className="dashboard-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Dashboard
        </motion.h1>

        {/* Recharge Plans Section */}
        <motion.section 
          className="dashboard-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Mobile Recharge Plans</h2>
          <div className="plans-grid">
            {rechargePlans.map((plan, index) => (
              <motion.div
                key={index}
                className="plan-card card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3>{plan.name}</h3>
                <div className="plan-amount">₹{plan.amount}</div>
                <p>Validity: {plan.validity}</p>
                <p>Data: {plan.data}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleRecharge(index)}
                  disabled={rechargeProgress === index}
                >
                  {rechargeProgress === index ? 'Recharging...' : 'Recharge'}
                </button>
                {rechargeProgress === index && (
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bill Payments Section */}
        <motion.section 
          className="dashboard-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Bill Payments</h2>
          <div className="bill-services">
            {billServices.map((service) => (
              <motion.div
                key={service.id}
                className="service-card"
                style={{ backgroundColor: service.color }}
                onClick={() => setSelectedService(service.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.name}</h3>
              </motion.div>
            ))}
          </div>

          {selectedService && (
            <motion.div 
              className="bill-form card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3>Pay {billServices.find(s => s.id === selectedService)?.name}</h3>
              <form onSubmit={handleBillSubmit}>
                <div className="form-group">
                  <label>Consumer/Account Number</label>
                  <input
                    type="text"
                    value={billDetails.consumerNumber}
                    onChange={(e) => setBillDetails({...billDetails, consumerNumber: e.target.value})}
                    placeholder="Enter consumer number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    value={billDetails.amount}
                    onChange={(e) => setBillDetails({...billDetails, amount: e.target.value})}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={billProgress === selectedService}
                >
                  {billProgress === selectedService ? 'Processing...' : 'Pay Bill'}
                </button>
                {billProgress === selectedService && (
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </motion.section>

        {successMessage && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {successMessage}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;