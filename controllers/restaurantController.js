const Restaurant = require('../models/restaurant')

module.exports.createDefaultRestaurant = async (req, res) => {
    try {
        const count = await Restaurant.countDocuments();
        if (count === 0) {
            const defaultRestaurant = new Restaurant({});
            await defaultRestaurant.save();
            res.json({ success: true, message: 'Default restaurant created successfully' })
        } else {
            res.json({ success: false, error: 'A restaurant already exists in the database' })
        }
    } catch (error) {
        console.error('Error creating the default restaurant:', error)
        res.status(500).send('Server error')
    }
}

module.exports.getRestaurantInfo = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne()
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' })
        }

        res.status(200).json({ success: true, data: restaurant })
    } catch (error) {
        console.error('Error fetching restaurant information:', error)
        res.status(500).json({ success: false, message: 'Failed to fetch restaurant information due to an internal error' })
    }
}