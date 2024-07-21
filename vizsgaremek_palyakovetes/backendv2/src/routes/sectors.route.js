import { Router } from "express";
import { getSectors } from "../controllers/sectors.controller.js";

const router = Router();

router.get("/", getSectors);

export default router;
