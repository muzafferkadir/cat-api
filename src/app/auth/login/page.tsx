"use client";
import Button from "@/components/ui/button/button";
import styles from "./page.module.scss";
import Input from "@/components/ui/input/input";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [payload, setPayload] = useState({
    username: "admin",
    password: "admin",
  });
  const { username, password } = payload;
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/auth/login", payload);
      toast.success("Login success");
      push("/cats");
    } catch (e: any) {
      setLoading(false);
      toast.error(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authContainer}>
        <h1 className={styles.title}>😺 Cat Images 😾</h1>
        <h2 className={styles.subtitle}>Please login to continue</h2>
        <form onSubmit={handleLogin}>
          <Input
            value={username}
            onChange={(e) =>
              setPayload({ ...payload, username: e.target.value })
            }
            placeholder="Username"
          />
          <Input
            value={password}
            onChange={(e) =>
              setPayload({ ...payload, password: e.target.value })
            }
            placeholder="Password"
            type="password"
          />
          <Button name="Login" loading={loading} />
        </form>
      </div>
      <div className={styles.bannerContainer}>
        <Image
          objectFit="cover"
          priority
          src="/images/auth.jpg"
          alt="jpg"
          fill
        />
      </div>
    </div>
  );
}