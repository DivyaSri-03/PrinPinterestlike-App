// server.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');  // Assuming your server.js file is named "server.js"

// In-memory MongoDB setup
let mongoServer;





describe('Image API Endpoints', () => {
  let imageId;

  // Test POST /images (Add a new image)
  it('should add a new image', async () => {
    const res = await request(app)
      .post('/images')
      .send({
        title: 'Test Image',
        imageUrl: 'https://example.com/image.jpg',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Image');
    expect(res.body.imageUrl).toBe('https://example.com/image.jpg');

    imageId = res.body._id;  // Store image ID for further tests
  });

  // Test GET /images (Get all images)
  it('should get all images', async () => {
    const res = await request(app).get('/images');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test GET /images/:id (Get a single image by ID)
  it('should get a single image by ID', async () => {
    const res = await request(app).get(`/images/${imageId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(imageId);
    expect(res.body.title).toBe('Test Image');
  });

  // Test PUT /images/:id (Update an image)
  it('should update an image', async () => {
    const res = await request(app)
      .put(`/images/${imageId}`)
      .send({
        title: 'Updated Image Title',
        imageUrl: 'https://example.com/updated-image.jpg',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Image Title');
    expect(res.body.imageUrl).toBe('https://example.com/updated-image.jpg');
  });

  // Test POST /images/:id/like (Like an image)
  it('should like an image', async () => {
    const res = await request(app).post(`/images/${imageId}/like`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Image liked');
    expect(res.body.likes).toBeGreaterThan(0);
  });

  // Test POST /images/:id/unlike (Unlike an image)
  it('should unlike an image', async () => {
    const res = await request(app).post(`/images/${imageId}/unlike`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Image unliked');
    expect(res.body.likes).toBeGreaterThanOrEqual(0);
  });

  // Test POST /images/:id/follow (Follow an image)
  it('should follow an image', async () => {
    const res = await request(app).post(`/images/${imageId}/follow`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Image followed');
    expect(res.body.followers).toBeGreaterThan(0);
  });

  // Test POST /images/:id/unfollow (Unfollow an image)
  it('should unfollow an image', async () => {
    const res = await request(app).post(`/images/${imageId}/unfollow`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Unfollowed image');
    expect(res.body.followers).toBeGreaterThanOrEqual(0);
  });

  // Test POST /images/:id/tag (Add a tag to an image)
  it('should add a tag to an image', async () => {
    const res = await request(app)
      .post(`/images/${imageId}/tag`)
      .send({ tag: 'Nature' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tag added');
    expect(res.body.tags).toContain('Nature');
  });

  // Test POST /images/:id/untag (Remove a tag from an image)
  it('should remove a tag from an image', async () => {
    const res = await request(app)
      .post(`/images/${imageId}/untag`)
      .send({ tag: 'Nature' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Tag removed');
    expect(res.body.tags).not.toContain('Nature');
  });
});
