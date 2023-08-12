import React from "react";
import cname from "classnames";
import styles from "./button.module.scss";
import { PulseLoader } from "react-spinners";

type Props = {
  name: string;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  name,
  className,
  loading = false,
  onClick,
}: Props) {
  const cx = cname(className || "", styles.container);

  return (
    <button className={cx} disabled={loading} onClick={onClick}>
      {loading ? <PulseLoader className={styles.loader} color="white" size={10} speedMultiplier={2} /> : name}
    </button>
  );
}
