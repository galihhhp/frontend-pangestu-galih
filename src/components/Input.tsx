import cn from "../utils/cn";
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "block w-full px-3 py-2 border rounded-md text-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  )
);

export default Input;
