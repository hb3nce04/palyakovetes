import { Router } from "express";
import {
	getClasses,
	getStudentsByClassID,
	createClass,
	deleteClassByID
} from "../controllers/classes.controller.js";

const router = Router();

router.get("/", getClasses);
router.post("/", createClass);
router.delete("/:id", deleteClassByID);

router.get("/:id/students", getStudentsByClassID);

export default router;
