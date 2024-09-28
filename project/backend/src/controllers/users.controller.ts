import { prisma } from "../utils/prisma-client.js";
import bcrypt from "bcrypt";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { validationMessage } from "../middlewares/validation.middleware.js";

export const create = async (req, res) => {
	const { id, password, isAdmin } = req.body;

	const message = validationMessage(req);
	if (message) {
		return res.status(StatusCodes.BAD_REQUEST).json({ message });
	}

	const foundUser = await prisma.User.findUnique({
		where: { id }
	});

	if (foundUser) {
		return res
			.status(StatusCodes.CONFLICT)
			.json({ message: "A felhasználó már létezik!" });
	}

	const hashedPassword = await bcrypt.hash(password, 12);

	const newUser = await prisma.User.create({
		data: { id, password: hashedPassword, is_admin: isAdmin }
	}).then((usr) => {
		return res
			.status(StatusCodes.CREATED)
			.json({ message: "Felhasználó sikeresen létrehozva." });
	});
};

export const getUsers = (req, res) => {
	prisma.User.findMany({ select: { id: true, is_admin: true } })
		.then((users) => {
			return res.status(StatusCodes.OK).json(users);
		})
		.catch((err) => {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send(ReasonPhrases.INTERNAL_SERVER_ERROR);
		});
};

export const deleteUser = (req, res) => {
	const { id } = req.params;

	const deletedUser = prisma.User.delete({
		where: {
			id
		}
	})
		.then(() => {
			return res
				.status(StatusCodes.OK)
				.json({ message: "A felhasználó sikeresen törölve." });
		})
		.catch((err) => {
			if (err.code === "P2025") {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "Az adott azonosítójú felhasználó nem létezik."
				});
			}
		});
};

export const updatePassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const userId = req.user.id;

	const message = validationMessage(req);
	if (message) {
		return res.status(StatusCodes.BAD_REQUEST).json({ message });
	}

	const foundUser = await prisma.User.findUnique({
		where: { id: userId }
	});

	if (!foundUser) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Hiba! A token hibás!" });
	}

	const validPassword = await bcrypt.compare(oldPassword, foundUser.password);

	if (!validPassword) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Hibás jelszó!"
		});
	}

	const hashedPassword = await bcrypt.hash(newPassword, 12);

	prisma.User.update({
		where: {
			id: userId
		},
		data: {
			password: hashedPassword
		}
	})
		.then(() => {
			return res.status(StatusCodes.OK).json({
				message: "Jelszó sikeresen módosítva!"
			});
		})
		.catch((err) => {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
		});
};
