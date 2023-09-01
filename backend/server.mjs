import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/users.mjs";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import initializePassport from "./auth.mjs";


const PORT = process.env.PORT || 5050;
const app = express();


app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/user", users);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`http://localhost:${PORT}/`)
})
