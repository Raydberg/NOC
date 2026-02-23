import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";
import { envs } from "../plugins/envs.plugin";

const connectionString = `${envs.POSTGRES_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };