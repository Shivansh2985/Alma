import React from "react";

export const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-xl shadow border ${className}`} {...props}>{children}</div>
);

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`p-6 border-b bg-blue-900 rounded-t-xl ${className}`} {...props}>{children}</div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
  <h2 className={`text-xl font-bold ${className}`} {...props}>{children}</h2>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props}>{children}</div>
);
