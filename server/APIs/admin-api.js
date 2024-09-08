// Create mini express
const exp = require('express')
const adminApp = exp.Router()

// To handle asynchronous errors
const expressAsyncHandler = require('express-async-handler')

// To encrypt and decrypt passwords
const bcryptjs = require('bcryptjs')

// To generate dynamic web tokens
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/verifyToken')

// Middleware to get the admin object
let adminObj, userObj, movieObj, theatreObj, showtimeObj;
adminApp.use((req, res, next) => {
  adminObj = req.app.get('admins')
  userObj = req.app.get('users')
  movieObj = req.app.get('movies')
  theatreObj = req.app.get('theatres')
  showtimeObj = req.app.get('shows')
  next()
})

// Route to login
adminApp.post('/login', expressAsyncHandler(async (req, res) => {
  const admin = req.body
  const dbadmin = await adminObj.findOne({ username: admin.username })
  if (dbadmin === null)
    res.send({ message: "Invalid username" })
  else {
    const status = await bcryptjs.compare(admin.password, dbadmin.password)
    if (status === false)
      res.send({ message: "Invalid password" })
    else {
      const signedToken = jwt.sign({ username: dbadmin.username }, process.env.SECRET_KEY, { expiresIn: '1d' })
      res.send({ message: "Login successful", token: signedToken, admin: dbadmin })
    }
  }
}))

// Route to register
adminApp.post('/register', expressAsyncHandler(async (req, res) => {
  let body = req.body
  const dbAdmin = await adminObj.findOne({ username: body.username })
  if (dbAdmin !== null)
    res.send({ message: "Admin already exists" })
  else {
    const hash = await bcryptjs.hash(body.password, 7)
    body.password = hash
    await adminObj.insertOne(body)
    res.send({ message: "Admin registered" })
  }
}))

// MOVIES
// Route to add movies

// Went to index.js because we need to upload image - in testing

adminApp.post('/addMovie', expressAsyncHandler(async (req, res) => {
  let article = req.body
  await movieObj.insertOne(article)
  res.send({ message: "New Article created" })
}))

// Route to delete movies
adminApp.delete('/remove-movie/:id', expressAsyncHandler(async (req, res) => {
  let id = req.params.id;
  console.log(id)
  const deleteResult = await movieObj.deleteOne({ movieId: id });
  console.log(deleteResult)

  if (deleteResult.deletedCount === 0)
    return res.status(404).send({ message: "Movie not found" });

  await theatreObj.updateMany(
    { "movies.movieId": id },
    { $pull: { movies: { movieId: id } } }
  );

  await showtimeObj.deleteOne({ movieId: id });

  res.send({ message: "Movie deleted from movies, theatres, and showtimes collections" });
}));


// Route to update movies
adminApp.put('/update-movie', expressAsyncHandler(async (req, res) => {
  let movie = req.body;

  // Update the movie in the movies collection
  const updateResult = await movieObj.updateOne(
    { movieId: movie.movieId },
    { $set: { ...movie } }
  );

  if (updateResult.matchedCount === 0) {
    return res.status(404).send({ message: "Movie not found" });
  }

  // Update the movie in all theatres
  await theatreObj.updateMany(
    { "movies.movieId": movie.movieId },
    { $set: { "movies.$[elem]": movie } },
    { arrayFilters: [{ "elem.movieId": movie.movieId }] }
  );

  // Update the movie in the shows collection
  await showtimeObj.updateOne(
    { movieId: movie.movieId },
    { $set: { title: movie.title, ...movie } }
  );

  // Fetch the updated movie data
  let newMovie = await movieObj.findOne({ movieId: movie.movieId });

  res.send({ message: "Movie updated across movies, theatres, and showtimes collections", payload: newMovie });
}));

// Route to get all movies
adminApp.get('/get-movies', expressAsyncHandler(async (req, res) => {
  const movies = await movieObj.find({}).toArray(); // Fetch all movies
  res.send({ message: "Movies fetched successfully", payload: movies });
}));



