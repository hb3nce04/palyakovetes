import express from "express";
import { getSchools } from "../controllers/schoolController.js";

const router = express.Router();

router.get("/getSchools", getSchools);

export default router;
