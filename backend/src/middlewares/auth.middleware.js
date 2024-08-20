import { StatusCodes, ReasonPhrases } from "http-status-codes";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
	const cookie = req.cookies.token;

	if (!cookie) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.send(ReasonPhrases.UNAUTHORIZED);
	} else {
		jwt.verify(cookie, process.env.JWT_SECRET, (err, token) => {
			if (err) {
				return res
					.status(StatusCodes.UNAUTHORIZED)
					.send(ReasonPhrases.UNAUTHORIZED);
			}
			req.user = token;
			next();
		});
	}
};

export const isNotAuthenticated = (req, res, next) => {
	const cookie = req.cookies.token;

	if (cookie) {
		return res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
	} else {
		next();
	}
};
