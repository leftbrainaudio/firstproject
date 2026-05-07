import React from "react";

type TextVariant = "heading" | "body" | "caption" | "code" | "label";
type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type TextWeight = "normal" | "medium" | "semibold" | "bold";
type TextColor = "primary" | "secondary" | "muted" | "accent" | "error" | "success" | "warning";

const defaultTag: Record<TextVariant, React.ElementType> = {
  heading: "h2",
  body: "p",
  caption: "span",
  code: "code",
  label: "label",
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  as?: React.ElementType;
  truncate?: boolean;
}

const colorMap: Record<TextColor, string> = {
  primary: "var(--ds-color-text-primary)",
  secondary: "var(--ds-color-text-secondary)",
  muted: "var(--ds-color-text-muted)",
  accent: "var(--ds-color-text-accent)",
  error: "var(--ds-color-error-text)",
  success: "var(--ds-color-success-text)",
  warning: "var(--ds-color-warning-text)",
};

export function Text({
  variant = "body",
  size,
  weight,
  color = "primary",
  as,
  truncate,
  style,
  children,
  ...props
}: TextProps) {
  const Tag = as ?? defaultTag[variant];

  const resolvedSize = size ?? (variant === "heading" ? "xl" : "md");

  const computedStyle: React.CSSProperties = {
    fontFamily: variant === "code"
      ? "var(--ds-font-family-mono)"
      : "var(--ds-font-family-sans)",
    fontSize: `var(--ds-font-size-${resolvedSize})`,
    fontWeight: weight
      ? `var(--ds-font-weight-${weight})`
      : variant === "heading"
      ? "var(--ds-font-weight-bold)"
      : variant === "label"
      ? "var(--ds-font-weight-medium)"
      : "var(--ds-font-weight-normal)",
    color: colorMap[color],
    lineHeight: variant === "heading" ? "var(--ds-line-height-tight)" : "var(--ds-line-height-normal)",
    ...(variant === "code" ? {
      background: "var(--ds-color-bg-secondary)",
      padding: "0.1em 0.4em",
      borderRadius: "var(--ds-radius-sm)",
      fontSize: "0.875em",
    } : {}),
    ...(truncate ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } : {}),
    ...style,
  };

  return <Tag style={computedStyle} {...props}>{children}</Tag>;
}
