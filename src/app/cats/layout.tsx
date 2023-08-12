"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { PacmanLoader } from "react-spinners"
import styles from "./page.module.scss"

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export default function CatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { error } = await getUser();

      if (error) {
        push("/auth/login");
        return;
      }

      // if the error did not happen, if everything is alright
      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return <div className={styles.container}>
      <PacmanLoader color="#36d7b7" />
    </div>
      ;
  }

  return (
    <main>
      {children}
    </main>
  );
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}