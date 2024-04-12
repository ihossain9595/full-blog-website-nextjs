import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const count = await prisma.users.count({ where: requestBody });

    if (count === 1) {
      return NextResponse.json({ status: "success", data: "Valid OTP code" });
    } else {
      return NextResponse.json({ status: "fail", data: "Invalid OTP code" });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
