import { prisma } from "../utils/prisma-client.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const getSectors = (req, res) => {
	prisma.Sector.findMany()
		.then((sectors) => {
			return res.status(StatusCodes.OK).json(sectors);
		})
		.catch(() => {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};
