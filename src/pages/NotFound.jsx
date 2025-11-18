import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle.jsx';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 py-10 text-center transition-colors duration-300 dark:bg-gray-950">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <span className="rounded-full border border-gray-300 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500 dark:border-gray-700 dark:text-gray-400">
        404
      </span>
      <h1 className="mt-6 text-4xl font-semibold text-gray-900 dark:text-gray-100">Page Not Found</h1>
      <p className="mt-3 max-w-md text-sm text-gray-600 dark:text-gray-400">
        The page you are trying to reach doesn&apos;t exist or may have been moved. Let&apos;s get you back to a safe place.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Return to Login
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600"
        >
          View Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
