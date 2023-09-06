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
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from "path";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

const oneMonth = 1000 * 60 * 60 * 24 * 30

app.use(session({
    secret: "VerySecureKey9090",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneMonth }
}))

initializePassport(passport);
// app.use(csrf());


app.use(passport.authenticate('session'))
// app.use(function(req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

app.use("/api", api);
app.use("/auth", auth);

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// // Handles any requests that don't match the ones above
// app.get('*', (req, res) => { 
//      res.sendFile(path.join(__dirname + '../frontend/build'));
// });
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
//     console.log(`http://localhost:${PORT}`)
// })

https
    .createServer(
        // Provide the private and public key to the server by reading each
        // file's content with the readFileSync() method.
        {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
        },
        app
    )
    .listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
        console.log(`https://localhost:${PORT}`)
    });
