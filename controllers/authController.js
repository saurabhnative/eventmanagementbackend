const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate a JSON Web Token (JWT) for authentication
      const token = jwt.sign({ userId: user._id }, 'event_auth');

      // Send the token in the response
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUserById: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ user: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate(
        'eventsOrganizing',
        'title description'
      );
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = authController;
