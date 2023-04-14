import express from "express";
import { getUsers, deleteUser, updatePassword } from "../controllers/userController.js";

const router = express.Router();

router.get("/userList", getUsers);
router.post("/deleteUser", deleteUser);
router.post("/updatePassword", updatePassword);

export default router;
