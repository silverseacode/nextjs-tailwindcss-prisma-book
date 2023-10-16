import prisma from "@/prisma";
import { cookies } from "next/headers";
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
        const to = url.searchParams.get("to")!;
        const cookieStore = cookies();
        const cookie = cookieStore.get("userId");
        const from = cookie?.value;

        let chat = []

        chat = await prisma.chats.findMany({ where: { to, from } , include: {messages: true} })
        if (chat.length === 0) {
            chat = await prisma.chats.findMany({ where: { to: from, from: to }, include: {messages: true} })
        }

        return NextResponse.json(
            { message: "Success", chat },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

