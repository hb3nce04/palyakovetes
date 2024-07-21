import { prisma } from "../utils/prisma-client.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const getProfessions = (req, res) => {
	prisma.Profession.findMany({ select: { id: true } })
		.then((professions) => {
			return res.status(StatusCodes.OK).json(professions);
		})
		.catch(() => {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};