// THEATRES
// Route to add theatres
adminApp.post('/add-theatre', expressAsyncHandler(async (req, res) => {
  let body = req.body
  await theatreObj.insertOne(body)
  res.send({ message: "New Theatre added" })
}))

// Route to delete theatres
adminApp.delete('/remove-theatre/:id', expressAsyncHandler(async (req, res) => {
  const theatreId = req.params.id;

  // Delete the theatre from the theatres collection
  const deleteResult = await theatreObj.deleteOne({ theatreId });

  if (deleteResult.deletedCount === 0) {
    return res.status(404).send({ message: "Theatre not found" });
  }

  // Update the movies collection to remove this theatre
  await movieObj.updateMany(
    { "theatres.theatreId": theatreId },
    { $pull: { theatres: { theatreId } } }
  );

  // Update the showtimes collection to remove this theatre
  await showtimeObj.updateMany(
    { "theatres.theatreId": theatreId },
    { $pull: { theatres: { theatreId } } }
  );

  res.send({ message: "Theatre deleted and updated in movies and showtimes collections" });
}));


// Route to update theatres
adminApp.put('/update-theatre', expressAsyncHandler(async (req, res) => {
  let theatre = req.body
  await theatreObj.updateOne({ theatreId: theatre.theatreId }, { $set: { ...theatre } })
  let newtheatre = await theatreObj.findOne({ theatreId: theatre.theatreId })
  res.send({ message: "theatre modified", payload: newtheatre })
}))


// Route to get all theatres
adminApp.get('/get-theatres', expressAsyncHandler(async (req, res) => {
  const theatres = await theatreObj.find().toArray(); // Fetch all theatres
  res.send({ message: "Theatres fetched successfully", payload: theatres });
}));


// USERS
// Route to add users
adminApp.post('/add-user', expressAsyncHandler(async (req, res) => {
  let body = req.body
  await userObj.insertOne(body)
  let res1 = await userObj.findOne({ name: body.name })
  res.send({ message: "New User added", payload: res1 })
}))

// Route to delete users
adminApp.delete('/remove-user/:id', expressAsyncHandler(async (req, res) => {
  let id = req.params.id
  await userObj.deleteOne({ userId: id })
  res.send({ message: "User deleted" })
}))

// Route to update users
adminApp.put('/update-user', expressAsyncHandler(async (req, res) => {
  let user = req.body
  await userObj.updateOne({ userId: user.userId }, { $set: { ...user } })
  let newuser = await userObj.findOne({ userId: user.userId })
  res.send({ message: "User modified", payload: newuser })
}))

// Route to get users
adminApp.get('/get-users', expressAsyncHandler(async (req, res) => {
  let users = await userObj.find().toArray()
  res.send({ message: "Users list", payload: users })
}))

// SHOWS
// Route to get shows based on time and movie - Working Fine
adminApp.post('/get-shows', expressAsyncHandler(async (req, res) => {
  const { id, date } = req.body
  let _date = new Date(date)
  _date = _date.toISOString().split('T')[0]
  let shows = await showtimeObj.find({ movieId: id, date: _date }).toArray()
  res.send({ message: "Shows list", payload: shows })
}))

// Route to get shows based on movie, theatre
adminApp.get('/get-shows-by-theatre/:id', expressAsyncHandler(async (req, res) => {
  let id = req.params.id
  let theatres = await showtimeObj.find({ movieId: id }).toArray()
  res.send({ message: "Sending theatre list", payload: theatres })
}))

// Route to get all shows
adminApp.get('/get-shows', expressAsyncHandler(async (req, res) => {
  let shows = await showtimeObj.find().toArray()
  res.send({ message: "Shows list", payload: shows })
}))

// Route to add shows
// adminApp.post('/add-shows', expressAsyncHandler(async (req, res) => {
//   const body = req.body
//   let result = await showtimeObj.find({ theatre:})
//   console.log(body)
// }))

// Export adminApp
module.exports = adminApp