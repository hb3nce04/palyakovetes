import { Router } from "express";
import {
	getStudentByID,
	getFieldByStudentID,
	createStudent,
	deleteStudentByID,
	updateStudentByID
} from "../controllers/students.controller.js";
import {
	createStudentValidation,
	updateStudentValidation
} from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/:id", getStudentByID);
router.get("/:id/field", getFieldByStudentID);
router.post("/", createStudentValidation, createStudent);
router.delete("/:id", deleteStudentByID);
router.put("/:id", updateStudentValidation, updateStudentByID);

export default router;
