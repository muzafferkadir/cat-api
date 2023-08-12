"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Button from "@/components/ui/button/button";
import axios from "axios";

export default function Page() {
  const [catImageUrl, setCatImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <span className={styles.imgHolder}>
          <Image src={catImageUrl} alt="/" width={300} height={300} />
        </span>
        <div className={styles.submitContainer}>
          <Button name="Yenile" onClick={getNewCatImage} loading={loading} />
        </div>
      </div>
    </div>
  );
}
