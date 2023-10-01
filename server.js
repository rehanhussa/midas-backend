import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import './db/connection.js'

import authRouter from './routes/auth.js'
import dashboardRouter from './routes/dashboard.js'
import investmentRouter from './routes/investment.js'
import stocksRouter from './routes/stocks.js'

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/stocks', stocksRouter)
app.use('/api/auth', authRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/investments', investmentRouter)


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  })