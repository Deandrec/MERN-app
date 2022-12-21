import express from "express";
import {getFeedPosts, getUserPosts, likePost } from "../contollers/posts.js"; 
import { verifyToken } from "../middlewear/auth.js";

const router = express.Router();

/* READ */
router.use("/", verifyToken, getFeedPosts);
router.use("/:userId/posts", verifyToken, getUserPosts)

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);