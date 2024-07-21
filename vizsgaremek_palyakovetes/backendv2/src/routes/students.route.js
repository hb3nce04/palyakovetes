import { Router } from "express";
import {
	getStudentByID,
	getFieldByStudentID,
	createStudent,
	deleteStudentByID,
	updateStudentByID
} from "../controllers/students.controller.js";

const router = Router();

router.get("/:id", getStudentByID);
router.get("/:id/field", getFieldByStudentID);
router.post("/", createStudent);
router.delete("/:id", deleteStudentByID);
router.put("/:id", updateStudentByID);

export default router;
