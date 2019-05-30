const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log(err);
    }
    if (user) {
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          next(err);
          return
        }
        res.redirect(`/user/edit/${user.id}`)
      })
    }
    else res.redirect("/auth/login")
  })(req, res, next);
});

// router.get('/login', function (req, res, next) {
//   passport.authenticate('local', function (err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect("/auth/login"); }
//     req.logIn(user, function (err) {
//       if (err) { return next(err); }
//       return res.redirect(`/user/edit/${req.user.id}`);
//     });
//   })(req, res, next);
// });


const checkRole = role => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/auth/login')
    }
  }
}

const isTeacher = (req, res) => {
  if (req.user.role === "teacher") return true
}
const isStudent = req => {
  if (req.user.role === 'student') return true
}


//Signup

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});


router.post("/signup", (req, res, next) => {
  const { username, password, role } = req.body
  // const username = req.body.username;
  // const password = req.body.password;
  // const email = req.body.email
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Please input username, password and email" });
    return;
  }

  // if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
  //   res.render("auth/signup", { message: "You have entered an invalid email address!" })
  //   return
  // }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password,salt)

    const newUser = new User({
      username,
      password: hashPass,
      role,
    });

    newUser.save()
      .then(user => {
        req.login(user, (err) => {
          if (err) {
            next(err)
          } else {
            res.redirect(`/user/edit/${user._id}`);
          }
        })
      })
      .catch(err => {
        res.render("auth/signup", { message: "Faltan campos por completar" });
      })
  });

});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


//hay que poner bien las rutas luego






module.exports = router;
