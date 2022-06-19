const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

// import routes
const homeRoutes = require("./routes/home");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");
const logoutRoutes = require("./routes/logout");

// import middleware
const {
  checkAuthentication,
  checkNotAuthenticated,
} = require("./middleware/checkAuth");

// configuration
const initializePassport = require("./config/passportConfig");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

initializePassport(passport);

// Set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Set engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.use("/", homeRoutes); // home routes

app.use("/users/logout", logoutRoutes); // logout routes

app.use("/users/register", checkAuthentication, registerRoutes); // register routes

app.use("/users/login", checkAuthentication, loginRoutes); // login routes

app.use("/users/dashboard", checkNotAuthenticated, dashboardRoutes); // dashboard routes

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
