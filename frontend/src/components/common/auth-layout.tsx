const AuthLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  onFooterClick,
}: any) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      {/* Auth Card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl">
        {children}

        {/* Switch Form */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {footerText}{" "}
            <button
              onClick={onFooterClick}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
            >
              {footerLink}
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default AuthLayout;
