import express from "express";
import { getUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/userList", getUsers);
router.post("/deleteUser", deleteUser);

export default router;
