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

// module.exports.updateTableCount = async (req, res) => {
//     const numberOfTables = parseInt(req.params.numberOfTables, 10)
//     if (isNaN(numberOfTables) || numberOfTables < 0) {
//         return res.status(404).send('Invalid number of tables provided')
//     }
//
//     try {
//         const updatedRestaurant = await Restaurant.findOneAndUpdate({},
//             { numberOfTables: numberOfTables },
//             { new: true })
//         if (updatedRestaurant) {
//             res.status(200).json({ success: true, data: updatedRestaurant })
//         } else {
//             res.status(404).send('Restaurant not found')
//         }
//     } catch (error) {
//         console.error('Error updating the number of tables:', error)
//         res.status(500).send('Server error')
//     }
// }