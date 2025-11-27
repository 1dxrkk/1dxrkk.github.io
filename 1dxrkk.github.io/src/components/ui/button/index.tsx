import "./Button.css";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "icon" | "ghost";
  subtypes?: "gradient" | "toggle";
  toggled?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  subtypes,
  toggled = false,
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) {

  const className = [
    "btn",
    `btn-${variant}`,
    subtypes ? `btn-${subtypes}` : null,

    // ⬅️ Only apply toggled class if it's a TOGGLE icon button
    toggled && variant === "icon" && subtypes === "toggle"
      ? "btn-toggled"
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
