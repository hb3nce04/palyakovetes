import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import routes from "./routes/main.route.js";

const app = express();

app.use(
	process.env.NODE_ENV === "development" ? morgan("dev") : morgan("combined")
);
app.use(cors({ credentials: true, origin: ['http://localhost:4200', 'http://localhost:5173'], methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], }));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.use((req, res, next) => {
	return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});

export default app;
