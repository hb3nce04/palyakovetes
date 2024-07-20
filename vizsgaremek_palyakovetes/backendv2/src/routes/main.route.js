import { Router } from "express";
import authRoute from "./auth.route.js";
import schoolsRoute from "./schools.route.js";
import classesRoute from "./classes.route.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isNotAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/schools", isAuthenticated, isNotAdmin, schoolsRoute);
router.use("/classes", isAuthenticated, isNotAdmin, classesRoute);

export default router;
