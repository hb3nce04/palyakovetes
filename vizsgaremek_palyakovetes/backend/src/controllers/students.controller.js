import { prisma } from "../utils/prisma-client.js";
import { validationMessage } from "../middlewares/validation.middleware.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const getStudentByID = (req, res) => {
	const { id } = req.params;

	prisma.Student.findUnique({ where: { id }, include: { Field: true } })
		.then((student) => {
			return res.status(StatusCodes.OK).json(student);
		})
		.catch((err) => {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};

export const getFieldByStudentID = (req, res) => {
	const { id } = req.params;
	prisma.Field.findMany({
		where: { student_id: parseInt(id) },
		include: { Category: true }
	})
		.then((fields) => {
			return res.status(StatusCodes.OK).json(fields);
		})
		.catch((err) => {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};

export const createStudent = async (req, res) => {
	const {
		id,
		name,
		classId,
		dayShift,
		sectorId,
		professionId,
		categoryId,
		description
	} = req.body;

	const message = validationMessage(req);
	if (message) {
		return res.status(StatusCodes.BAD_REQUEST).json({ message });
	}

	const foundStudent = await prisma.Student.findFirst({
		where: { id }
	});

	if (foundStudent) {
		return res
			.status(StatusCodes.CONFLICT)
			.json({ message: "A tanuló már létezik!" });
	}

	const newStudent = await prisma.Student.create({
		include: { Field: true },
		data: {
			id,
			name,
			class_id: parseInt(classId),
			day_shift: dayShift,
			sector_id: parseInt(sectorId),
			profession_id: parseInt(professionId),
			Field: {
				create: {
					category_id: parseInt(categoryId),
					description
				}
			}
		}
	})
		.then((std) => {
			return res.status(StatusCodes.CREATED).json({
				message:
					"Az osztály és a hozzátartozó pálya sikeresen létrehozva."
			});
		})
		.catch((err) => {
			if (err.code === "P2003") {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: "Az adott osztály nem létezik."
				});
			}
		});
};

export const deleteStudentByID = (req, res) => {
	const { id } = req.params;

	const deletedStudent = prisma.Student.delete({
		where: {
			id
		}
	}).then(() => {
		return res.status(StatusCodes.OK).json({
			message: "A tanuló és a hozzátartozó pálya sikeresen törölve."
		});
	});
};

export const updateStudentByID = async (req, res) => {
	const {
		id,
		name,
		dayShift,
		sectorId,
		professionId,
		categoryId,
		description
	} = req.body;

	const message = validationMessage(req);
	if (message) {
		return res.status(StatusCodes.BAD_REQUEST).json({ message });
	}

	const foundStudent = await prisma.Student.findFirst({
		where: { id }
	});

	if (!foundStudent) {
		return res
			.status(StatusCodes.CONFLICT)
			.json({ message: "A tanuló nem létezik!" });
	}

	if (professionId) {
		await prisma.Student.update({
			where: {
				id
			},
			data: {
				name,
				day_shift: dayShift,
				Profession: { connect: { id: parseInt(professionId) } }
			}
		});
	}

	if (sectorId) {
		await prisma.Student.update({
			where: {
				id
			},
			data: {
				name,
				day_shift: dayShift,
				Sector: { connect: { id: parseInt(sectorId) } }
			}
		});
	}

	const updatedField = await prisma.Field.update({
		where: {
			student_id: id
		},
		data: {
			category_id: parseInt(categoryId),
			description
		}
	});

	return res.status(StatusCodes.OK).json({
		message: "A tanuló és a hozzátartozó pálya sikeresen frissítve."
	});
};
