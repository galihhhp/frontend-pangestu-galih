import type { ReactNode } from "react";
import cn from "../utils/cn";

type LabelProps = {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
};

const Label = ({ children, className = "", htmlFor }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      "col-span-4 text-sm font-semibold text-neutral-700",
      className
    )}>
    {children}
  </label>
);

export default Label;
