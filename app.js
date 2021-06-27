const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");

const app = express();
app.use(express.static("public"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin-elazar:elazarbsh@cluster0.4vrte.mongodb.net/userDB",
      collectionName: "sessions",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://admin-elazar:elazarbsh@cluster0.4vrte.mongodb.net/userDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("auth called");
    console.log(username + " " + password);
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log("cant find user");
        return done(null, false, { message: "Incorrect username." });
      }
      if (!(user.password == password)) {
        console.log("incorrect password");
        return done(null, false, { message: "Incorrect password." });

      }
      console.log("found user");
      return done(null, user);
    });
  })
);


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/exams", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("exam/index");

  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("users/login");
});

app.get("/register", (req, res) => {
  res.render("users/register");
});

app.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

app.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

app.post("/register", function (req, res) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,

  });

  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      //what to do after registering a user.
      req.session.isLogged = true;
      res.render("exams/index");
    }
  });
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    req.session.isLogged = true;
    res.redirect("/exams");
  }
);


app.listen(3000, () => {
  console.log("Listening to port 3000..");
});
