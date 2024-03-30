require('dotenv').config()
const express = require('express')
const socketIo = require('socket.io')
const connectDB = require('./config/db')
const configureMiddleware = require('./config/middleware')
const setupRoutes = require('./routes')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

configureMiddleware(app)
setupRoutes(app)

const startServer = async () => {
    try {
        await connectDB()
        const PORT = process.env.PORT || 8080
        const server = app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
        const io = socketIo(server)

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
    } catch (error) {
        console.error("Server startup error:", error)
    }
}

startServer()