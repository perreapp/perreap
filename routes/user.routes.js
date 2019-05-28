const express = require('express');
const router  = express.Router();
const User = require("../models/User")

/* GET home page */
router.get('/dashboard', (req, res, next) => {
  res.render('user/dashboard');
});

//GET todos los usuarios
router.get('/api', (req, res, next) => {
  User.find()
  .then(users => { res.json(users) })
  .catch(error => console.log('¡ops! error:', error))    
});

//GET un usuario
router.get('/api/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => { res.json(user) })
})

//PUT un usuario
router.put('/api/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {$set: { palitos: req.body.value }})
    .then(() => console.log("******************** Updated"))
    .catch(err => console.log(err))
})

//DELETE un usuario
router.delete('/api/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err, user) => { res.json(user) })
})
module.exports = router;