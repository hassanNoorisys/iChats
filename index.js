import app from './app.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './src/config/db.connect.js'

const server = createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {

    console.log('someone connected', socket.id)

    socket.on('disconnect', () => {

        console.log(`${socket.id} disconnected`)
    })
})



const PORT = process.env.PORT
server.listen(PORT, () => {

    console.log(`server is up at ${PORT}`)
    connectDB()
})