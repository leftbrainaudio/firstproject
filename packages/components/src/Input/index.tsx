import React from "react";
import styles from "./Input.module.css";

export type InputVariant = "outline" | "filled";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  isInvalid?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  errorText?: string;
  label?: string;
}

export function Input({
  variant = "outline",
  size = "md",
  isInvalid = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  helperText,
  errorText,
  label,
  className,
  id,
  ...props
}: InputProps) {
  const inputCls = [
    styles.input,
    styles[size],
    variant === "filled" ? styles.filled : null,
    isInvalid || errorText ? styles.invalid : null,
    leftIcon ? styles.hasLeft : null,
    rightIcon ? styles.hasRight : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputEl = (
    <div className={styles.wrapper}>
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <input id={id} className={inputCls} disabled={isDisabled} {...props} />
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </div>
  );

  if (!label && !helperText && !errorText) return inputEl;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontSize: "var(--ds-font-size-sm)",
            fontWeight: "var(--ds-font-weight-medium)",
            color: "var(--ds-color-text-primary)",
            marginBottom: "var(--ds-space-1)",
          }}
        >
          {label}
        </label>
      )}
      {inputEl}
      {errorText ? (
        <p className={styles.errorText}>{errorText}</p>
      ) : helperText ? (
        <p className={styles.helperText}>{helperText}</p>
      ) : null}
    </div>
  );
}
