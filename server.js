require('dotenv').config() //loads all environment variables from .env

const express = require('express')
const app = express() //app variable to configure server
const mongoose = require('mongoose')

//connect to mongo db database via mongoose--notice Database_URL actual string is in .env
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
//database that holds subscriber info and what our API will handle, url is in .env file
//require('dotenv').config()
//loads environment variables from .env but need to require .env library (see above)
//may not need newUrlParser: true...run it then delete and try

const db = mongoose.connection
db.on('error', error => console.error(error))
//lets us see if db connection problem
db.once('open', () => console.log('Connected to Database!'))
//lets us know it connected to mongodb

// app.use(express.json) //lets server accept json
app.use(express.json())

// const subscribersRouter = require('./routes/subscribers')
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server is running!'))
