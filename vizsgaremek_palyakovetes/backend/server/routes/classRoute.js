import express from "express";
import { getClasses, createClass } from "../controllers/classController.js";

const router = express.Router();

router.get("/class_chooser", getClasses);
router.post("/create", createClass);


export default router;
