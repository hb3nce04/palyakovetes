import { Router } from "express";
import {
	getClasses,
	createClass,
	deleteClass
} from "../controllers/classes.controller.js";

const router = Router();

router.get("/", getClasses);
router.post("/", createClass);
router.delete("/", deleteClass);

export default router;
