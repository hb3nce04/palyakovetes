import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const isAdmin = (req, res, next) => {
	const user = req.user;

	if (!user?.admin) {
		return res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
	}

	next();
};

export const isNotAdmin = (req, res, next) => {
	const user = req.user;

	if (user?.admin) {
		return res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
	}

	next();
};
