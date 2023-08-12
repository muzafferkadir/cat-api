"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { PacmanLoader } from "react-spinners";
import styles from "./page.module.scss";
import { UserResponse } from "../api/auth/me/route";

export default function CatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { error }: UserResponse = await axios.get("/api/auth/me");

        if (error) {
          push("/auth/login");
          return;
        }

        // if the error did not happen, if everything is alright
        setIsSuccess(true);
      } catch (error) {}
    };

    getUser();
  }, [push]);

  if (!isSuccess) {
    return (
      <div className={styles.container}>
        <PacmanLoader color="#36d7b7" />
      </div>
    );
  }

  return <main>{children}</main>;
}