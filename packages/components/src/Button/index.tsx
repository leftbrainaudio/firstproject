import React from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonColorScheme = "brand" | "neutral" | "success" | "error" | "warning";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  colorScheme?: ButtonColorScheme;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({
  variant = "solid",
  colorScheme = "brand",
  size = "md",
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  children,
  className,
  as: Tag = "button",
  ...props
}: ButtonProps) {
  const cls = [
    styles.btn,
    styles[size],
    styles[variant],
    styles[colorScheme],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={cls} disabled={isDisabled || isLoading} {...props}>
      {isLoading ? <span className={styles.spinner} aria-hidden /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </Tag>
  );
}
