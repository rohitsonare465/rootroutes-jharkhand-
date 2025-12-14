const axios = require('axios');

/**
 * @desc    Search hotels using RapidAPI (e.g., Booking.com API)
 * @route   GET /api/hotels/search
 * @access  Public
 */
exports.searchHotels = async (req, res, next) => {
    try {
        const { query } = req.query; // e.g., location name

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a search query (e.g., location)'
            });
        }

        // 1. Check if API key is configured
        const apiKey = process.env.RAPIDAPI_KEY ? process.env.RAPIDAPI_KEY.trim() : '';
        const isKeyConfigured = apiKey && apiKey !== 'your_rapidapi_key_here';

        console.log(`[HotelAPI] Key configured: ${isKeyConfigured ? 'YES' : 'NO'}`);
        if (isKeyConfigured) {
            console.log(`[HotelAPI] Key length: ${apiKey.length}`);
            console.log(`[HotelAPI] Host: ${process.env.RAPIDAPI_HOST}`);
        }

        if (!isKeyConfigured) {
            // Return mock data fallback
            console.warn('RapidAPI Key not configured or invalid. Returning mock data.');
            return res.status(200).json({
                success: true,
                count: 2,
                data: [
                    {
                        name: `Hotel ${query} Plaza`,
                        location: query,
                        price: 2500,
                        rating: 4.5,
                        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                        amenities: ['Wifi', 'Parking'],
                        availability: 'Available'
                    },
                    {
                        name: `Grand ${query} Resort`,
                        location: query,
                        price: 5000,
                        rating: 4.8,
                        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                        amenities: ['Pool', 'Spa'],
                        availability: 'Limited'
                    }
                ]
            });
        }

        // 2. First request: Get Destination ID
        console.log(`[HotelAPI] Searching destination: ${query}`);
        const destOptions = {
            method: 'GET',
            url: `https://${process.env.RAPIDAPI_HOST}/api/v1/hotels/searchDestination`,
            params: { query: query },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            }
        };

        let destResponse;
        try {
            destResponse = await axios.request(destOptions);
            console.log(`[HotelAPI] Destination search status: ${destResponse.status}`);
        } catch (error) {
            console.error('[HotelAPI] Destination search failed:', error.message);
            if (error.response) {
                console.error('[HotelAPI] Error data:', JSON.stringify(error.response.data));
                // Return the actual error to the frontend for debugging
                return res.status(error.response.status).json({
                    success: false,
                    message: 'RapidAPI Connection Failed',
                    error: error.response.data
                });
            }
            throw error; // Let generic handler catch it
        }

        if (!destResponse.data || !destResponse.data.data || destResponse.data.data.length === 0) {
            // Try a broader search if "Jharkhand" or specific city failed, 
            // but here we just return not found for now to be safe.
            return res.status(404).json({
                success: false,
                message: `Location '${query}' not found. Try a major city like Ranchi, Jamshedpur, or Deoghar.`
            });
        }

        const destination = destResponse.data.data[0]; // Take first match
        const destId = destination.dest_id;
        const searchType = destination.search_type;

        // Calculate dates if not provided
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const dayAfter = new Date(tomorrow);
        dayAfter.setDate(tomorrow.getDate() + 1);

        const defaultCheckin = tomorrow.toISOString().split('T')[0];
        const defaultCheckout = dayAfter.toISOString().split('T')[0];

        const checkinDate = req.query.checkIn || defaultCheckin;
        const checkoutDate = req.query.checkOut || defaultCheckout;
        const guests = req.query.guests || '1';

        // 3. Second request: Search Hotels by Destination ID
        const searchOptions = {
            method: 'GET',
            url: `https://${process.env.RAPIDAPI_HOST}/api/v1/hotels/searchHotels`,
            params: {
                dest_id: destId,
                search_type: searchType,
                arrival_date: checkinDate,
                departure_date: checkoutDate,
                adults: guests,
                room_qty: '1',
                page_number: '1',
                units: 'metric',
                temperature_unit: 'c',
                languagecode: 'en-us',
                currency_code: 'INR'
            },
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            }
        };

        const hotelsResponse = await axios.request(searchOptions);

        // 4. Transform Data
        // Booking.com API structure requires careful navigation
        const hotels = hotelsResponse.data.data.hotels.map(hotel => {
            // Construct a deep link if not directly provided (generic booking.com search fallback if needed, but usually we mock or find one)
            // Real API doesn't always give a direct 'deep_link' in this simple endpoint, but we can try to use the property structure.
            // For now, we will link to a generic booking page with the hotel name search if specific URL is missing.

            return {
                id: hotel.hotel_id,
                name: hotel.property.name,
                location: query,
                rating: hotel.property.reviewScore || 'N/A',
                reviews: hotel.property.reviewCount || 0,
                price: hotel.property.priceBreakdown?.grossPrice?.value || 'N/A',
                originalPrice: hotel.property.priceBreakdown?.strikethroughPrice?.value,
                image: hotel.property.photoUrls?.[0]?.replace('square60', 'square500') || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                amenities: ['Wifi', 'Parking'], // Placeholder as detailed amenities often require detail endpoint
                category: 'Hotel',
                availability: 'Available',
                discount: hotel.property.priceBreakdown?.benefitBadges?.[0]?.text || 0,
                // Booking.com deep link construction or use logic if API provides (simplified for this task)
                url: `https://www.booking.com/searchresults.html?dest_id=${destId}&dest_type=${searchType}&checkin=${checkinDate}&checkout=${checkoutDate}&group_adults=${guests}&no_rooms=1&selected_currency=INR`
            };
        });

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });

    } catch (error) {
        console.error('RapidAPI Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error fetching hotel data',
            error: error.message
        });
    }
};
