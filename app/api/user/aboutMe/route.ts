import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database Connection Unsuccessull");
  }
}


export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const { userId, text } = await req.json();
    await main();
    
    const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          aboutMe: text,
        },
      });
    

    return NextResponse.json({ message: "Success", user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};