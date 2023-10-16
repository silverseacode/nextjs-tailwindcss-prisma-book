import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../media/route";
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database Connection Unsuccessull");
  }
}
export const revalidate = 10

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { description, pictureUrl, profilePic, fullName } = await req.json();

    await main();
    const cookieStore = cookies();
    const cookie = cookieStore.get("userId");
    const userId = cookie?.value;
    const user = await prisma.post.create({
      data: {
        description: description,
        pictureUrl: pictureUrl,
        userId: userId ?? "",
        profilePic: profilePic,
        fullName: fullName,
      },
    });

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
    const url = new URL(req.url);
    const id = url.searchParams.get("id")!;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {likes: true, comments: true}
    });


    if (post !== null) {
      post.pictureUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: post.pictureUrl,
        }),
        { expiresIn: 24 * 60 * 60 }
      );
    }


    if (post === null)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });


    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
