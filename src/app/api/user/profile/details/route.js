import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const headerList = headers();

    const id = parseInt(headerList.get("id"));

    console.log("<<<<<<<<<<<<<<<<<<<<<<<< ID >>>>>>>>>>>>>>>>>>>>>>>>");
    console.log(id);

    const prisma = new PrismaClient();
    const userDetails = await prisma.users.findUnique({ where: { id: id } });

    console.log(userDetails);

    return NextResponse.json({ status: "success", data: userDetails });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
