import type { PrismaConfig } from "prisma";
import { env } from "prisma/config";

type Env = {
  POSTGRES_URL: string;
};
export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env<Env>("POSTGRES_URL"),
  },
} satisfies PrismaConfig;