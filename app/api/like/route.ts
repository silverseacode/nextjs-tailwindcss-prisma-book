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
        const {
            profilePic,
            postId,
            fullName,
            userId,
        } = await req.json();

        await main();

        const like = await prisma.likes.create({
            data: {
                profilePic,
                postId,
                fullName,
                userId,
            },
        });

        return NextResponse.json({ message: "Success", like }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    try {
        await main();
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId")!;
        const postId = url.searchParams.get("postId")!;


        const post = await prisma.likes.findFirst({
            where: {
                userId: {
                    equals: userId
                },
                postId: {
                    equals: postId
                }
            },
        })

        await prisma.likes.delete({where: {id: post?.id}})

        return NextResponse.json(
            { message: "Success" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};