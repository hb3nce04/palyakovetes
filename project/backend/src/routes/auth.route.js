import { Router } from "express";
import {login, logout, profile} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { loginValidation } from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/login", loginValidation, login);
router.post("/logout", isAuthenticated, logout);
router.get("/profile", isAuthenticated, profile);

export default router;
