"use server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function CatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("secret");
  const secret = process.env.JWT_SECRET || "";

  if (token?.value) {
    try {
      verify(token?.value, secret);
    } catch (error) {
      redirect("/auth/login");
    }
  } else {
    redirect("/auth/login");
  }

  return <main>{children}</main>;
}
