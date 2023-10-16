import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database Connection Unsuccessull");
  }
}
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await main();
    const url = new URL(req.url);
    const userId = url.searchParams.get("to")!;
    const invitations = await prisma.request.findMany({
      where: { to: userId, status: "pending" },
    });

    return NextResponse.json(
      { message: "Success", invitations },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { to, from } = await req.json();

    await main();
    const userTo = await prisma.user.findFirst({ where: { id: to } });
    const userFrom = await prisma.user.findFirst({ where: { id: from } });
    if (userTo && userFrom) {
      const usersToCreate = [
        {
          email: userTo.email || "",
          fullName: userTo.fullName || "",
          image: userTo.image || "",
          userId: userTo.id || "",
          userIdThatFollows: userFrom.id || ""
        },
        {
          email: userFrom.email || "",
          fullName: userFrom.fullName || "",
          image: userFrom.image || "",
          userId: userFrom.id || "",
          userIdThatFollows: userTo.id || ""
        },
      ];
      await prisma.connections.createMany({
        data: usersToCreate,
      });
    }

    await prisma.request.updateMany({
      where: { to: to, from: from },
      data: { status: "accepted" },
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    await main();
    const url = new URL(req.url);
    const to = url.searchParams.get("to")!;
    const from = url.searchParams.get("from")!;

    await prisma.request.updateMany({
      where: { to: to, from: from },
      data: { status: "rejected" },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
