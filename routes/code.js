const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const KNN = require("../algorithms/knn/KNN");
const fs = require("fs");
/**
 * -------------- GET ROUTES ----------------
 */

router.get("/code", (req, res) => {
  res.render("exams/code-screen", { code: 0 });
});

router.get("/generate-code", (req, res) => {
  if (req.isAuthenticated()) {
    const code = makeCode(4);

    User.findOne({ createdTest: code }, function (err, obj) {
      if (err) {
        console.log(err);
      } else if (obj != null) {
        res.redirect("/generate-code");
        return;
      } else {
        User.updateOne(
          { _id: req.session.passport.user },
          { createdTest: code },
          function (err) {
            err ? console.log(err) : res.redirect("/waiting-room");
          }
        );
      }
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/waiting-room", (req, res) => {
  if (req.isAuthenticated()) {
    User.findOne({ _id: req.session.passport.user }, function (err, obj) {
      if (err) {
        console.log(err);
      } else {
        const user = obj.toObject();
        if (typeof user.createdTest === "undefined") {
          res.redirect("/code");
          return;
        }
        res.render("exams/waiting-room", { code: user.createdTest });
      }
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/test", (req, res) => {
  res.render("exams/exams");
});

/**
 * -------------- POST ROUTES ----------------
 */

router.post("/start-test", (req, res) => {
  if (req.isAuthenticated()) {
    const code = req.body.code;
    User.findOne({ createdTest: code }, function (err, obj) {
      if (err) {
        console.log(err);
      } else if (obj == null) {
        res.redirect("/code");
      } else {
        User.updateOne(
          { _id: req.session.passport.user },
          { "$set": { "code": code, "group": "N/A" } },
          function (err) {
            err ? console.log(err) : res.redirect("/test");
          }
        );
      }
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/submit-test", (req, res) => {
  if (req.isAuthenticated()) {
    let i = 1;
    const answers = [];
    while (req.body["q" + i]) {
      answers.push(parseInt(req.body["q" + i++]));
    }
    let knnString = fs.readFileSync("knn-model.json", "utf-8"); //Read KNN model as string
    let knn = KNN.load(JSON.parse(knnString)); //Parse knnString to JSON
    let ans = knn.predict(answers); //Predict the answer and update the k-d tree

    let knnJson = knn.toJSON();
    fs.writeFileSync("knn-model.json", JSON.stringify(knnJson)); //save the added example in the model

    //update result in database
    User.updateOne(
      { _id: req.session.passport.user },
      { group: ans },
      function (err) {
        if (err)
          console.log(err);
      }
    );

    res.render("exams/result", { ans });
  } else {
    res.redirect("/login");
  }
});

/**
 * -------------- API ROUTES ----------------
 */

router.get("/api/students", (req, res) => {
  if (req.isAuthenticated()) {
    User.findOne({ _id: req.session.passport.user }, function (err, obj) {
      if (err) {
        console.log(err);
      } else {
        const user = obj.toObject();
        if (typeof user.createdTest === "undefined") {
          res.redirect("/code");
        }
        User.find({ code: user.createdTest }, function (err, students) {
          if (err) {
            console.log(err);
          } else {
            res.send(JSON.stringify(students));
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
});

/**
 * -------------- OTHER FUNCTIONS ----------------
 */

function makeCode(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
