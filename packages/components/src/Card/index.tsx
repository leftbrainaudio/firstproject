import React from "react";
import styles from "./Card.module.css";

export type CardVariant = "flat" | "raised" | "elevated";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

function CardRoot({ variant = "flat", children, className, ...props }: CardProps) {
  return (
    <div className={[styles.card, styles[variant], className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={[styles.header, className].filter(Boolean).join(" ")} {...props}>{children}</div>;
}

function CardBody({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={[styles.body, className].filter(Boolean).join(" ")} {...props}>{children}</div>;
}

function CardFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={[styles.footer, className].filter(Boolean).join(" ")} {...props}>{children}</div>;
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
