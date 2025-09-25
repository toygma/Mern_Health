import type React from "react";
import { cn } from "../lib/utils";

interface Props {
  className?: string;
  children:React.ReactNode
}

const Button = ({ className,children }: Props) => {
  return (
    <button
      className={cn(
        "border-2 border-primary text-dark text-center bg-transparent  rounded-[15px] px-7  py-[3.5]  font-medium transition-all  duration-300 hover:bg-primary hover:text-white cursor-pointer drop-shadow-2xl hover:rounded-[55px]",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
