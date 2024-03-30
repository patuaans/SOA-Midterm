const restaurantRoute = require('./routes/restaurantRoute')
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoute')
const tableRoute = require('./routes/tableRoute')
const orderRoute = require('./routes/orderRoute')
const orderItemRoute = require('./routes/orderItemRoute')
const itemRoute = require('./routes/itemRoute')

const setupRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('SOA-Midterm')
    })

    app.get('/customer', (req, res) => {
        res.render('customer')
    })

    app.get('/chef', (req, res) => {
        res.render('chef')
    })

    app.get('/waiter', (req, res) => {
        res.render('waiter')
    })

    app.use('/api/restaurant', restaurantRoute)
    app.use('/api/users', userRoute)
    app.use('/api/categories', categoryRoute)
    app.use('/api/table', tableRoute)
    app.use('/api/order', orderRoute)
    app.use('/api/orderItem', orderItemRoute)
    app.use('/api/items', itemRoute)
}

module.exports = setupRoutes