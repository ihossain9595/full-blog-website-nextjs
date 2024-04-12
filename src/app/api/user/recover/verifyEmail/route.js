import { SendMail } from "@/utility/EmailUtility";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const prisma = new PrismaClient();
    const count = await prisma.users.count({ where: { email: email } });

    console.log(count);
    console.log(email);

    if (count === 1) {
      const code = Math.floor(100000 + Math.random() * 900000);
      const EmailText = `Your OTP code is = ${code}`;
      const EmailSubject = "Full Blog Website Verification Code";

      await SendMail(email, EmailText, EmailSubject);

      const updateUser = await prisma.users.update({ where: { email: email }, data: { otp: code.toString() } });

      return NextResponse.json({ status: "success", data: updateUser });
    } else {
      return NextResponse.json({ status: "fail", data: "No user found!" });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
