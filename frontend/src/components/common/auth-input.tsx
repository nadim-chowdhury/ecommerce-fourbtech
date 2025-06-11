import { Eye, EyeOff } from "lucide-react";

export const AuthInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  showPassword,
  onTogglePassword,
}: any) => (
  <div className="relative group">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50 focus:bg-white placeholder-gray-500"
      required={required}
    />
    {(name === "password" || name === "confirmPassword") && (
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    )}
  </div>
);
