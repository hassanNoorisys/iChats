import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
configDotenv({ path: '.env.dev' })
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({ origin: '*' }))

// routes
import userRoute from './src/routes/user.route.js'
import groupRoute from './src/routes/group.route.js'
app.use('/api/user', userRoute)
app.use('/api/group', groupRoute)

// error handler
import errorHandler from './src/middleware/errorHandler.js'
app.use(errorHandler)

export default app



