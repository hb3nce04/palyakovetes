import express from "express";
import { getClasses } from "../controllers/classController.js";

const router = express.Router();

router.post("/class_chooser", getClasses);

export default router;
