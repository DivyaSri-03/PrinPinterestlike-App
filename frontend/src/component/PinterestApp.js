import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ImageCard from './imageCard';
import Header from './header';
import { fetchImages, likeImage, followImage, addTagToImage } from '../api'; // Import the API functions

const PinterestApp = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagInputVisible, setTagInputVisible] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetchImages(); // Use the fetchImages API function
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleLike = async (imageId, isLiked) => {
    try {
      const response = isLiked ? await likeImage(imageId, 'unlike') : await likeImage(imageId, 'like'); // Use the likeImage API function

      const updatedImages = images.map((image) => {
        if (image._id === imageId) {
          return { ...image, likes: response.data.likes, isLiked: !isLiked };
        }
        return image;
      });
      setImages(updatedImages);
    } catch (error) {
      console.error('Error liking/unliking image:', error);
    }
  };

  const handleFollow = async (imageId, isFollowed) => {
    try {
      const response = isFollowed ? await followImage(imageId, 'unfollow') : await followImage(imageId, 'follow'); // Use the followImage API function

      const updatedImages = images.map((image) => {
        if (image._id === imageId) {
          return { ...image, followers: response.data.followers, isFollowed: !isFollowed };
        }
        return image;
      });
      setImages(updatedImages);
    } catch (error) {
      console.error('Error following/unfollowing image:', error);
    }
  };

  const handleTag = async (imageId, tag) => {
    try {
      const response = await addTagToImage(imageId, tag); // Use the addTagToImage API function
      const updatedImages = images.map((image) => {
        if (image._id === imageId) {
          return { ...image, tags: response.data.tags };
        }
        return image;
      });
      setImages(updatedImages);
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const toggleTagInput = (imageId) => {
    setTagInputVisible((prevState) => ({
      ...prevState,
      [imageId]: !prevState[imageId],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Header />
      <main>
        <Grid container spacing={4}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={3} key={image._id}>
              <ImageCard
                image={image}
                handleLike={handleLike}
                handleFollow={handleFollow}
                handleTag={handleTag}
                toggleTagInput={toggleTagInput}
                tagInputVisible={tagInputVisible}
              />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default PinterestApp;
