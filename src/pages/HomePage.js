import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <motion.section 
          className="hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Quick Recharge with RechargeYou
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Instant recharge for all major operators
            </motion.p>
          </div>
          
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="features-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            {[
              { title: 'Instant Recharge', desc: 'Lightning fast processing' },
              { title: 'Secure Payment', desc: 'Bank-level security' },
              { title: 'Best Offers', desc: 'Exclusive cashback deals' },
              { title: '24/7 Support', desc: 'Round the clock assistance' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="cta-card card">
            <h2>New User?</h2>
            <p>Join thousands of satisfied customers and get exclusive offers!</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up Now
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;