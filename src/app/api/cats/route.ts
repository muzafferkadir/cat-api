import { getCatImage } from "@/services/api";
import { NextResponse } from "next/server";
import { checkJWT } from "../auth/me/route";

export async function GET() {
  try {
    if(!checkJWT()) {
      return NextResponse.json({ message: "Unauthorized", }, { status: 401, });
    }

    const response = await getCatImage();

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
  } catch (e: any) {
    return NextResponse.json(
      { message: "Something went wrong", },
      { status: 500, }
    );
  }
}