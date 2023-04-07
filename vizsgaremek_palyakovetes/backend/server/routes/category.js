import express from "express";
import{ getCategories, getProfessions, getSectors} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/getCategories", getCategories);
router.get("/getProfessions", getProfessions);
router.get("/getSectors", getSectors);

export default router;