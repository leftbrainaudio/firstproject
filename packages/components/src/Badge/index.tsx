import React from "react";
import styles from "./Badge.module.css";

export type BadgeVariant = "solid" | "subtle" | "outline";
export type BadgeColorScheme = "brand" | "neutral" | "success" | "error" | "warning";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
}

export function Badge({
  variant = "subtle",
  colorScheme = "brand",
  size = "md",
  children,
  className,
  ...props
}: BadgeProps) {
  const cls = [styles.badge, styles[size], styles[variant], styles[colorScheme], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={cls} {...props}>
      {children}
    </span>
  );
}
