const router = require("express").Router();
const User = require("../models/user.model");

// first endpoint for incoming http://localhost:5000/users get request
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// for http://localhost:5000/users/add post request
router.route("/add").post((req, res) => {
  const { body } = req;
  let { email } = body;
  const { username, password, confirmPassword } = body;

  console.log(body);

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }

  if (password !== confirmPassword) {
    return res.send({
      success: false,
      message: "Error: Password doesn't match.",
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find({ email }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error",
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: "Error: Account already exists",
      });
    }
  });

  const newUser = new User();

  newUser.email = email;
  newUser.username = username;
  newUser.password = newUser.generateHash(password);

  newUser.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error",
      });
    }
    return res.send({
      success: true,
      message: "Signed Up",
    });
  });

  // newUser
  //   .save()
  //   .then(() => res.json("User added!"))
  //   .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
