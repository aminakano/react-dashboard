const router = require("express").Router();
const Exercise = require("../models/exercise.model");
let User = require("../models/user.model");

// first endpoint for incoming http://localhost:5000/users get request
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// for http://localhost:5000/users/add post request
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
