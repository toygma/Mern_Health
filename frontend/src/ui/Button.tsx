import type React from "react";
import { cn } from "../lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  type,
  className,
  children,
  disabled = false,
  loading = false,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        `border-2 border-primary text-dark text-center bg-transparent rounded-[15px] px-7 py-[3.5] font-medium transition-all duration-300 cursor-pointer drop-shadow-2xl  flex items-center justify-center gap-2 ${
          disabled
            ? ""
            : "hover:bg-primary hover:text-white hover:rounded-[55px]"
        }`,
        className,
        (disabled || loading) && "cursor-not-allowed opacity-60"
      )}
      disabled={disabled || loading}
    >
      {loading ? <span className="animate-pulse">Loading...</span> : children}
    </button>
  );
};

export default Button;
