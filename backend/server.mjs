import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import api from "./routes/api.mjs";
import auth from "./routes/auth.mjs";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import initializePassport from "./strategy.mjs";
// import csrf from "csurf";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

const oneMonth = 1000 * 60 * 60 * 24 * 30

app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: oneMonth}
}))

initializePassport(passport);
// app.use(csrf());


app.use(passport.authenticate('session'))
app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});
// app.use(function(req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

app.use("/api", api);
app.use("/auth", auth);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`http://localhost:${PORT}/`)
})
