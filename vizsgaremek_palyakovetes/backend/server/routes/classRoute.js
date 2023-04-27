import express from "express";
import { getClasses, createClass, deleteClass } from "../controllers/classController.js";

const router = express.Router();

router.get("/class_chooser", getClasses);
router.post("/create", createClass);
router.post("/delete", deleteClass);


export default router;
