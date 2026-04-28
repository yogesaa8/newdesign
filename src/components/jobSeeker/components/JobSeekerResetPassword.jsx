import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout'

const JobSeekerResetPassword = () => {
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();
        navigate('/seeker-verify-otp');
    };

    return (
        <AuthLayout>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-on-surface dark:text-white mb-3">
                    Reset Password
                </h2>
                <p className="text-outline text-sm px-4">
                    Enter your email address and we'll send you an OTP to reset your password.
                </p>
            </div>

            <form onSubmit={handleReset} className="space-y-6">
                <div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full rounded-full border border-outline-variant bg-surface-container-low dark:bg-primary/5 py-4 px-8 text-on-surface outline-none focus:ring-1 focus:ring-primary/20 dark:border-outline-variant/30 dark:text-white transition-all placeholder:text-outline/60"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-full bg-primary p-4 font-bold text-on-primary transition-all hover:bg-primary-container shadow-lg shadow-primary/20"
                >
                    Send OTP
                </button>

                <div className="mt-8 text-center">
                    <p className="text-sm text-outline">
                        Remember your password?{' '}
                        <Link to="/login" className="font-bold text-primary hover:text-primary-container transition-colors">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    )
}

export default JobSeekerResetPassword