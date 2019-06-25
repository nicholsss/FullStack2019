const config = require("./utils/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users")
const loginRouter = require('./controllers/login')
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })


app.use(cors())
app.use(express.static("build"))
app.use(bodyParser.json());
app.use(middleware.tokenExtractor)

console.log('connecting to', config.MONGODB_URI)
/*
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
*/


app.use("/api/blogs", blogsRouter);
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


if (process.env.NODE_ENV === 'test') {
  console.log('Test router')
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }
app.use(middleware.errorHandler)

module.exports = app;