// controllers/imageController.js
const Image = require('../models/imageModel');

// API Route to Add a New Image
exports.addImage = async (req, res) => {
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
};

// API Route to Get All Images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching images', error: err });
  }
};

// API Route to Get a Single Image by ID
exports.getImageById = async (req, res) => {
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
};

// API Route to Update an Image's Title or URL
exports.updateImage = async (req, res) => {
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
};

// API Route to Like an Image
exports.likeImage = async (req, res) => {
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
};


exports.unlikeImage = async (req, res) => {
    const { id } = req.params;
    try {
      const image = await Image.findById(id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      if (image.likes > 0) {
        image.likes -= 1;
      }
      await image.save();
      res.status(200).json({ message: 'Image unliked', likes: image.likes });
    } catch (err) {
      res.status(500).json({ message: 'Error unliking image', error: err });
    }
  };
// API Route to Follow an Image
exports.followImage = async (req, res) => {
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
};


exports.unfollowImage = async (req, res) => {
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
  };
// API Route to Add a Tag to an Image
exports.addTag = async (req, res) => {
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
};

// API Route to Remove a Tag from an Image
exports.removeTag = async (req, res) => {
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
};
