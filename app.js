import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
configDotenv({ path: '.env.dev' })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
import userRoute from './src/routes/user.route.js'
app.use('/api/user', userRoute)

// error handler
import errorHandler from './src/middleware/errorHandler.js'
app.use(errorHandler)

export default app



