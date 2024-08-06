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
let adminObj, userObj, movieObj, theatreObj;
adminApp.use((req, res, next) => {
  adminObj = req.app.get('admins')
  userObj = req.app.get('users')
  movieObj = req.app.get('movies')
  theatreObj = req.app.get('theatres')
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
adminApp.post('/add-movie', expressAsyncHandler(async (req, res) => {
  let body = req.body
  await movieObj.insertOne(body)
  res.send({ message: "New Movie added" })
}))

// Route to delete movies
adminApp.post('/remove-movie/:id', expressAsyncHandler(async (req, res) => {
  let id = req.params.id
  await movieObj.deleteOne({ movieId: id })
  res.send({ message: "Movie deleted" })
}))

// Route to update movies
adminApp.post('/update-movie', expressAsyncHandler(async (req, res) => {
  let movie = req.body
  await movieObj.updateOne({ movieId: movie.movieId }, { $set: { ...movie } })
  let newmovie = await movieObj.findOne({ movieId: movie.movieId })
  res.send({ message: "Movie modified", payload: newmovie })
}))

// THEATRES
// Route to add theatres
adminApp.post('/add-theatre', expressAsyncHandler(async (req, res) => {
  let body = req.body
  await theatreObj.insertOne(body)
  res.send({ message: "New Theatre added" })
}))

// Route to delete theatres
adminApp.post('/remove-theatre/:id', expressAsyncHandler(async (req, res) => {
  let id = req.params.id
  await theatreObj.deleteOne({ theatreId: id })
  res.send({ message: "Theatre deleted" })
}))

// Route to update theatres
adminApp.post('/update-theatre', expressAsyncHandler(async (req, res) => {
  let theatre = req.body
  await theatreObj.updateOne({ theatreId: theatre.theatreId }, { $set: { ...theatre } })
  let newtheatre = await theatreObj.findOne({ theatreId: theatre.theatreId })
  res.send({ message: "theatre modified", payload: newtheatre })
}))

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

// Export adminApp
module.exports = adminApp