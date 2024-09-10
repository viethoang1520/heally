const express = require("express");
const path = require("path");
const routes = require("./routes");
const session = require('express-session');
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();
// const mySQL = require("./config/db/mySQL");
const mongoDB = require('./config/db/mongoDB')
const app = express();

// mySQL.connect() 
mongoDB.connect()

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

const maleList = []
const femaleList = []

app.get("/", (req, res) => {
  res.send('index.html')
})

routes(app);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT || 3000}`);
});

const connectSocket = require('./config/chat/socketConfig')
connectSocket(server, maleList, femaleList)
