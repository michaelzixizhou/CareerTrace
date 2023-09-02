import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/users.mjs";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import initializePassport from "./auth.mjs";
import csrf from "csurf";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
}))

initializePassport(passport);
app.use(csrf());
app.use(passport.authenticate('session'))
app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});
app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/record", records);
app.use("/user", users);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`http://localhost:${PORT}/`)
})
