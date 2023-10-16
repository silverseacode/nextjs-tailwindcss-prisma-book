import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("Database Connection Unsuccessull");
    }
}

export const POST = async (req: Request, res: NextResponse) => {
    try {
        const {
            profilePic,
            postId,
            fullName,
            userId,
            description
        } = await req.json();

        await main();

        const comment = await prisma.comments.create({
            data: {
                profilePic,
                postId,
                fullName,
                userId,
                description
            },
        });

        return NextResponse.json({ message: "Success", comment }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};