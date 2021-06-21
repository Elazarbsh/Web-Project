const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin-elazar:elazarbsh@cluster0.4vrte.mongodb.net/userDB", { useNewUrlParser: true });

//users schema and model.
const userSchema = {
    email: String,
    password: String
}
const User = mongoose.model("User", userSchema);


app.get("/teacher", (req, res) => {
  res.render("teacher/index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", function (req, res) {
  const newUser = new User({
      email: req.body.username,
      password: req.body.password
  });

  newUser.save(function (err) {
      if (err) {
          console.log(err);
      } else {
          //what to do after registering a user.
          res.render("teacher/index");
      }
  });
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
      if(err){
          console.log(err);
      }else{
          if(foundUser){
              if(foundUser.password === password){
                  //what to do after user log in.
                  res.render("teacher/index");
              }
          }
      }
  });

});

app.listen(3000, () => {
  console.log("Listening to port 3000..");
});
