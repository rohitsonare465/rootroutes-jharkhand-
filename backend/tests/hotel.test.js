const request = require('supertest');
const mongoose = require('mongoose');
const axios = require('axios');

// Mock database connection
jest.mock('../config/database', () => jest.fn());
// Mock axios
jest.mock('axios');

const app = require('../server');

describe('Hotel API Endpoints', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });
    it('should get hotels based on search query', async () => {
        // Mock destination search response
        axios.request.mockResolvedValueOnce({
            data: {
                data: [{ dest_id: '123', search_type: 'city' }]
            }
        })
            // Mock hotel search response
            .mockResolvedValueOnce({
                data: {
                    data: {
                        hotels: [
                            {
                                hotel_id: 1,
                                property: {
                                    name: 'Test Hotel',
                                    reviewScore: 8.5,
                                    reviewCount: 100,
                                    priceBreakdown: { grossPrice: { value: 1000 } },
                                    photoUrls: ['http://example.com/photo.jpg']
                                }
                            }
                        ]
                    }
                }
            });

        const res = await request(app)
            .get('/api/hotels/search')
            .query({ query: 'Ranchi' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should return 400 if no query provided', async () => {
        const res = await request(app)
            .get('/api/hotels/search')

        expect(res.statusCode).toEqual(400);
    });
});
