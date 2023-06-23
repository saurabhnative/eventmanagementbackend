const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// Route for updating an event by ID
router.put('/:id', authController.updateUserById);

// Route for getting all users
router.get('/', authController.getAllUsers);

// Route to get user by ID
router.get('/:id', authController.getUserById);

module.exports = router;
