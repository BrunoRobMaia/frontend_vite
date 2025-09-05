import type { InputProps } from "../../types";

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-lg border bg-white
          focus:ring-2 focus:ring-[#462ebd] focus:border-transparent 
          outline-none transition-all duration-200
          ${error ? "border-red-500 border-2" : "border-gray-300 border-2"}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
