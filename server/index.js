// Create express app
const exp = require('express')
const app = exp()

// Helmet for securing HTTP headers
const helmet = require('helmet')
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// To handle asynchronous errors
const expressAsyncHandler = require('express-async-handler')

// Morgan for easing logging HTTP requests
const morgan = require('morgan')
app.use(morgan("common"));

// CORS
const cors = require('cors')
app.use(cors({
  origin: ["https://movienest-nine.vercel.app/", "https://movie-nest-three.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true
}));

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
let moviedb, users, admins, theatresObj, moviesObj, shows, reservations
mongodb.connect('mongodb+srv://thoran:qwertasd@moviebookingcluster.ploz5ax.mongodb.net/?retryWrites=true&w=majority&appName=MovieBookingCluster')
  .then(client => {
    moviedb = client.db('moviedb')
    users = moviedb.collection('usercollection')
    admins = moviedb.collection('admincollection')
    theatresObj = moviedb.collection('theatrecollection')
    moviesObj = moviedb.collection('moviescollection')
    shows = moviedb.collection('showtimes')
    reservations = moviedb.collection('reservations')
    app.set('users', users)
    app.set('admins', admins)
    app.set('theatres', theatresObj)
    app.set('movies', moviesObj)
    app.set('shows', shows)
    app.set('reservations', reservations)
    console.log("DB connection established")
  })
  .catch(err => console.log("Error in DB", err))

// Importing Apis
const userApp = require('./APIs/user-api')
const adminApp = require('./APIs/admin-api')

// File Storage - Multer
const multer = require('multer')
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage1 });

// Routes with files
// app.post('/admin-api/add-movie', upload.single("img"), expressAsyncHandler(async (req, res) => {
//   let body = req.body;
//   console.log(body)
//   let existingMovie = await moviesObj.findOne({ title: body.title });
//   if (existingMovie)
//     res.status(400).send({ message: "Movie already exists" });
//   else {
//     // Add the movie to the movies collection
//     await moviesObj.insertOne(body);

//     // Add the movie to the theatres collection
//     const theatres = await theatresObj.find({}).toArray();
//     const theatreUpdates = theatres.map(theatre => {
//       return theatresObj.updateOne(
//         { theatreId: theatre.theatreId },
//         { $push: { movies: body } }
//       );
//     });
//     await Promise.all(theatreUpdates);

//     // Add the movie to the shows collection (create a default showtime entry)
//     const showtime = {
//       movieId: body.movieId,
//       title: body.title,
//       theatres: theatres.map(theatre => ({
//         theatreId: theatre.theatreId,
//         showtimes: []
//       }))
//     };
//     await shows.insertOne(showtime);

//     res.send({ message: "New Movie added and linked to theatres and showtimes" });
//   }
// }))

// Sending requests to resp routes
app.use('/user-api', userApp)
app.use('/admin-api', adminApp)

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
