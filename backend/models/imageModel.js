// models/imageModel.js
const mongoose = require('mongoose');

// Define the Image Schema
const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
  tags: [String],  // Store tags as an array of strings
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
