import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import {
	isAuthenticated,
	isNotAuthenticated
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register); // isNotAuthenticated
router.post("/login", login); // isNotAuthenticated
router.post("/logout", logout); // isAuthenticated

export default router;
