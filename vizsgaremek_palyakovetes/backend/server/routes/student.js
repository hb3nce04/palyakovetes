import express from "express";
import {getStudentByOm, getStudentListByClass, deleteStudent, addStudent} from "../controllers/studentController.js";

const router = express.Router();

router.post("/getStudent", getStudentByOm);
router.post("/studentList", getStudentListByClass);
router.post("/deleteStudent", deleteStudent);
router.post("/addStudent", addStudent);

export default router;