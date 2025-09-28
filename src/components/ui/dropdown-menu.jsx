import React, { useState, useRef, useEffect } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ asChild, children }) {
  // Just render children, asChild is for API compatibility
  return children;
}

export function DropdownMenuContent({ children, align = "end", className = "" }) {
  // Simple absolute dropdown
  return (
    <div
      className={`absolute z-50 mt-2 min-w-[10rem] rounded-md bg-white border border-border/50 shadow-lg ${align === "end" ? "right-0" : "left-0"} ${className}`}
      tabIndex={-1}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, className = "", onClick }) {
  return (
    <div
      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm ${className}`}
      onClick={onClick}
      role="menuitem"
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSeparator() {
  return <div className="my-1 border-t border-border/50" />;
}
