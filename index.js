const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mogoose");
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy')

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("./assets"));
//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(expressLayouts);


//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");


app.use(session({
  name:"codeial",
  //TODO chnage the secret before deployment in production mode
  secret:"blahsomething",
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*60*100)
  }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is ruunign on port: ${port}`);
});
