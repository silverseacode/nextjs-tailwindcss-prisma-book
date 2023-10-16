import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
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
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await main();
    const url = new URL(req.url);
    const skip = url.searchParams.get("skip")!;
    const take = url.searchParams.get("take")!;
    const isProfile = url.searchParams.get("isProfile");
    const userId = url.searchParams.get("userId")!;
    const whereCondition = isProfile === "true" ? { userId } : {};
    
    const totalPosts = await prisma.post.count({where: whereCondition});
    

    const posts = await prisma.post.findMany({
      skip: Number(skip),
      take: Number(take),
      include: { likes: true, comments: true },
      orderBy: {
        createdAt: "desc",
      },
      where: whereCondition,
    });

    const postsSigned = await Promise.all(
      posts.map(async (post) => {
        post.pictureUrl = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: post.pictureUrl,
          }),
          { expiresIn: 24 * 60 * 60 }
        );
        return post;
      })
    );

    return NextResponse.json(
      { message: "Success", postsSigned, totalPosts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
