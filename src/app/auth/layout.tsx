"use server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function AuthLayout({
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
      redirect("/cats");
    } catch {}
  }
  return <>{children}</>;
}
