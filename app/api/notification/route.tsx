import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database Connection Unsuccessull");
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { from, to, fullName, image, postId, type } = await req.json();

    await main();
    
    const notification = await prisma.notifications.create({
      data: {
        from,
        to,
        fullName,
        image,
        postId,
        type,
        status: "unread"
      },
    });

    return NextResponse.json({ message: "Success", notification }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};