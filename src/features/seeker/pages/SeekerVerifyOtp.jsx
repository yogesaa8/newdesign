import React, { useRef, useState } from 'react'
import toast from "@/lib/toast";
import AuthLayout from '../layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';

const SeekerVerifyOtp = () => {
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
            toast.error('Please enter a 4-digit code.');
        }
    };

    return (
        <AuthLayout>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-on-surface dark:text-white mb-3">
                    Verify OTP
                </h2>
                <p className="text-outline text-sm px-4">
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
                            className="h-16 w-16 rounded-2xl border border-outline-variant bg-surface-container-low dark:bg-primary/5 text-center text-2xl font-bold outline-none focus:ring-1 focus:ring-primary/20 dark:border-outline-variant/30 dark:text-white transition-all shadow-sm"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-full bg-primary p-4 font-bold text-on-primary transition-all hover:bg-primary-container shadow-lg shadow-primary/20"
                >
                    Verify Code
                </button>

                <div className="mt-8 text-center">
                    <p className="text-sm text-outline">
                        Didn't receive code?{' '}
                        <button type="button" className="font-bold text-primary hover:text-primary-container transition-colors">
                            Resend Code
                        </button>
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <Link to="/job-seeker-login" className="text-sm font-semibold text-outline hover:text-primary transition-colors">
                        Back to Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}

export default SeekerVerifyOtp
