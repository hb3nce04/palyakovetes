import { Router } from "express";
import authRoute from "./auth.route.js";
import schoolsRoute from "./schools.route.js";
import classesRoute from "./classes.route.js";
import studentsRoute from "./students.route.js";
import categoriesRoute from "./categories.route.js";
import professionsRoute from "./professions.route.js";
import sectorsRoute from "./sectors.route.js";
import usersRoute from "./users.route.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isNotAdmin } from "../middlewares/admin.middleware.js";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger.json" with {type: 'json'};

const router = Router();

router.use("/auth", authRoute);
router.use("/schools", isAuthenticated, isNotAdmin, schoolsRoute);
router.use("/classes", isAuthenticated, isNotAdmin, classesRoute);
router.use("/students", isAuthenticated, isNotAdmin, studentsRoute);
router.use("/categories", isAuthenticated, isNotAdmin, categoriesRoute);
router.use("/professions", isAuthenticated, isNotAdmin, professionsRoute);
router.use("/sectors", isAuthenticated, isNotAdmin, sectorsRoute);
router.use("/users", isAuthenticated, usersRoute);

if (process.env.NODE_ENV === "development") {
    router.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}


export default router;
