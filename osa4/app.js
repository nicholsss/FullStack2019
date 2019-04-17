const config = require("./utils/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users")
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  
app.use(express.static("build"))
app.use(bodyParser.json());
//app.use(middleware.requestLogger)
app.use("/api/blogs", blogsRouter);
app.use('/api/users', usersRouter)
/*
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
*/

module.exports = app;
