import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

export const fetchImages = async () => {
  return await API.get('/images');
};

export const likeImage = async (imageId, action) => {
  // Check action and make corresponding API call
  return await API.post(`/images/${imageId}/${action}`);
};

export const followImage = async (imageId, action) => {
  // Check action and make corresponding API call
  return await API.post(`/images/${imageId}/${action}`);
};

export const addTagToImage = async (imageId, tag) => {
  return await API.post(`/images/${imageId}/tag`, { tag });
};

export default API;
