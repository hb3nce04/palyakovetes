import { prisma } from "../utils/prisma-client.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const getClasses = (req, res) => {
	prisma.Class.findMany({ include: { School: true } })
		.then((classes) => {
			return res.status(StatusCodes.OK).json(classes);
		})
		.catch((err) => {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};

export const getStudentsByClassID = (req, res) => {
	const { id } = req.params;

	prisma.Student.findMany({
		where: { class_id: parseInt(id) },
		include: { Sector: true, Profession: true, Field: true }
	})
		.then((students) => {
			return res.status(StatusCodes.OK).json(students);
		})
		.catch((err) => {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};

export const createClass = async (req, res) => {
	const { schoolId, name, finishingYear } = req.body;
	const userId = req.user.id;

	const foundClass = await prisma.Class.findFirst({
		where: {
			school_id: schoolId,
			name,
			finishing_year: parseInt(finishingYear)
		}
	});

	if (foundClass) {
		return res
			.status(StatusCodes.CONFLICT)
			.json({ message: "Az osztály már létezik!" });
	}

	const newClass = await prisma.Class.create({
		data: {
			School: { connect: { id: schoolId } },
			User: { connect: { id: userId } },
			name,
			finishing_year: parseInt(finishingYear)
		}
	}).then((cls) => {
		return res
			.status(StatusCodes.CREATED)
			.json({ message: "Az osztály sikeresen létrehozva." });
	});
};

export const deleteClassByID = (req, res) => {
	const { id } = req.params;

	const deletedClass = prisma.Class.delete({
		where: {
			id: parseInt(id)
		}
	})
		.then(() => {
			return res
				.status(StatusCodes.OK)
				.json({ message: "Az osztály sikeresen törölve." });
		})
		.catch((err) => {
			if (err.code === "P2025") {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "Az adott azonosítójú osztály nem létezik."
				});
			}
		});
};
