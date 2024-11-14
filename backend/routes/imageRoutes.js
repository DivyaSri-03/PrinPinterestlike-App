// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Image routes
router.post('/images', imageController.addImage);
router.get('/images', imageController.getAllImages);
router.get('/images/:id', imageController.getImageById);
router.put('/images/:id', imageController.updateImage);
router.post('/images/:id/like', imageController.likeImage);
router.post('/images/:id/unlike', imageController.unlikeImage);
router.post('/images/:id/follow', imageController.followImage);
router.post('/images/:id/unfollow', imageController.unfollowImage);
router.post('/images/:id/tag', imageController.addTag);
router.post('/images/:id/untag', imageController.removeTag);

module.exports = router;
