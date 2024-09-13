import { prisma } from "../utils/prisma-client.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const getSchools = (req, res) => {
	prisma.School.findMany()
		.then((schools) => {
			return res.status(StatusCodes.OK).json(schools);
		})
		.catch(() => {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};
