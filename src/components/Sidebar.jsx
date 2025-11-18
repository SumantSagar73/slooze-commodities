import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const menuItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    roles: ['manager'],
  },
  {
    label: 'Products',
    to: '/products',
    roles: ['manager', 'storekeeper'],
  },
];

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white px-4 py-6 transition-colors duration-200 dark:border-gray-800 dark:bg-gray-900">
      <nav className="space-y-2">
        {menuItems
          .filter((item) => item.roles.includes(user.role))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
