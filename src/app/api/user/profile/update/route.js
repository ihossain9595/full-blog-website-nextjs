import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request, response) {
  try {
    const headerList = headers();
    const id = parseInt(headerList.get("id"));

    const requestBody = await request.json();

    const prisma = new PrismaClient();
    const updateUser = await prisma.users.update({ where: { id: id }, data: requestBody });

    console.log(updateUser);

    return NextResponse.json({ status: "success", data: updateUser });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
