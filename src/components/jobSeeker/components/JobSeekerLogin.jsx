import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import AuthLayout from './layout/AuthLayout';

const JobSeekerLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/seeker-verify-otp');
    };

    return (
        <AuthLayout>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-on-surface dark:text-white mb-3">
                    Welcome Back
                </h2>
                <p className="text-outline text-sm">
                    Let's get started with your 30 days free trail.
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <input
                        type="email"
                        placeholder="Username"
                        className="w-full rounded-full border border-outline-variant bg-surface-container-low dark:bg-primary/5 py-4 px-8 text-on-surface outline-none focus:ring-1 focus:ring-primary/20 dark:border-outline-variant/30 dark:text-white transition-all placeholder:text-outline/60"
                        required
                        autoComplete='off'
                    />
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full rounded-full border border-outline-variant bg-surface-container-low dark:bg-primary/5 py-4 px-8 text-on-surface outline-none focus:ring-1 focus:ring-primary/20 dark:border-outline-variant/30 dark:text-white transition-all placeholder:text-outline/60"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-outline hover:text-primary transition-colors"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
                    <div className="text-right">
                        <Link to="/job-seeker-reset-password" name="reset-password-link" className="text-xs font-semibold text-primary hover:text-primary-container transition-colors">
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-full bg-primary p-4 font-bold text-white transition-all hover:bg-primary-container shadow-lg shadow-primary/20"
                >
                    Login
                </button>

                <div className="relative flex items-center justify-center py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-outline-variant dark:border-outline-variant/30"></div>
                    </div>
                    <span className="relative dark:bg-inverse-surface px-4 text-xs font-semibold text-outline uppercase tracking-wider">
                        OR
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-outline-variant bg-surface-container-low/50 py-3 px-4 text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all dark:bg-primary/5 dark:text-white dark:border-outline-variant/30">
                        <FcGoogle size={20} /> Google
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-outline-variant bg-surface-container-low/50 py-3 px-4 text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all dark:bg-primary/5 dark:text-white dark:border-outline-variant/30">
                        <FaFacebook className="text-secondary" size={20} /> Facebook
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-outline">
                        Don't have an account?{' '}
                        <Link to="/job-seeker-signup" className="font-bold text-primary hover:text-primary-container transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    )
}

export default JobSeekerLogin
