import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const count = await prisma.users.count({ where: { email: requestBody["email"], otp: requestBody["otp"] } });

    if (count === 1) {
      await prisma.users.update({ where: { email: requestBody["email"] }, data: { otp: "0", password: requestBody["password"] } });

      return NextResponse.json({ status: "success", data: "Password reset successfully" });
    } else {
      return NextResponse.json({ status: "fail", data: "Password reset failed" });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
