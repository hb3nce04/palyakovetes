import express from "express";
import {getStudentByOm, getStudentListByClass} from "../controllers/studentController.js";

const router = express.Router();

router.post("/getStudent", getStudentByOm);
router.post("/studentList", getStudentListByClass);

export default router;