import { Router } from "express";
import {
	getClasses,
	getStudentsByClassID,
	createClass,
	deleteClassByID
} from "../controllers/classes.controller.js";

import { classValidation } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", getClasses);
router.post("/", classValidation, createClass);
router.delete("/:id", deleteClassByID);

router.get("/:id/students", getStudentsByClassID);

export default router;
