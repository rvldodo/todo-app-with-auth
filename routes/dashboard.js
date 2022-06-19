const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("todoDashboard", { user: req.user.username });
});

module.exports = router;
