import axios from "axios";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get("secret");

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  try {
    verify(value, secret);

    // TODO: create axios instance
    const response = await axios.get(`${process.env.CAT_API_BASE_URL}/images/search`,
      {
        headers: {
          'x-api-key': process.env.CAT_API_KEY
        }
      }
    )
    if (response?.data?.[0]?.url) {
      return NextResponse.json(
        { url: response.data[0].url },
        { status: 200, }
      );
    }

    return NextResponse.json(
      { message: "Picture not found", },
      { status: 404, }
    );

  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong", },
      { status: 400, }
    );
  }
}