import * as React from "react";

import { cn } from "@/lib/utils";

const Input = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full rounded-lg placeholder-onSurface-disabled text-onSurface bg-surface px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 ring-offset-0 ring-primary focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };
