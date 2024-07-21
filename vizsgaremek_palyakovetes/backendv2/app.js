BigInt.prototype.toJSON = function () {
	return this.toString();
}; // Fixing BigInt serialization to JSON

import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import routes from "./src/routes/main.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
	process.env.NODE_ENV === "development" ? morgan("dev") : morgan("combined")
);
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV === "production") {
	app.use(
		rateLimit({
			windowMs: 5000,
			max: 10
		})
	);
}

app.use("/", routes);

app.use((req, res, next) => {
	return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});

app.listen(PORT, () => {
	console.log(`server: http://localhost:${PORT}/api`);
	console.log(`environment: ${process.env.NODE_ENV}`);
});
