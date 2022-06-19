const express = require("express");
const router = express.Router();
const flash = require("express-flash");

router.get("/", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success_msg", "You have logged out");
    res.redirect("/users/login");
  });
});

module.exports = router;
