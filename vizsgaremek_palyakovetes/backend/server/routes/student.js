import express from "express";
import {getStudentByOm, getStudentListByClass, deleteStudent} from "../controllers/studentController.js";

const router = express.Router();

router.post("/getStudent", getStudentByOm);
router.post("/studentList", getStudentListByClass);
router.post("/deleteStudent", deleteStudent);

export default router;