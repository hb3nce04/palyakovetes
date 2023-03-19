import express from "express";
import{getClasses} from "../controllers/classChooserController.js";

const router = express.Router();

router.post("/class_chooser", getClasses);

export default router;
