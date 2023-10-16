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
        const { to, from, fullName, image, message, chatId, roomId } = await req.json();

        await main();

        let chatNormal = await prisma.chats.findMany({ where: { to, from } });
        let chat;

        if (chatNormal.length === 0) {
            chat = await prisma.chats.findFirst({ where: { to: from, from: to } });
        } else {
            chat = chatNormal[0]; 
        }

        if (!chat) {
            const newChat = await prisma.chats.create({ data: { from, to } });
            chat = newChat;
        }

        await prisma.messages.create({
            data: {
                to,
                from,
                fullName,
                image,
                message,
                roomId,
                chatId: chat.id
            }
        });


        return NextResponse.json({ message: "Success" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

