import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import useAuth from '../hooks/useAuth.js';
import useTheme from '../hooks/useTheme.js';

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  useEffect(() => {
    if (!user) return;

    const destination = user.role === 'manager' ? '/dashboard' : '/products';
    navigate(destination, { replace: true });
  }, [user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!acceptedTerms) {
      setError('Please accept the terms to continue.');
      return;
    }

    try {
      const authenticatedUser = login(email, password);
      const destination = authenticatedUser.role === 'manager' ? '/dashboard' : '/products';
      navigate(destination, { replace: true });
    } catch (authError) {
      setError('Invalid email or password.');
    }
  };

  const heroImages = {
    light:
      'https://images.unsplash.com/photo-1664444713381-352269b40170?auto=format&fit=crop&w=1200&q=80',
    dark:
      'https://images.unsplash.com/photo-1671786621063-3818dcac7c73?auto=format&fit=crop&w=1200&q=80',
  };

  const heroImage = heroImages[theme] ?? heroImages.light;

  return (
    <div className="flex min-h-screen bg-gray-100 transition-colors duration-300 dark:bg-black">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2 lg:px-16 2xl:px-24">
          <div className="w-full max-w-xl">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-violet-500">
                Slooze Commodities
              </p>
              <h1 className="mt-6 text-4xl font-semibold text-gray-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Sign up for free—or continue with your existing credentials.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@slooze.com"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 pr-12 text-gray-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 transition hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <HiOutlineEyeOff className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-violet-500 focus:ring-violet-400"
                />
                <span>
                  I agree to the <span className="font-medium text-gray-800 dark:text-gray-200">Terms</span>,{' '}
                  <span className="font-medium text-gray-800 dark:text-gray-200">Privacy Policy</span> and platform fees.
                </span>
              </label>

              {error ? (
                <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={!acceptedTerms}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-600 hover:to-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Get Started
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
                or
              </span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-800"
              >
                <FcGoogle className="h-5 w-5" />
                Sign in with Google
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-800"
              >
                <FaFacebook className="h-5 w-5 text-blue-500" />
                Sign in with Facebook
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <span className="font-semibold text-violet-500">Login</span>
            </p>
          </div>
        </div>

        <div className="relative hidden w-full overflow-hidden lg:block lg:w-1/2">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(120deg, rgba(99,102,241,0.55), rgba(236,72,153,0.35)), url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute bottom-10 left-10 max-w-md text-white">
            <h2 className="text-3xl font-semibold">Manage Commodities Smarter</h2>
            <p className="mt-4 text-sm text-gray-100/90">
              Track inventory performance, monitor stock levels, and collaborate with your team in a modern interface built for operations excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
