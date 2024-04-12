import { CreateToken } from "@/utility/TokenHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const result = await prisma.users.findUnique({ where: requestBody });

    if (result.length === 0) {
      return NextResponse.json({ status: "fail", data: result });
    } else {
      let token = await CreateToken(result["id"], result["email"]);
      let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const cookieString = `token=${token};expires=${expireDuration.toUTCString()};path=/`;

      return NextResponse.json({ status: "success", data: token }, { status: 200, headers: { "set-cookie": cookieString } });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
