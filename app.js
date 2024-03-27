require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const configureMiddleware = require('./config/middleware')
const path = require('path')

const app = express()
app.use(express.urlencoded({ extended: true }))
configureMiddleware(app)

app.get('/', (req, res) => {
    res.send('SOA-Midterm')
})

const restaurantRoute = require('./routes/restaurantRoute')
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoute')
const tableRoute = require('./routes/tableRoute')
const orderRoute = require('./routes/orderRoute')
const orderItemRoute = require('./routes/orderItem')
const itemRoute = require('./routes/itemRoute')

app.use('/api/restaurant', restaurantRoute)
app.use('/api/users', userRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/table', tableRoute)
app.use('/api/order', orderRoute)
app.use('/api/orderItem', orderItemRoute)
app.use('/api/items', itemRoute)

const PORT = process.env.PORT || 8080
app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is running at http://localhost:${PORT}`)
})