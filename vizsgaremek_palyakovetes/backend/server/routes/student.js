import express from "express";
import {getStudent} from "../controllers/studentController.js";

const router = express.Router();

router.post("/getStudent", getStudent);

export default router;