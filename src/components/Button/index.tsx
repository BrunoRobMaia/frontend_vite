// src/components/Button.tsx
import type { ButtonProps } from "../../types";

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    "w-full py-3 px-4 cursor-pointer rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";

  const variants = {
    primary: "bg-[#462ebd] hover:bg-[#312567] text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border border-[#462ebd] text-[#462ebd] hover:bg-[#462ebd] ",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processando...
        </>
      ) : (
        children
      )}
    </button>
  );
}
