import express from "express";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/userList", getUsers);

export default router;
