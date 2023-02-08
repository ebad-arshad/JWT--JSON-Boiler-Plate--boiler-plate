import express from "express";
import mongoose from "mongoose";
import api from './apis/index.js';
import cors from "cors";
import cookies from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', "*"],
    credentials: true
}));
app.use(cookies());

mongooseW
    .connect("")
    .then(() => console.log("Connected!"))
    .catch((err) => console.log("err ===>", err));

app.use("/", api);

app.use("/", (req, res) => {
    res.send(new Date());
});

let PORT = 5002;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});