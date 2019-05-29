const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;



router.get('/edit/:id', (req, res, next) => {

  const id = req.params.id

  User.findById(id)

    .then(users => {
      console.log(users)
      res.render('user/edit', { user: users })
    })
    .catch(error => console.log(error))

})

router.post('/edit', uploadCloud.single('photo'), (req, res, next) => {
  const { username, password, lastName, firstName, email, photo, birthDate, role } = req.body
  const id = req.params._id

  let hashPass

  if (password) {
    const salt = bcrypt.genSaltSync(bcryptSalt)
    hashPass = bcrypt.hashSync(password, salt)
  }
  else hashPass = req.user.password


  User.findByIdAndUpdate(id, { username, password, lastName, firstName, email, photo, birthDate, role }, { new: true })
    .then(update => {
      console.log('Your profile has been updated!', update)
      res.redirect('/')
    })
    .catch(err => console.log('Sorry, your profile could not be updated :(', err))

})


/* GET home page */
router.get('/dashboard', (req, res, next) => {
  res.render('user/dashboard');
});

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
  res.render('user/roulette');
});

module.exports = router;