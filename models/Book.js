const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    trim: true
  },
  year: {
    type: Number
  },
  genres: {
    type: [String]
  }
}, { timestamps: true });

bookSchema.index({ title: 1 });

module.exports = mongoose.model('Book', bookSchema);
