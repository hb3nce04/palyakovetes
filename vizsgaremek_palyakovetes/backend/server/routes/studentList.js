import express from "express";
import {getStudents} from "../controllers/studentListController.js";

const router = express.Router();

router.post("/studentList", getStudents);

export default router;