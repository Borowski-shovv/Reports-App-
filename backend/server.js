const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

// database URI 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB successfully connected")
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use('/exercises', exercisesRouter);
app.use('/', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
