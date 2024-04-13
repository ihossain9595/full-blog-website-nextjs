import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const prisma = new PrismaClient();
    const result = await prisma.newsList.findMany({ where: { type: type }, select: { id: true, title: true, shortDescription: true, image1: true, image2: true, image3: true, image4: true } });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
