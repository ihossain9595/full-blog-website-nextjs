import { NextResponse } from "next/server";
import { VerifyToken } from "./utility/TokenHelper";
import { headers } from "next/headers";

export async function middleware(request, response) {
  try {
    const token = request.cookies.get("token");
    console.log("ISMAIL HOSSAIN -> ", token);

    const payload = await VerifyToken(token["Value"]);
    console.log("ISMAIL HOSSAIN -> ", payload);

    const requestHeader = new Headers(request.headers);
    requestHeader.set("email", payload["email"]);
    requestHeader.set("id", payload["id"]);
    return NextResponse.next({ request: { headers: requestHeader } });
  } catch (error) {
    const requestHeader = new Headers(request.headers);
    requestHeader.set("email", "0");
    requestHeader.set("id", "0");
    return NextResponse.next({ request: { headers: requestHeader } });
  }
}
