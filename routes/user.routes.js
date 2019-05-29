const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


//Edit un usuario

router.get('/edit/:id/', (req, res, next) => {

  const id = req.params.id

  User.findById(id)

    .then(users => {
      res.render('user/edit', { user: users })
    })
    .catch(error => console.log(error))

})

router.get('/edit/:id/:message', (req, res, next) => {

  const id = req.params.id
  const message = req.params.message

  User.findById(id)

    .then(users => {
      res.render('user/edit', { user: users, message })
    })
    .catch(error => console.log(error))

})


router.post('/edit/:id', uploadCloud.single('photo'), (req, res, next) => {
  // console.log(req.body)
  console.log(req.user)
  const { password, lastName, firstName, email, birthDate, photo } = req.body
  const id = req.params.id
  console.log("***************************************************", req.file)
  if (req.file == undefined) req.body.photo = "https://media.giphy.com/media/LXtjHzZjC5WLu/giphy.gif"
  // const photo = req.file.url


  let hashPass

  if (password) {
    const salt = bcrypt.genSaltSync(bcryptSalt)
    hashPass = bcrypt.hashSync(password, salt)
  }
  else hashPass = req.user.password


  User.findByIdAndUpdate(id, { password, lastName, firstName, email, photo, birthDate }, { new: true })
    .then(update => {
      console.log('Your profile has been updated!', update)
      const message = "Actualizado que da gusto verlo"
      res.redirect(`/user/edit/${update._id}/${message}`)
    })
    .catch(err => console.log('Sorry, your profile could not be updated :(', err))

})

router.get('/edit', (req, res, next) => {
  res.render('user/edit');
});


/* GET home page */
router.get('/dashboard', (req, res, next) => {

  console.log(req.user)

  console.log(req.user.role)

  if (req.user && req.user.role === "teacher") {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", req.user._id)
    res.render('user/dashboard', req.user);
  } else if (req.user && req.user.role === "student") {
    res.redirect(`/user/edit/${req.user._id}`)
  } else {
    res.redirect("/auth/login")
  }

})

//GET todos los usuarios
router.get('/api', (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => console.log('¡ops! error:', error))
});

//GET un usuario
router.get('/api/:id', (req, res, next) => {
  User.findById(req.params.id) 
  .then(user => res.json(user))
  .catch(error => console.log(error))
})

//PUT un usuario
router.put('/api/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: {...req.body} }, {new: true})
    .then(updatedUser => { res.json(updatedUser) })
    .catch(err => console.log(err))
})

//DELETE un usuario
router.delete('/api/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
  .then(user => res.json(user))
  .catch(error => console.log(error))
})

//RULETA
router.get('/roulette/:id', (req, res, next) => {
  console.log(req.params.id)
  console.log(req.user)
  res.render('user/roulette', req.user);
});

module.exports = router;