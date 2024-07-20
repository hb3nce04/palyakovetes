import { prisma } from "../utils/prisma-client.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const getClasses = (req, res) => {
	prisma.Class.findMany()
		.then((classes) => {
			return res.status(StatusCodes.OK).json(classes);
		})
		.catch((err) => {
			console.log(err);
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};

export const createClass = async (req, res) => {
	const { schooldId, name, finishingYear } = req.body;
	const userId = req.user.id;

	const foundClass = await prisma.Class.findFirst({
		where: { school_id: schooldId, name, finishing_year: finishingYear }
	});

	if (foundClass) {
		return res
			.status(StatusCodes.CONFLICT)
			.json({ message: "Az osztály már létezik!" });
	}

	const newClass = await prisma.Class.create({
		include: { School: true },
		data: {
			School: { id: schooldId },
			User: { id: userId },
			name,
			finishing_year: finishingYear
		}
	}).then((cls) => {
		console.log(cls);
		return res
			.status(StatusCodes.CREATED)
			.json({ message: "Az osztály sikeresen létrehozva." });
	});
};

export const deleteClass = (req, res) => {};
