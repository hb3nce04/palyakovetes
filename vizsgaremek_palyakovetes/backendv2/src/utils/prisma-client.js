import { PrismaClient } from "@prisma/client";
var globalForPrisma;
export const prisma = globalForPrisma || new PrismaClient();
if (process.env.NODE_ENV === "development") globalForPrisma = prisma;
