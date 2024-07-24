import { prisma } from "../utils/prisma-client.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const getCategories = (req, res) => {
	prisma.Category.findMany()
		.then((categories) => {
			return res.status(StatusCodes.OK).json(categories);
		})
		.catch(() => {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};
