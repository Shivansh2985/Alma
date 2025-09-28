import React from "react";

export const Button = ({ children, className = "", variant = "default", size = "md", ...props }) => {
  let base = "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  let variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 bg-white hover:bg-blue-50",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    purple: "bg-purple-600 text-white hover:bg-purple-700"
  };
  let sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
