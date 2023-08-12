import React, { HTMLInputTypeAttribute } from "react";
import styles from "./input.module.scss";
import cname from "classnames";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};

export default function Input({
  value,
  onChange,
  className,
  placeholder,
  type = "text",
}: Props) {
  const cx = cname(className || "", styles.container);
  return (
    <input
      className={cx}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}
