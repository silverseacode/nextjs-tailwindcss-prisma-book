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
            to,
            from,
            status,
            fullName,
            image
        } = await req.json();

        await main();

        const request = await prisma.request.create({
            data: {
                to,
                from,
                status,
                fullName,
                image
            },
        });

        return NextResponse.json({ message: "Success", request }, { status: 201 });
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
        const to = url.searchParams.get("to")!;
        const from = url.searchParams.get("from")!;

        await prisma.connections.deleteMany({
            where: {
                OR: [
                    { userId: from },
                    { userId: to },
                ],
            },
        });

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