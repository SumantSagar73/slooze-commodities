import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import useAuth from '../hooks/useAuth.js';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Slooze Commodities
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {user?.role === 'manager' ? 'Manager access' : 'Store Keeper access'}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
