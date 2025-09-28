import React from "react";

export function Table({ children, className = "w-full border-collapse" }) {
  return <table className={className}>{children}</table>;
}

export function TableHeader({ children, className = "" }) {
  return <thead className={className}>{children}</thead>;
}

export function TableBody({ children, className = "" }) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className = "border-b last:border-b-0" }) {
  return <tr className={className}>{children}</tr>;
}

export function TableHead({ children, className = "px-4 py-2 text-left" }) {
  return <th className={className}>{children}</th>;
}

export function TableCell({ children, className = "px-4 py-2" }) {
  return <td className={className}>{children}</td>;
}
