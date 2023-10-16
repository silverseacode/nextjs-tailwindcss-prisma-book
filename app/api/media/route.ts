import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
export const s3 = new S3({
  region:process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  }
});

export async function POST(
  req: NextRequest,
  res: NextResponse
) {
    const url = new URL(req.url)
    const ex = url.searchParams.get("fileType")!

    const parts = ex.split("/");
    const fileType = parts[1];
    
    const data = await req.formData()

    const file: File | null = data.get('file') as unknown as File
  
    if (!file) {
      return NextResponse.json({ success: false })
    }
  
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

  

  const Key = `${randomUUID()}.${fileType}`;

  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Body: buffer,
    Key,
    ContentType: fileType
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return NextResponse.json({ success: true, url: Key })
}