import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import AuthLayout from './layout/AuthLayout'

const JobSeekerSignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/job-seeker-login');
    };

    return (
        <AuthLayout>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-on-surface dark:text-white mb-3">
                    Create Account
                </h2>
                <p className="text-outline text-sm">
                    Join us and start your journey today.
                </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full rounded-full border border-outline-variant bg-surface-container-low dark:bg-primary/5 py-4 px-8 text-on-surface outline-none focus:ring-1 focus:ring-primary/20 dark:border-outline-variant/30 dark:text-white transition-all placeholder:text-outline/60"
                        required
                    />
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full rounded-full border border-outline-variant bg-surface-container-low dark:bg-primary/5 py-4 px-8 text-on-surface outline-none focus:ring-1 focus:ring-primary/20 dark:border-outline-variant/30 dark:text-white transition-all placeholder:text-outline/60"
                        required
                    />
                </div>

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

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-full bg-primary p-4 font-bold text-on-primary transition-all hover:bg-primary-container shadow-lg shadow-primary/20"
                    >
                        Sign Up
                    </button>
                </div>

                <div className="relative flex items-center justify-center py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-outline-variant dark:border-outline-variant/30"></div>
                    </div>
                    <span className="relative bg-white dark:bg-inverse-surface px-4 text-xs font-semibold text-outline uppercase tracking-wider">
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
                        Already have an account?{' '}
                        <Link to="/job-seeker-login" className="font-bold text-primary hover:text-primary-container transition-colors">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    )
}

export default JobSeekerSignUp