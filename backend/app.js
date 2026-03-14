const connectDB = require("./config/dbconfig");
const express = require("express");
const http = require("http");
const userroutes= require("./routes/userroutes");
const employerroutes= require("./routes/employerroutes");
const cors = require('cors')
const session= require("express-session");
const path = require('path')

connectDB();
const app = express();
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

app.use(express.json());


app.use(session({
  name: "sid",                        // cookie name
  secret: "mySecretKey123",
  resave: false,
  saveUninitialized: false,           // keep false: don't create session until login
  cookie: {
    httpOnly: true,
    secure: false,       // true if HTTPS. For localhost use false
    sameSite: "lax",     // if frontend is same site, use 'lax'; if cross-site and HTTPS use 'none'
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// To access uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/employer', employerroutes);
app.use('/api/user', userroutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));