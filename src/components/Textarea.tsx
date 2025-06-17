import cn from "../utils/cn";
import { forwardRef, type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "block w-full px-3 py-2 border rounded-md text-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none resize-y min-h-[80px]",
        className
      )}
      {...props}
    />
  )
);

export default Textarea;
