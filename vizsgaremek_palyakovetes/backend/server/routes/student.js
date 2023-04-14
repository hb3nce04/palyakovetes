import express from "express";
import {getStudentByOm, getStudentListByClass, deleteStudent, addStudent, editStudent} from "../controllers/studentController.js";

const router = express.Router();

router.post("/getStudent", getStudentByOm);
router.post("/studentList", getStudentListByClass);
router.post("/deleteStudent", deleteStudent);
router.post("/addStudent", addStudent);
router.post("/editStudent", editStudent);

export default router;