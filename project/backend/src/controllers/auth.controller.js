import { validationMessage } from "../middlewares/validation.middleware.js";
import { prisma } from "../utils/prisma-client.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
	const { id, password } = req.body;

	const message = validationMessage(req);
	if (message) {
		return res.status(StatusCodes.BAD_REQUEST).json({ message });
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
		return res.status(StatusCodes.UNAUTHORIZED).json({
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
		sameSite: false, // Docker cross hosting
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
