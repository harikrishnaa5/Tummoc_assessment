const express = require('express');
const passport = require('passport');
const cors = require("cors")
const cookieSession = require('cookie-session');
const passportSetup = require("./passport")
const authRoute = require("./routes/auth")
require("dotenv").config()

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY], // Replace with your own secret key(s)
  maxAge: 24 * 60 * 60 * 1000, // 24 hours (in milliseconds)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true,
    })
)

app.use("/auth", authRoute)

const port = process.env.PORT || 5000
app.listen(port, ()=>console.log(`Listening on port: ${port}`))

