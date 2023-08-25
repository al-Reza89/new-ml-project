import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getCollection() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    // console.log("backend call");

    const firstCome = await prisma?.collection.findFirst({
      where: {
        userId: currentUser.id,
        isValidate: {
          equals: 0,
        },
        isShow: {
          equals: 1,
        },
      },
    });

    if (firstCome === null) {
      const mlData = await prisma?.collection.findFirst({
        where: {
          isValidate: {
            equals: 0,
          },
          isShow: {
            equals: 0,
          },
        },
      });

      const mydata = await prisma?.collection.update({
        where: {
          id: mlData?.id,
        },
        data: {
          isShow: 1,
          userId: currentUser.id,
        },
      });

      return mydata;
    } else {
      const mlData = await prisma?.collection.findFirst({
        where: {
          id: firstCome?.id,
          userId: currentUser.id,
          isValidate: {
            equals: 0,
          },
          isShow: {
            equals: 1,
          },
        },
      });

      return mlData;
    }
  } catch (error: any) {
    return NextResponse.error();
  }
  // }
}
