const router = require("express").Router();
const User = require("../models/user.model");
const UserSession = require("../models/userSession.model");
const bcrypt = require("bcrypt");

// first endpoint for incoming http://localhost:5000/users get request
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Signup endpoint - http://localhost:5000/users/add post request
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

    const userExists = await User.exists({ username })
      .then((doc) => doc)
      .catch((err) => console.log(err));

    const emailExists = await User.exists({ email })
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

// Log in
router.route("/login").post(async (req, res, next) => {
  const { body } = req;
  let { email } = body;
  const { password } = body;

  // Error handling
  const message = {};
  if (!email || !password) {
    if (!email) message.email = "Error: Email cannot be blank.";

    if (!password) message.password = "Error: Password cannot be blank.";

    return res.send({
      success: false,
      message,
    });
  }
  email = email.toLowerCase();
  email = email.trim();

  // Check if email address input exists in db
  const emailExists = await User.exists({ email })
    .then((doc) => doc)
    .catch((err) => console.log(err));
  if (!emailExists) {
    res.send({
      success: false,
      message: {
        email: "Email not exists",
      },
    });
    return;
  }

  // Check if password is correct
  User.find({ email }, async (err, users) => {
    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("email", email);
    console.log("user", user);

    if (err) {
      console.log("err 2:", err);
      return res.send({
        success: false,
        message: "Error: Server error",
      });
    } else if (users.length !== 1) {
      return res.send({
        success: false,
        message: "Error: Invalid",
      });
    } else if (!passwordMatch) {
      return res.send({
        success: false,
        message: {
          password: "Error: Invalid",
        },
      });
    }

    // Create userSession and generate token
    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.userData = user.userData;
    userSession.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }
      console.log("doc", doc);
      return res.send({
        success: true,
        message: "Valid sign in",
        token: doc._id,
        userData: doc.userData,
      });
    });
  });
});

// Log out
router.route("/logout").get((req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    null,
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Good bye",
      });
    }
  );
});

// Verify

router.route("/verify").get((req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }
      if (sessions.length !== 1) {
        return res.send({
          success: false,
          message: "Error: Invalid",
        });
      } else {
        return res.send({
          success: true,
          message: "Good",
        });
      }
    }
  );
});

module.exports = router;
