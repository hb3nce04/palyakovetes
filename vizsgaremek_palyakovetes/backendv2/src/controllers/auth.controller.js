import { prisma } from "../utils/prisma-client.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	const { id, password, admin } = req.body;

	if (!id || !password || !(admin === 0 || admin === 1)) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "Hiányos adatok." });
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
		data: { id, password: hashedPassword, is_admin: admin === 1 }
	}).then((usr) => {
		console.log(usr);
		return res
			.status(StatusCodes.CREATED)
			.json({ message: "Felhasználó sikeresen létrehozva." });
	});
};

export const login = async (req, res) => {
	const { id, password } = req.body;

	if (!id || !password) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "Hibás felhasználónév vagy jelszó!" });
	}

	const foundUser = await prisma.User.findUnique({
		where: { id }
	});

	if (!foundUser) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "Hibás felhasználónév vagy jelszó!" });
	}

	const validPassword = await bcrypt.compare(password, foundUser.password);

	if (!validPassword) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			message: "Hibás felhasználónév vagy jelszó!"
		});
	}

	const token = jwt.sign(
		{ id: foundUser.id, admin: foundUser.is_admin },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	);

	res.cookie("token", token, {
		secret: process.env.COOKIE_SECRET,
		httpOnly: true,
		sameSite: true,
		maxAge: process.env.COOKIE_MAX_AGE,
		secure: process.env.NODE_ENV === "production"
	})
		.status(StatusCodes.OK)
		.send({
			user: { isAdmin: foundUser.is_admin ? 1 : 0, id: foundUser.id },
			message: "Sikeresen bejelentkeztél!"
		});
};

export const logout = (req, res) => {
	res.clearCookie("token")
		.status(StatusCodes.OK)
		.json({ message: "Sikeresen kijelentkeztél!" });
};
