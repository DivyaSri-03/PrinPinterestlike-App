import React from 'react';
import { Box, IconButton, Typography, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CommentIcon from '@mui/icons-material/Comment';

const ImageCard = ({ image, handleLike, handleFollow, handleTag, toggleTagInput, tagInputVisible }) => {
  return (
    <Box
      sx={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        padding: 2,
        backgroundColor: '#f1f1f1',
      }}
      className="bg-lightBlue-200 rounded-lg shadow-md overflow-hidden"
    >
      {/* Image title */}
      <Typography variant="h6" align="center" className="p-2">
        {image.title}
      </Typography>

      {/* Image */}
      <Box
        sx={{
          position: 'relative',
          '&:hover img': {
            opacity: 0.8,
          },
        }}
      >
        <img
          alt={image.title}
          className="w-full h-36 object-cover"
          src={image.imageUrl}
          width="300"
          height="300"
        />
      </Box>

      <div className="p-4">
        <div className="flex flex-col items-center">
          {/* Like Icon */}
          <IconButton color={image.isLiked ? 'secondary' : 'default'} onClick={() => handleLike(image._id, image.isLiked)}>
            <FavoriteIcon />
          </IconButton>
          <span>{image.likes}</span>

          {/* Follow Icon */}
          <IconButton color={image.isFollowed ? 'primary' : 'default'} onClick={() => handleFollow(image._id, image.isFollowed)}>
            <PersonAddIcon />
          </IconButton>
          <span>{image.followers}</span>

          {/* Comment Icon (for Tag input) */}
          <IconButton color="default" onClick={() => toggleTagInput(image._id)}>
            <CommentIcon />
          </IconButton>

          {/* Display existing tags */}
          <div>
            {image.tags && image.tags.length > 0 ? (
              <Typography variant="body2" align="center">
                Tags: {image.tags.join(', ')}
              </Typography>
            ) : (
              <Typography variant="body2" align="center" color="textSecondary">
                No tags yet.
              </Typography>
            )}
          </div>

          {/* Tag input */}
          {tagInputVisible[image._id] && (
            <TextField
              variant="outlined"
              placeholder="Add a tag"
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTag(image._id, e.target.value);
                  e.target.value = ''; // Clear input field after adding tag
                }
              }}
            />
          )}
        </div>
      </div>
    </Box>
  );
};

export default ImageCard;
