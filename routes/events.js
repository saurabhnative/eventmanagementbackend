const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Route for creating a new event
router.post('/', eventController.createEvent);

// Route for retrieving all events
router.get('/', eventController.getAllEvents);

// Route for retrieving a specific event by ID
router.get('/:id', eventController.getEventById);

// Route for updating an event by ID
router.put('/:id', eventController.updateEventById);

// Route for deleting an event by ID
router.delete('/:id', eventController.deleteEventById);

module.exports = router;
