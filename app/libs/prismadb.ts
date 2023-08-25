// prisma client sob jaigay hard code kore o kora jai but error dibe next js its best practice

import { PrismaClient } from "@prisma/client";

// given global defination of prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// ekta client create korlam hoy eita global prisma ke khujbe ba new prisma client create  korbe

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = client;

export default client;
