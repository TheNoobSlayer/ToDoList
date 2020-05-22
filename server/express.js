const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
//import Template from './../template'

const userRoutes=require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes');
const authRoutes=require('./routes/authRoutes');
const dailyRoutes=require('./routes/dailyRoutes');
const rewardRoutes=require('./routes/rewardRoutes');

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());


app.use('/',userRoutes);
app.use('/',taskRoutes);
app.use('/',authRoutes);
app.use('/',dailyRoutes);
app.use('/',rewardRoutes);
// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});

module.exports = app;
