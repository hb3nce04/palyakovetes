import { Router } from "express";
import { getSchools } from "../controllers/schools.controller.js";

const router = Router();

router.get("/", getSchools);

export default router;
