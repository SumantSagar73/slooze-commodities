import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 transition-colors duration-200 dark:bg-gray-950">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
