import React from "react";

export const Input = React.forwardRef(function Input({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={
        "border border-border/50 rounded-md px-3 py-2 text-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition " +
        className
      }
      {...props}
    />
  );
});
