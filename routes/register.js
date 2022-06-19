const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");

const router = express.Router();
const pool = require("../config/dbConfig");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const { firstName, lastName, username, email, password, password2 } =
    req.body;

  let errors = [];

  //   Check if the user fill al the fields
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !password2
  ) {
    errors.push({ message: "Please enter all fields" });
  }

  //   check if the email is valid
  //   if (!validator.isEmail(email)) {
  //     errors.push({ message: "Email is not valid" });
  //   }

  //   check if the password is longer than 6 characters
  if (password.length < 6) {
    errors.push({ message: "Password must be at least 6 characters" });
  }

  //   check if the password is match
  if (password !== password2) {
    errors.push({ message: "Password do not match" });
  }

  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    // Form validation pass
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, result) => {
        if (err) throw err;

        if (result.rows.length > 0) {
          errors.push({ message: "Email already exists" });
          res.render("register", { errors });
        }
      }
    );

    pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
      (err, result) => {
        if (err) throw err;

        if (result.rows.length > 0) {
          errors.push({ message: "Username already exists" });
          res.render("register", { errors });
        } else {
          pool.query(
            "INSERT INTO users(first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, password",
            [firstName, lastName, username, email, hashedPassword],
            (err, result) => {
              if (err) throw err;
              req.flash("success_msg", "You are now registered. Please login");
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

module.exports = router;
