const router = require("express").Router();
const User = require("../models/user.model");

// first endpoint for incoming http://localhost:5000/users get request
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// for http://localhost:5000/users/add post request
router.route("/signup").post((req, res) => {
  const { body } = req;
  let { email } = body;
  const { username, password, confirmPassword } = body;

  console.log(body);
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
  }

  email = email.toLowerCase();
  email = email.trim();

  // User.find({ email }, (err, previousUsers) => {
  //   console.log("email:", email);
  //   console.log("typeof email:", typeof email);
  //   if (err) {
  //     return res.send({
  //       success: false,
  //       message: "Error: Server error",
  //     });
  //   } else if (previousUsers.length > 0) {
  //     console.log("prevUsers:", previousUsers);
  //     return res.send({
  //       success: false,
  //       message: {
  //         email: "Error: Account already exists",
  //       },
  //     });
  //   }
  // });

  // Todo: validate username as well as email

  const findUser = (obj) => {
    console.log("key1:", obj);
    User.find(obj, (err, previousUsers) => {
      const key = Object.keys(obj);
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      } else if (previousUsers.length > 0) {
        console.log("prevUsers1", previousUsers);
        const message = {};
        message[key] = "Error: Account already exists";
        return res.send({
          success: false,
          message,
        });
      }
    });
  };

  findUser({ username });
  findUser({ email });

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
