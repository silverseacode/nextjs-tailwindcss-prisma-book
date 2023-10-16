import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database Connection Unsuccessull");
  }
}


export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { fullName, email, image } = await req.json();
    await main();
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    if (user === null) {
      await prisma.user.create({
        data: { fullName, email, image, aboutMe: "" }
      })
    }

    if (user && 'id' in user) {
      const userId = user.id;
      cookies().set('userId', userId);
    }
    return NextResponse.json({ message: "Success", user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await main();
    const url = new URL(req.url)
    const id = url.searchParams.get("userId")!
    const user = await prisma.user.findFirst({ where: { id }, include: {posts: true, connections: true} });
    if (!user)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};