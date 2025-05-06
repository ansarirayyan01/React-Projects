import React, { useId } from "react";

const Input = React.forwardRef(function (
  { 
    label, 
    type = "text", 
    className = "", 
    error = "", 
    size = "md",
    ...props 
  },
  ref
) {
  const id = useId();
  
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-sm";
      case "lg":
        return "px-4 py-3 text-lg";
      default:
        return "px-3 py-2";
    }
  };
  
  return (
    <div className="w-full">
      {label && (
        <label 
          className="block text-sm font-medium text-secondary-700 mb-1" 
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        className={`
          ${getSizeClasses()}
          block w-full rounded-md
          border-secondary-300 shadow-sm
          focus:border-primary-500 focus:ring-primary-500
          text-secondary-900 placeholder:text-secondary-400
          ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        ref={ref}
        {...props}
        id={id}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export default Input;
