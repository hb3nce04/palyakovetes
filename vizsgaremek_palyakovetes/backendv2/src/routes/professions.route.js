import { Router } from "express";
import {
	getProfessions,
} from "../controllers/professions.controller.js";

const router = Router();

router.get("/", getProfessions);

export default router;