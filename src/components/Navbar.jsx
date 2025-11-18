import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import useAuth from '../hooks/useAuth.js';
import useToast from '../hooks/useToast.js';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { addToast } = useToast();

  const handleLogout = () => {
    logout();
    addToast({
      type: 'success',
      title: 'Signed out',
      description: 'You have been logged out successfully.',
    });
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 transition-colors duration-200 dark:border-gray-800 dark:bg-gray-900">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Slooze Commodities
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {user?.role === 'manager' ? 'Manager access' : 'Store Keeper access'}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
