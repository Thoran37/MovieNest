// Create express app
const exp = require('express')
const app = exp()

// Helmet for securing HTTP headers
const helmet = require('helmet')
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Morgan for easing logging HTTP requests
const morgan = require('morgan')
app.use(morgan("common"));

// File Storage - Multer
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// CORS
const cors = require('cors')
app.use(cors());

// Environment variables for secrecy
require('dotenv').config()

// To parse body of request
app.use(exp.json())

// Importing database
const mongodb = require('mongodb').MongoClient

// Deploying react build to this server
const path = require('path')
app.use(exp.static(path.join(__dirname, '../client/build')))
app.use('/assets', exp.static(path.join(__dirname, 'public/assets')));

// Database connection
mongodb.connect(process.env.DB_URL)
  .then(client => {
    moviedb = client.db('moviedb')
    console.log("DB connection established")
  })
  .catch(err => console.log("Error in DB", err))

// Importing Apis


// Sending requests to resp routes


// Handling page refresh
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })

// Error handling
app.use((err, req, res, next) => {
  res.send({ message: "Error occured", payload: err.message })
})

// Port from .env
let port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening in on ${port}`))