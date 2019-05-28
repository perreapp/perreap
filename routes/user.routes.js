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



module.exports = router;