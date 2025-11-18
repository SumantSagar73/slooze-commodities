import { useAuth } from '../contexts/AuthContext.jsx';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Manager Dashboard
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Signed in as {user?.email}
        </p>
      </div>
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Dashboard content will go here in later phases.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
