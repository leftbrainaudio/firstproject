"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
}

function ModalRoot({ isOpen, onClose, children, size = "md", closeOnOverlayClick = true }: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => { if (closeOnOverlayClick && e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal
    >
      <div ref={contentRef} className={[styles.content, styles[size]].join(" ")}>
        {children}
      </div>
    </div>,
    document.body
  );
}

function ModalHeader({
  children,
  onClose,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { onClose?: () => void }) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(" ")} {...props}>
      <span style={{ fontWeight: "var(--ds-font-weight-semibold)", fontSize: "var(--ds-font-size-lg)", color: "var(--ds-color-text-primary)" }}>
        {children}
      </span>
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
      )}
    </div>
  );
}

function ModalBody({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={[styles.body, className].filter(Boolean).join(" ")} {...props}>{children}</div>;
}

function ModalFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={[styles.footer, className].filter(Boolean).join(" ")} {...props}>{children}</div>;
}

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
