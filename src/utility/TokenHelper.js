import { jwtVerify, SignJWT } from "jose";

export async function CreateToken(id, email) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const payload = {
    id,
    email,
  };

  let token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuer(process.env.JWT_ISSUER).setExpirationTime(process.env.JWT_EXPIRATION_TIME).sign(secret);

  return token;
}

export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const decoded = await jwtVerify(token, secret);

  return decoded["payload"];
}
