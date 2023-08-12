import { serialize } from "cookie";

export async function POST(request: Request) {
  const seralized = serialize('secret', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  const response = {
    message: "Logged out!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
}