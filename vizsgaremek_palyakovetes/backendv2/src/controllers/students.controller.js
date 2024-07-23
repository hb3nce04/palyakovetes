import { prisma } from "../utils/prisma-client.js";
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

	if (
		!id ||
		!name ||
		!classId ||
		!(dayShift === 0 || dayShift === 1) ||
		!sectorId ||
		!professionId ||
		!categoryId ||
		!description
	) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Hiányos adatok." });
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
			class_id: classId,
			day_shift: dayShift === 1,
			sector_id: sectorId,
			profession_id: professionId,
			Field: {
				create: {
					category_id: categoryId,
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

// ???
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

	if (
		!id ||
		!name ||
		!(dayShift === 0 || dayShift === 1) ||
		!categoryId ||
		!description ||
		!(professionId || sectorId)
	) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Hiányos adatok." });
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
				day_shift: dayShift === 1,
				Profession: { connect: { id: professionId } } // null??
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
				day_shift: dayShift === 1,
				Sector: { connect: { id: sectorId } } // null??
			}
		});
	}

	const updatedField = await prisma.Field.update({
		where: {
			student_id: id
		},
		data: {
			category_id: categoryId,
			description
		}
	});

	return res.status(StatusCodes.OK).json({
		message: "A tanuló és a hozzátartozó pálya sikeresen frissítve."
	});
};
