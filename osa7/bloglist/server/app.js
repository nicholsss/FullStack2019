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
app.use("/api/blogs", blogsRouter);
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app;