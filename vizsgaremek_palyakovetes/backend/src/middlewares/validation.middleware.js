import { checkSchema } from "express-validator";
import { validationResult } from "express-validator";

const passwordValidationOptions = {
	minLength: 8,
	maxLength: 24,
	minUppercase: 1,
	minLowercase: 1,
	minNumbers: 1,
	minSymbols: 1
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
export const registerValidation = checkSchema({
	id: {
		exists: { errorMessage: "OM azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás OM azonosító (nem megfelelő formátum)"
		},
		isLength: {
			options: { min: 11, max: 11 },
			errorMessage: "Hibás OM azonosító (nem megfelelő hossz)"
		}
	},
	password: {
		exists: { errorMessage: "Jelszó kötelező" },
		isStrongPassword: {
			options: passwordValidationOptions,
			errorMessage: "Hibás jelszó (gyenge)"
		}
	},
	isAdmin: {
		exists: { errorMessage: "Admin jogosultság kötelező" },
		isBoolean: {
			errorMessage: "Jogosultság (nem megfelelő formátum)"
		}
	}
});

export const loginValidation = checkSchema({
	id: {
		exists: { errorMessage: "OM azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás OM azonosító (nem megfelelő formátum)"
		},
		isLength: {
			options: { min: 11, max: 11 },
			errorMessage: "Hibás OM azonosító (nem megfelelő hossz)"
		}
	},
	password: {
		exists: { errorMessage: "Jelszó kötelező" },
		isStrongPassword: {
			options: passwordValidationOptions,
			errorMessage: "Hibás jelszó (gyenge)"
		}
	}
});

// Classes
export const classValidation = checkSchema({
	schoolId: {
		exists: { errorMessage: "Iskola azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás iskola azonosító (nem megfelelő formátum)"
		},
		isLength: {
			options: { min: 1 },
			errorMessage: "Hibás iskola azonosító (nem megfelelő hossz)"
		}
	},
	name: {
		isLength: {
			options: { min: 3 },
			errorMessage: "Osztály neve túl rövid"
		},
		exists: { errorMessage: "Osztály neve kötelező" },
		isString: {
			errorMessage: "Hibás osztály név (nem megfelelő formátum)"
		}
	},
	finishingYear: {
		exists: { errorMessage: "Végzési év kötelező" },
		isNumeric: {
			errorMessage: "Hibás végzési év (nem megfelelő formátum)"
		}
	}
});

// Students
export const createStudentValidation = checkSchema({
	id: {
		exists: { errorMessage: "OM azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás OM azonosító (nem megfelelő formátum)"
		},
		isLength: {
			options: { min: 11, max: 11 },
			errorMessage: "Hibás OM azonosító (nem megfelelő hossz)"
		}
	},
	name: {
		exists: { errorMessage: "Tanuló neve kötelező" },
		isString: {
			errorMessage: "Hibás tanuló név (nem megfelelő formátum)"
		}
	},
	classId: {
		exists: { errorMessage: "Osztály azonosító kötelező" },
		isNumeric: {
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
		}
	},
	professionId: {
		exists: { errorMessage: "Szakma azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás szakma azonosító (nem megfelelő formátum)"
		}
	},
	categoryId: {
		exists: { errorMessage: "Kategória azonosító kötelező" },
		isNumeric: {
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
	id: {
		exists: { errorMessage: "OM azonosító kötelező" },
		isNumeric: {
			errorMessage: "Hibás OM azonosító (nem megfelelő formátum)"
		},
		isLength: {
			options: { min: 11, max: 11 },
			errorMessage: "Hibás OM azonosító (nem megfelelő hossz)"
		}
	},
	name: {
		exists: { errorMessage: "Tanuló neve kötelező" },
		isString: {
			errorMessage: "Hibás tanuló név (nem megfelelő formátum)"
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
		}
	},
	professionId: {
		isNumeric: {
			errorMessage: "Hibás szakma azonosító (nem megfelelő formátum)"
		}
	},
	categoryId: {
		exists: { errorMessage: "Kategória azonosító kötelező" },
		isNumeric: {
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

// Users
export const updatePasswordValidation = checkSchema({
	oldPassword: {
		exists: { errorMessage: "Régi jelszó kötelező" },
		isStrongPassword: {
			options: passwordValidationOptions,
			errorMessage: "Hibás régi jelszó (gyenge)"
		}
	},
	newPassword: {
		exists: { errorMessage: "Új jelszó kötelező" },
		isStrongPassword: {
			options: passwordValidationOptions,
			errorMessage: "Hibás új jelszó (gyenge)"
		}
	}
});
