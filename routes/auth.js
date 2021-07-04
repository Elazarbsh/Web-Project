
const router = require('express').Router();
const passport = require('passport');
const User = require("../models/user");


/**
 * -------------- POST ROUTES ----------------
 */

 router.post("/register", function (req, res) {
    const newUser = new User({
      email: req.body.username,
      password: req.body.password,
    });
  
    console.log(req.body.username);
    console.log(req.body.password);
  
    newUser.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        req.session.isLogged = true;
        res.redirect("/login");
      }
    });
  });
  
  router.post("/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    function (req, res) {
      req.session.isLogged = true;
      res.redirect("/exams");
    }
  );

 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/auth/google',passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/exams');
  });

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
