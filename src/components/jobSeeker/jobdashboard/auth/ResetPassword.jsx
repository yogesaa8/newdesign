import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    navigate('/verify-otp');
  };

  return (
    <AuthLayout>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-black dark:text-white mb-3">
          Reset Password
        </h2>
        <p className="text-muted text-sm px-4">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>
      </div>

      <form onSubmit={handleReset} className="space-y-6">
        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-full border border-stroke bg-bg-soft dark:bg-primary/5 py-4 px-8 text-black outline-none focus:ring-1 focus:ring-primary/20 dark:border-strokedark dark:text-white transition-all placeholder:text-muted/60"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-full bg-primary p-4 font-bold text-white transition-all hover:bg-secondary shadow-lg shadow-primary/20"
        >
          Send OTP
        </button>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">
            Remember your password?{' '}
            <Link to="/login" className="font-bold text-primary hover:text-secondary transition-colors">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
