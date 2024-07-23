import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
	getUsers,
	deleteUser,
	updatePassword
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", isAuthenticated, isAdmin, getUsers);
router.delete("/:id", isAuthenticated, isAdmin, deleteUser);
router.patch("/:id", isAuthenticated, updatePassword);

export default router;
