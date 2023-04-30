import express from "express";
import {
  getStudentByOm,
  getStudentListByClass,
  deleteStudent,
  addStudent,
  editStudent,
  getPalyaByStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/getStudent", getStudentByOm);
router.post("/studentList", getStudentListByClass);
router.post("/deleteStudent", deleteStudent);
router.post("/addStudent", addStudent);
router.post("/editStudent", editStudent);
router.post("/getPalya", getPalyaByStudent);

export default router;
