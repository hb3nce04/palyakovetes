/*REGEX*/

export const studentNameRegexPattern = new RegExp(/^[^\d'"`\\]{2,100}$/);
export const omIdentifierPattern = new RegExp("^[0-9]{11}$");
export const classNameRegexPattern = new RegExp(/^[^'"`\\;=()]{2,50}$/);
export const passwordPattern = new RegExp(
	"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$"
);

/*REGEX*/

/*DATABASE CONVERTERS*/
export const isAdminFromDatabaseLogicConverter = (a) =>
	a ? "Admin" : "Felhasználó";
export const workScheduleFromDatabaseLogicConverter = (a) =>
	a ? "Nappali" : "Esti";
/*DATABASE CONVERTERS*/
