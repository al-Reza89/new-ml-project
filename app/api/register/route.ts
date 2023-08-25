import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // post method e sob kisu body theke pabo
  const body = await request.json();

  const { email, name, password } = body;
  // password hash korlam
  const hashedPassword = await bcrypt.hash(password, 12);
  // database e add korbo

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  // next resposne theke return kora lagbe

  return NextResponse.json(user);
}
