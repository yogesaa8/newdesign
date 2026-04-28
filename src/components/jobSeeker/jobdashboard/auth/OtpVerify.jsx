import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';

const OtpVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      navigate('/dashboard');
    } else {
      alert('Please enter a 4-digit code.');
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-black dark:text-white mb-3">
          Verify OTP
        </h2>
        <p className="text-muted text-sm px-4">
          Enter the 4-digit code sent to your email.
        </p>
      </div>

      <form onSubmit={handleVerify}>
        <div className="mb-10 flex justify-center gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={inputRefs[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-16 w-16 rounded-2xl border border-stroke bg-bg-soft dark:bg-primary/5 text-center text-2xl font-bold outline-none focus:ring-1 focus:ring-primary/20 dark:border-strokedark dark:text-white transition-all shadow-sm"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-full bg-primary p-4 font-bold text-white transition-all hover:bg-secondary shadow-lg shadow-primary/20"
        >
          Verify Code
        </button>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">
            Didn't receive code?{' '}
            <button type="button" className="font-bold text-primary hover:text-secondary transition-colors">
              Resend Code
            </button>
          </p>
        </div>
        
        <div className="mt-6 text-center">
           <Link to="/login" className="text-sm font-semibold text-muted hover:text-primary transition-colors">
             Back to Login
           </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default OtpVerify;
