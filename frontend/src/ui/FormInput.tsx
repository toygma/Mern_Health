import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

interface Props {
  register: any;
  error: any;
  type: string;
  name: string;
  icon?: any;
  className?: string;
}

const FormInput = ({
  register,
  error,
  type,
  name,
  icon: Icon,
  className,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const labelText =
    name === "email"
      ? "Email Address"
      : name === "name"
      ? "Full Name"
      : name.charAt(0).toUpperCase() + name.slice(1);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
        )}
        <input
          id={name}
          type={inputType}
          placeholder=" "
          className={cn(
            "peer border-2 border-gray-200 rounded-lg outline-none w-full py-3.5 px-12  transition-all duration-300 bg-white focus:bg-white",
            className
          )}
          {...register(name)}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors z-10"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
        <label
          htmlFor={name}
          className="absolute left-12 -top-2.5 text-sm text-black bg-white px-2 transition-all duration-200 pointer-events-none 
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent
          peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-black peer-focus:bg-white"
        >
          {labelText}
        </label>
      </div>
      {error && (
        <p className="text-red-500! text-xs mt-1.5 ml-1 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
          {error}
        </p>
      )}
    </div>
  );
};
export default FormInput;
