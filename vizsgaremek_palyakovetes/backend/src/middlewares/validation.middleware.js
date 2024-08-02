import { checkSchema } from "express-validator";
import { validationResult } from "express-validator";

const idValidation = {
	exists: { errorMessage: "OM azonosító kötelező" },
	isNumeric: {
		errorMessage: "Hibás OM azonosító (nem megfelelő formátum)"
	},
	matches: {
		options: "^[0-9]{11}$",
		errorMessage: "Hibás OM azonosító (nem megfelelő formátum)"
	}
};

const passwordValidation = {
	exists: { errorMessage: "Jelszó kötelező" },
	isString: {
		errorMessage: "Hibás jelszó (nem megfelelő formátum)"
	},
	matches: {
		options:
			"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$",
		errorMessage: "Hibás vagy gyenge jelszó"
	}
};

// GLOBAL
export const validationMessage = (req) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return result
			.array()
			.map((err) => err.msg)
			.join(" - ");
	} else {
		return false;
	}
};

// Auth
export const loginValidation = checkSchema({
	id: idValidation,
	password: passwordValidation
});

// Classes
export const classValidation = checkSchema({
	schoolId: {
		exists: { errorMessage: "Iskola azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás iskola azonosító (nem megfelelő formátum)"
		},
		isInt: {
			options: { min: 1 },
			errorMessage: "Hibás iskola azonosító (nem megfelelő formátum)"
		}
	},
	name: {
		exists: { errorMessage: "Osztálynév kötelező" },
		isString: {
			errorMessage: "Hibás osztálynév (nem megfelelő formátum)"
		},
		matches: {
			options: /^[^'"`\\;=()]{2,50}$/,
			errorMessage: "Hibás osztálynév (nem megfelelő formátum)"
		}
	},
	finishingYear: {
		exists: { errorMessage: "Végzési év kötelező" },
		isNumeric: {
			errorMessage: "Hibás végzési év (nem megfelelő formátum)"
		},
		isInt: {
			options: {
				min: new Date().getFullYear() - 25,
				max: new Date().getFullYear()
			},
			errorMessage: "Hibás végzési év (nem megfelelő formátum)"
		}
	}
});

// Students
export const createStudentValidation = checkSchema({
	id: idValidation,
	name: {
		exists: { errorMessage: "Tanuló neve kötelező" },
		isString: {
			errorMessage: "Hibás tanulónév (nem megfelelő formátum)"
		},
		matches: {
			options: /^[^\d'"`\\]{2,100}$/,
			errorMessage: "Hibás tanulónév (nem megfelelő formátum)"
		}
	},
	classId: {
		exists: { errorMessage: "Osztály azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás osztály azonosító (nem megfelelő formátum)"
		},
		isInt: {
			options: { min: 1 },
			errorMessage: "Hibás osztály azonosító (nem megfelelő formátum)"
		}
	},
	dayShift: {
		exists: { errorMessage: "Tagozat megadása kötelező" },
		isBoolean: {
			errorMessage: "Hibás tagozat (nem megfelelő formátum)"
		}
	},
	sectorId: {
		exists: { errorMessage: "Ágazat azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás ágazat azonosító (nem megfelelő formátum)"
		},
		isInt: {
			options: { min: 1 },
			errorMessage: "Hibás ágazat azonosító (nem megfelelő formátum)"
		},
		optional: true
	},
	professionId: {
		exists: { errorMessage: "Szakma azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás szakma azonosító (nem megfelelő formátum)"
		},
		isInt: {
			options: { min: 1 },
			errorMessage: "Hibás szakma azonosító (nem megfelelő formátum)"
		},
		optional: true
	},
	categoryId: {
		exists: { errorMessage: "Kategória azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás kategória azonosító (nem megfelelő formátum)"
		},
		isInt: {
			options: { min: 1 },
			errorMessage: "Hibás kategória azonosító (nem megfelelő formátum)"
		}
	},
	description: {
		exists: { errorMessage: "Pályaleírás kötelező" },
		isString: {
			errorMessage: "Hibás pályaleírás (nem megfelelő formátum)"
		},
		isLength: {
			options: { min: 5, max: 255 },
			errorMessage: "Hibás pályaleírás (nem megfelelő hossz)"
		}
	}
});

export const updateStudentValidation = checkSchema({
	id: idValidation,
	name: {
		exists: { errorMessage: "Tanuló neve kötelező" },
		matches: {
			options: /^[^\d'"`\\]{2,100}$/,
			errorMessage: "Hibás tanulónév (nem megfelelő formátum)"
		},
		isString: {
			errorMessage: "Hibás tanulónév (nem megfelelő formátum)"
		}
	},
	dayShift: {
		exists: { errorMessage: "Tagozat megadása kötelező" },
		isBoolean: {
			errorMessage: "Hibás tagozat (nem megfelelő formátum)"
		}
	},
	sectorId: {
		isNumeric: {
			errorMessage: "Hibás ágazat azonosító (nem megfelelő formátum)"
		},
		isInt: {
			options: { min: 1 },
			errorMessage: "Hibás ágazat azonosító (nem megfelelő formátum)"
		},
		optional: true
	},
	professionId: {
		isNumeric: {
			errorMessage: "Hibás szakma azonosító (nem megfelelő formátum)"
		},
		isInt: {
			options: { min: 1 },
			errorMessage: "Hibás szakma azonosító (nem megfelelő formátum)"
		},
		optional: true
	},
	categoryId: {
		exists: { errorMessage: "Kategória azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás kategória azonosító (nem megfelelő formátum)"
		},
		isInt: {
			options: { min: 1 },
			errorMessage: "Hibás kategória azonosító (nem megfelelő formátum)"
		}
	},
	description: {
		exists: { errorMessage: "Pályaleírás kötelező" },
		isString: {
			errorMessage: "Hibás pályaleírás (nem megfelelő formátum)"
		},
		isLength: {
			options: { min: 5, max: 255 },
			errorMessage: "Hibás pályaleírás (nem megfelelő formátum)"
		}
	}
});

// Users
export const createUserValidation = checkSchema({
	id: idValidation,
	password: passwordValidation,
	isAdmin: {
		exists: { errorMessage: "Jogkör megadása kötelező" },
		isBoolean: {
			errorMessage: "Jogosultság (nem megfelelő formátum)"
		}
	}
});

export const updatePasswordValidation = checkSchema({
	oldPassword: passwordValidation,
	newPassword: passwordValidation
});
