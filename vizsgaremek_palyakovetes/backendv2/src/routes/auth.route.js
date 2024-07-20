import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import {
	isAuthenticated,
	isNotAuthenticated
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", isNotAuthenticated, register);
router.post("/login", isNotAuthenticated, login);
router.post("/logout", isAuthenticated, logout);

export default router;
