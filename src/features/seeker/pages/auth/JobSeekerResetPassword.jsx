import { Link, useNavigate } from "react-router-dom";
import { FiBriefcase, FiCheckCircle } from "react-icons/fi";

const FloatingInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = true,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        className="peer w-full border-0 border-b border-slate-300 bg-transparent px-0 pb-3 pt-6 text-sm outline-none transition-all focus:border-orange-600"
      />

      <label className="pointer-events-none absolute left-0 top-5 text-sm text-slate-500 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-orange-600 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </label>
    </div>
  );
};

const JobSeekerResetPassword = () => {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    navigate("/seeker/verify-otp");
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] w-full overflow-hidden bg-slate-50">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 xl:px-24 relative">
        {/* Logo */}
        {/* <div className="absolute top-12 left-16 flex items-center gap-2">
          <div className="p-2 rounded-xl">
            <FiBriefcase size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">JobPortal</span>
        </div> */}

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-6xl xl:text-7xl font-extrabold tracking-tight">
            Reset Access
          </h1>

          <h2 className="text-2xl font-semibold opacity-90">
            Secure your account and continue your journey.
          </h2>

          <p className="max-w-md text-lg opacity-70 leading-relaxed">
            Forgot your password? No worries. Verify your identity with OTP and
            create a new secure password in minutes.
          </p>

          {/* Feature Points */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600" size={20} />
              <span>Email verification with OTP</span>
            </div>

            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600" size={20} />
              <span>Fast password recovery process</span>
            </div>

            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600" size={20} />
              <span>Secure account protection</span>
            </div>
          </div>
        </div>

        {/* Decorative blur */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-64 h-64 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
        <div className="w-full min-h-screen lg:min-h-0 lg:h-full lg:rounded-l-[4rem] p-8 sm:p-12 xl:p-16 flex flex-col justify-center shadow-2xl relative overflow-hidden">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            {/* <div className="lg:hidden flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl shadow-lg">
                  <FiBriefcase size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  JobPortal
                </span>
              </div>
            </div> */}

            {/* Heading */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-3">Reset Password</h2>
              <p className="text-sm px-4 text-slate-500">
                Enter your email address and we'll send you an OTP to reset your
                password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleReset} className="space-y-6">
              <FloatingInput label="Email Address" type="email" />

              <button
                type="submit"
                className="w-full p-4 font-bold transition-all shadow-lg bg-orange-600 hover:bg-orange-700 text-white"
              >
                Send OTP
              </button>

              <div className="mt-8 text-center">
                <p className="text-sm">
                  Remember your password?{" "}
                  <Link
                    to="/seeker/login"
                    className="font-bold transition-colors hover:text-orange-600"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerResetPassword;
