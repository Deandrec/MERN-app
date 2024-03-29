import express, { application } from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../contollers/users.js"
import { verifyToken } from "../middlewear/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;