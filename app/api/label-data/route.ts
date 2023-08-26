import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PUT(request: Request) {
  const body = await request.json();

  const { id, ...data } = body;

  // console.log({ data: data });

  try {
    const response = await prisma?.collection.update({
      where: {
        id: id,
      },
      data: data,
    });

    const count = await prisma?.user.update({
      where: {
        id: data.userId,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}
