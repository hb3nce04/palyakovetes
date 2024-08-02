import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
	create,
	getUsers,
	deleteUser,
	updatePassword
} from "../controllers/users.controller.js";
import {
	createUserValidation,
	updatePasswordValidation
} from "../middlewares/validation.middleware.js";

const router = Router();

router.post("/", isAuthenticated, isAdmin, createUserValidation, create);
router.get("/", isAuthenticated, isAdmin, getUsers);
router.delete("/:id", isAuthenticated, isAdmin, deleteUser);
router.patch("/:id", isAuthenticated, updatePasswordValidation, updatePassword);

export default router;
