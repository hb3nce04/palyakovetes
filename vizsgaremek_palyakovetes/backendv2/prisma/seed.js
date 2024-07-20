import schools from "./json/schools.json" with {type: 'json'};
import professions from "./json/professions.json" with {type: 'json'};
import categories from "./json/categories.json" with {type: 'json'};
import sectors from "./json/sectors.json" with {type: 'json'};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedingSchools() {
	await prisma.School.createMany({
		data: schools
	}).then(() => console.log("Schools seeded..."));
}

async function seedingProfessions() {
	await prisma.Profession.createMany({
		data: professions
	}).then(() => console.log("Professions seeded..."));
}

async function seedingCategories() {
	await prisma.Category.createMany({
		data: categories
	}).then(() => console.log("Categories seeded..."));
}

async function seedingSectors() {
	await prisma.Sector.createMany({
		data: sectors
	}).then(() => console.log("Sectors seeded..."));
}

async function seedingOthers() {
    await prisma.User.createMany({
		data: [
            {id: 11111111111, password: "$2a$12$cLQBwFxorrtr16PWatQBo.NROOZKJ1vDiD9Hk0ex58tPxGwaFo51q", is_admin: true},
            {id: 22222222222, password: "$2a$12$qdySoYVuqA8S4u8dpLjY0evcrLTpN6QfaVZcfEm4V0zvAfOYqqa5m", is_admin: false}
        ]
	}).then(() => console.log("Users seeded..."));
    await prisma.Class.createMany({
		data: [
            {school_id: 3, user_id: 22222222222, name: '12.A', finishing_year: 2018},
            {school_id: 3, user_id: 22222222222, name: '12.D', finishing_year: 2022},
        ]
	}).then(() => console.log("Classes seeded..."));
    await prisma.Student.createMany({
		data: [
            {id: 12345678910, name: "Kovács József", class_id: 2, day_shift: true, profession_id: 12},
            {id: 12345678911, name: "Soós Gizella", class_id: 2, day_shift: false, profession_id: 13},
            {id: 12345678912, name: "Lukács Donát", class_id: 2, day_shift: true, profession_id: 20},
        ]
	}).then(() => console.log("Students seeded..."));
    
}

const seeding = async () => {
    console.log("Seeding started...")
	await seedingSchools();
	await seedingProfessions();
	await seedingCategories();
	await seedingSectors();
    await seedingOthers();
};

seeding()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
