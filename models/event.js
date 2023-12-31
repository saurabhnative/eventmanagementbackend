const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  ticketQuantity: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  organizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  attendees: [
    {
      type: String,
      required: false,
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
