import express from "express";
import { getClasses, createClass, addStudent } from "../controllers/classController.js";

const router = express.Router();

router.post("/class_chooser", getClasses);
router.post("/create", createClass);
router.post("/addStudent", addStudent)

export default router;
