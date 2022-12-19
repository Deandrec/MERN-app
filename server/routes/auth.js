import express from "express";
import {login} from "../contollers/auth.js";

// create router
const router = express.Router();

router.post("/login", login)

export default router;