import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/users.mjs";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/users", users);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`https://localhost:${PORT}`)
})
