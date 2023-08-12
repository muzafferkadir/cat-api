"use client";

import React, { use, useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Button from "@/components/ui/button/button";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Page() {
  const [catImageUrl, setCatImageUrl] = useState<string>("/images/cat.jpeg");
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    getNewCatImage();
  }, []);

  const getNewCatImage = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/cats");
      if (data.url) {
        setCatImageUrl(data.url);
        setLoading(false);
      }
    } catch (error) {
      // TODO: toast message
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      // TODO: toast message
      console.log(error);
    }
    push("/auth/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>Welcome to Cat API</div>
      <div className={styles.innerContainer}>
        <span className={styles.imgHolder}>
          <Image src={catImageUrl} alt="/" width={300} height={300} priority />
        </span>
        <div className={styles.submitContainer}>
          <Button name="Refresh" onClick={getNewCatImage} loading={loading} />
        </div>
      </div>
      <div className={styles.logOut} onClick={logOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          height="24"
          width="24"
        >
          <path
            fillRule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>Logout</span>
      </div>
    </div>
  );
}
