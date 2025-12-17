const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  console.log('Registration attempt:', req.body.email);
  let { firstName, lastName, email, phone, password, role } = req.body;

  // Trim inputs
  firstName = String(firstName || '').trim();
  lastName = String(lastName || '').trim();
  email = String(email || '').trim().toLowerCase();
  phone = String(phone || '').trim();

  // Enhanced validation
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }

  // Phone validation
  if (phone.length < 10) {
    return res.status(400).json({ message: 'Please enter a valid phone number' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  const user = new User({
    firstName,
    lastName,
    email,
    phone,
    password,
    role: role || 'customer'
  });

  await user.save();
  console.log('User created successfully:', user.email);
  
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    message: 'User created successfully',
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    }
  });
});

const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  email = String(email || '').trim().toLowerCase();
  console.log('Login attempt:', email);
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  if (user.status !== 'active') {
    return res.status(403).json({ message: 'Account is suspended or inactive' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  console.log('Login successful for:', user.email);
  
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      wallet: user.wallet
    }
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  let { email } = req.body;
  email = String(email || '').trim().toLowerCase();
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: 'If the email exists, reset instructions have been sent' });
  }
  
  console.log('Password reset requested for:', email);
  
  res.json({ message: 'If the email exists, reset instructions have been sent' });
});

module.exports = { register, login, forgotPassword };