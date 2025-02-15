"use client";
import React, { ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  /**
   * Variante de estilo para el botón
   * - "primary": fondo principal (bg-primary)
   * - "secondary": fondo secundario (bg-secondary)
   * - "outline": solo borde
   */
  variant?: "primary" | "secondary" | "outline";
}

export function Button({
  loading = false,
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {

  const baseStyles = "inline-flex items-center px-4 py-2 rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles =
        "bg-primary text-white hover:bg-primary-hover focus:ring-primary";
      break;
    case "secondary":
      variantStyles =
        "bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary";
      break;
    case "outline":
      variantStyles =
        "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary";
      break;
    default:
      variantStyles =
        "bg-primary text-white hover:bg-primary-hover focus:ring-primary";
      break;
  }

  return (
    <button
      disabled={loading}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {loading ? <FaSpinner className="animate-spin mr-2" /> : children}
    </button>
  );
}
