require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const socketIo = require('socket.io')
const configureMiddleware = require('./config/middleware')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
configureMiddleware(app)

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
const httpServer = app.listen(PORT, async() => {
    await connectDB()
    console.log(`Server is running at http://localhost:${PORT}`)
})

const io = socketIo(httpServer)

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('joinRoom', ({ room }) => {
        socket.join(room)
        console.log(`Socket ${socket.id} joined room ${room}`)
    })

    socket.on('orderPlaced', (order) => {
        socket.to('chefs').emit('newOrder', order)
    })

    socket.on('dishPrepared', (order) => {
        io.to('waiters').emit('serveOrder', order)
    })

    socket.on('requestHelp', (tableInfo) => {
        io.to('waiters').emit('helpRequested', tableInfo)
    })
})