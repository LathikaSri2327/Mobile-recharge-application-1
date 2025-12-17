const mongoose = require('mongoose');
const Plan = require('./models/Plan');
require('dotenv').config();

const seedAdvancedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mobile-recharge');
    
    // Clear existing plans
    await Plan.deleteMany({});
    
    // Comprehensive plan data with categories
    const planCategories = {
      // Airtel Plans
      airtel: [
        { name: 'Airtel Smart 149', amount: 149, validity: '21 Days', data: '1GB/day', description: 'Unlimited calls + 100 SMS/day' },
        { name: 'Airtel Popular 299', amount: 299, validity: '28 Days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day' },
        { name: 'Airtel Max 499', amount: 499, validity: '28 Days', data: '3GB/day', description: 'Unlimited calls + 100 SMS/day + Disney+ Hotstar' },
        { name: 'Airtel Unlimited 699', amount: 699, validity: '56 Days', data: '1.5GB/day', description: 'Unlimited calls + Netflix + Amazon Prime' }
      ],
      
      // Jio Plans
      jio: [
        { name: 'Jio Smart 155', amount: 155, validity: '24 Days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day + JioApps' },
        { name: 'Jio Popular 329', amount: 329, validity: '28 Days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day + JioApps' },
        { name: 'Jio Premium 599', amount: 599, validity: '84 Days', data: '2GB/day', description: 'Unlimited calls + JioApps + Netflix' },
        { name: 'Jio Annual 2999', amount: 2999, validity: '365 Days', data: '2GB/day', description: 'Best annual value with all JioApps' }
      ],
      
      // Vi (Vodafone Idea) Plans
      vi: [
        { name: 'Vi Start 179', amount: 179, validity: '28 Days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day' },
        { name: 'Vi Hero 359', amount: 359, validity: '28 Days', data: '3GB/day', description: 'Unlimited calls + Vi Movies & TV' },
        { name: 'Vi Max 719', amount: 719, validity: '84 Days', data: '1.5GB/day', description: 'Unlimited calls + Weekend data rollover' }
      ],
      
      // BSNL Plans
      bsnl: [
        { name: 'BSNL Value 187', amount: 187, validity: '28 Days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day' },
        { name: 'BSNL Special 319', amount: 319, validity: '54 Days', data: '2GB/day', description: 'Extended validity plan' },
        { name: 'BSNL Annual 1999', amount: 1999, validity: '365 Days', data: '2GB/day', description: 'Government network reliability' }
      ],
      
      // Data Only Plans
      dataOnly: [
        { name: 'Data Booster 19', amount: 19, validity: '1 Day', data: '1GB', description: 'Emergency data top-up' },
        { name: 'Data Pack 48', amount: 48, validity: '3 Days', data: '3GB', description: 'Short term data' },
        { name: 'Data Weekly 98', amount: 98, validity: '7 Days', data: '12GB', description: 'Weekly data pack' },
        { name: 'Data Monthly 251', amount: 251, validity: '30 Days', data: '50GB', description: 'High speed monthly data' }
      ],
      
      // Special Offers
      special: [
        { name: 'Student Special 199', amount: 199, validity: '28 Days', data: '2GB/day', description: 'Student ID required' },
        { name: 'Senior Citizen 149', amount: 149, validity: '28 Days', data: '1.5GB/day', description: '60+ age verification needed' },
        { name: 'Night Owl 99', amount: 99, validity: '30 Days', data: '2GB (11PM-6AM)', description: 'Night time unlimited' },
        { name: 'Weekend Warrior 129', amount: 129, validity: '8 Days', data: '5GB/day (Sat-Sun)', description: 'Weekend special' }
      ],
      
      // International Plans
      international: [
        { name: 'Global Roaming 1499', amount: 1499, validity: '30 Days', data: '5GB', description: 'Works in 50+ countries' },
        { name: 'ISD Pack 399', amount: 399, validity: '28 Days', data: '2GB/day', description: '100 min international calls' },
        { name: 'Travel Pack 999', amount: 999, validity: '15 Days', data: '10GB', description: 'Perfect for short trips' }
      ]
    };
    
    // Flatten all plans into single array
    const allPlans = [];
    Object.keys(planCategories).forEach(category => {
      planCategories[category].forEach(plan => {
        allPlans.push({
          ...plan,
          category: category,
          isActive: true
        });
      });
    });
    
    await Plan.insertMany(allPlans);
    
    console.log(`\n✅ Successfully seeded ${allPlans.length} plans!`);
    console.log('\n📊 Plan Distribution:');
    Object.keys(planCategories).forEach(category => {
      console.log(`   ${category.toUpperCase()}: ${planCategories[category].length} plans`);
    });
    
    console.log('\n💰 Price Range: ₹19 - ₹2999');
    console.log('⏰ Validity Range: 1 Day - 365 Days');
    console.log('📱 Data Range: 1GB - Unlimited');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding plans:', error);
    process.exit(1);
  }
};

seedAdvancedPlans();