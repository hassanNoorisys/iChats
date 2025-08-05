import app from './app.js'
import { createServer } from 'http'
import connectDB from './src/config/db.connect.js'
import { initSocket } from './src/config/socket.js'

const server = createServer(app)

// socket server
initSocket(server)

const PORT = process.env.PORT
server.listen(PORT, () => {

    console.log(`server is up at ${PORT}`)
    connectDB()
})