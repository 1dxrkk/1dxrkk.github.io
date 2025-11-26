import "./Button.css";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "icon" | "ghost";
  subtypes?: "gradient";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  subtypes,
  disabled = false,
  onClick,
}: ButtonProps) {

  const className = [
    "btn",
    `btn-${variant}`,
    subtypes ? `btn-${subtypes}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
