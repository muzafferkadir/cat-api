import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { logout } from "../logout/route";

const MAX_AGE = 60 * 15; // 15 minutes

export async function POST(request: Request) {
  logout();
  const body = await request.json();

  const { username, password } = body;
  if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {
    return NextResponse.json({ message: "Unauthorized", }, { status: 401, });
  }

  const secret = process.env.JWT_SECRET || "";
  const token = sign({ username, }, secret, { expiresIn: MAX_AGE, });

  const seralized = serialize('secret', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = { message: "Authenticated!", };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
}