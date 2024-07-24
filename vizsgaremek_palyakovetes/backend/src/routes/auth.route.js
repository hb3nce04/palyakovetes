import { Router } from "express";
import { create, login, logout } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
	registerValidation,
	loginValidation
} from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/create", registerValidation, isAuthenticated, create);
router.post("/login", loginValidation, login);
router.post("/logout", isAuthenticated, logout);

export default router;
