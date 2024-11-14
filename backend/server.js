// server.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the express app
const app = express();

app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = process.env.NODE_ENV === 'test' 
  ? 'mongodb://localhost:27017/imagesDB_test' 
  : 'mongodb://localhost:27017/imagesDB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

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

// API Route to Add a New Image
app.post('/images', async (req, res) => {
  const { title, imageUrl } = req.body;

  if (!title || !imageUrl) {
    return res.status(400).json({ message: 'Title and image URL are required' });
  }

  try {
    const newImage = new Image({ title, imageUrl });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: 'Error adding image', error: err });
  }
});

// API Route to Get All Images
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching images', error: err });
  }
});

// API Route to Get a Single Image by ID
app.get('/images/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching image', error: err });
  }
});

// API Route to Update an Image's Title or URL
app.put('/images/:id', async (req, res) => {
  const { id } = req.params;
  const { title, imageUrl } = req.body;

  if (!title || !imageUrl) {
    return res.status(400).json({ message: 'Title and image URL are required' });
  }

  try {
    const image = await Image.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true } // Returns the updated image
    );
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Error updating image', error: err });
  }
});

// API Route to Like an Image
app.post('/images/:id/like', async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    image.likes += 1;
    await image.save();
    res.status(200).json({ message: 'Image liked', likes: image.likes });
  } catch (err) {
    res.status(500).json({ message: 'Error liking image', error: err });
  }
});

app.post('/images/:id/unlike', async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    // Ensure likes don't go below 0
    if (image.likes > 0) {
      image.likes -= 1;
    }
    await image.save();
    res.status(200).json({ message: 'Image unliked', likes: image.likes });
  } catch (err) {
    res.status(500).json({ message: 'Error unliking image', error: err });
  }
});

// API Route to Unfollow an Image
app.post('/images/:id/unfollow', async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    image.followers -= 1;
    await image.save();
    res.status(200).json({ message: 'Unfollowed image', followers: image.followers });
  } catch (err) {
    res.status(500).json({ message: 'Error unfollowing image', error: err });
  }
});

// API Route to Follow an Image
app.post('/images/:id/follow', async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    image.followers += 1;
    await image.save();
    res.status(200).json({ message: 'Image followed', followers: image.followers });
  } catch (err) {
    res.status(500).json({ message: 'Error following image', error: err });
  }
});

// API Route to Add a Tag to an Image
app.post('/images/:id/tag', async (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;

  if (!tag) {
    return res.status(400).json({ message: 'Tag is required' });
  }

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    image.tags.push(tag);
    await image.save();
    res.status(200).json({ message: 'Tag added', tags: image.tags });
  } catch (err) {
    res.status(500).json({ message: 'Error adding tag', error: err });
  }
});

// API Route to Remove a Tag from an Image
app.post('/images/:id/untag', async (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;

  if (!tag) {
    return res.status(400).json({ message: 'Tag is required' });
  }

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    image.tags = image.tags.filter(t => t !== tag);
    await image.save();
    res.status(200).json({ message: 'Tag removed', tags: image.tags });
  } catch (err) {
    res.status(500).json({ message: 'Error removing tag', error: err });
  }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





module.exports = app; 