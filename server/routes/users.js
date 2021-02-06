const router = require("express").Router();
const User = require("../models/user.model");

// first endpoint for incoming http://localhost:5000/users get request
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// for http://localhost:5000/users/add post request
router.route("/signup").post(async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      error: "req body cannot be empty",
    });
  }

  const { body } = req;
  let { email } = body;
  const { username, password, confirmPassword } = body;

  const message = {};

  // Error handling
  if (!username || !email || !password || password !== confirmPassword) {
    if (!username) message.username = "Error: Username cannot be blank.";

    if (!email) message.email = "Error: Email cannot be blank.";

    if (!password) message.password = "Error: Password cannot be blank.";

    if (password !== confirmPassword)
      message.confirmPassword = "Error: Password doesn't match.";

    return res.send({
      success: false,
      message,
    });
  } else if (username && email) {
    email = email.toLowerCase();
    email = email.trim();

    let userExists = await User.exists({ username })
      .then((doc) => doc)
      .catch((err) => console.log(err));

    let emailExists = await User.exists({ email })
      .then((doc) => doc)
      .catch((err) => console.log(err));

    if (userExists) {
      res.status(409).json({
        message: {
          username: "Username already exists",
        },
      });
      return;
    } else if (emailExists) {
      res.status(409).json({
        message: {
          email: "Email already exists",
        },
      });
      return;
    }
  }

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
});

module.exports = router;
