const express = require("express");
const path = require("path");
const routes = require("./routes");
const passport = require('passport');
const session = require('express-session');
const bodyParser = require("body-parser");
const cors = require("cors");
const {limiter} = require('./middleware/RateLimit')

require('dotenv').config();
require('./app/controllers/social/FacebookController')
require('./app/controllers/social/GoogleController')
// const mySQL = require("./config/db/mySQL");
const mongoDB = require('./config/db/mongoDB')
const app = express();

// mySQL.connect() 
mongoDB.connect()

app.use(limiter)
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.set("views", path.join(__dirname, "resources", "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const maleList = []
const femaleList = []

routes(app);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT || 3000}`);
});

const connectSocket = require('./app/controllers/chat/socketController')
connectSocket(server, maleList, femaleList)
