const mongoose = require('mongoose');

const BookRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'returned'],
      default: 'pending',
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    responseDate: Date,
  },
  { timestamps: true }
);

const BookRequest = mongoose.model('BookRequest', BookRequestSchema);

module.exports = BookRequest;