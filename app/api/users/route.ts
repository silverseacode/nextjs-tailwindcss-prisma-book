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
        const url = new URL(req.url)
        const id = url.searchParams.get("userId")!
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    id: id
                }
            },
            take: 5,
        });
        return NextResponse.json({ message: "Success", users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};