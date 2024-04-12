import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const requestBody = await request.json();
    requestBody.otp = "0";
    console.log(requestBody);

    const prisma = new PrismaClient();
    const result = await prisma.users.create({ data: requestBody });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
