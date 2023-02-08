import express from "express";
import signUp from "./signUp.js";
import login from "./login.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

export default router;