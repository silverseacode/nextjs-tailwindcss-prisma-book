import prisma from "@/prisma";
import { Notifications } from "@prisma/client";
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
    const userId = url.searchParams.get("userId")!;
    const notifications = await prisma.notifications.findMany({
      where: { to: userId },
    });

    return NextResponse.json(
      { message: "Success", notifications },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const { notifications } = await req.json();
    await main();
    const notificationIds = notifications.map(
      (notification: Notifications) => notification.id
    );

    for (const id of notificationIds) {
      await prisma.notifications.update({
        where: { id },
        data: { status: "read" },
      });
    }

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
