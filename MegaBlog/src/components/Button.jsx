import React from "react";

function Button({
  children,
  type = "button",
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  ...props
}) {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "lg":
        return "px-6 py-3 text-lg";
      case "xl":
        return "px-8 py-4 text-xl";
      default:
        return "px-4 py-2";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500";
      case "secondary":
        return "bg-secondary-200 text-secondary-800 hover:bg-secondary-300 focus:ring-secondary-300";
      case "ghost":
        return "text-primary-600 hover:bg-primary-50 focus:ring-primary-500";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      default:
        return "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500";
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        font-medium rounded-md ${getSizeClasses()} ${getVariantClasses()}
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
