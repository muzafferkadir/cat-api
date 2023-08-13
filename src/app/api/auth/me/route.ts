import { AxiosError } from "axios";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export async function GET() {
  try {
    if(!checkJWT()) {
      return NextResponse.json({ message: "Unauthorized", }, { status: 401, });
    }

    const response = { user: "Admin", };
    return new Response(JSON.stringify(response), { status: 200, });
  } catch (e) {
    console.log("hata", e);

    return NextResponse.json({ message: "Something went wrong", }, { status: 500, });
  }
}

export const checkJWT = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("secret");

  if (!token) return false;

  try {
    const { value } = token;
    const secret = process.env.JWT_SECRET || "";

    verify(value, secret);

    return true;
  } catch {
    return false
  }
}