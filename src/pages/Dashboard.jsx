import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import StatsCard from '../components/StatsCard.jsx';
import useAuth from '../hooks/useAuth.js';
import { products } from '../data/products.js';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const Dashboard = () => {
  const { user } = useAuth();

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const lowStockItems = products.filter((item) => item.stock < 50).length;
    const categories = new Set(products.map((item) => item.category)).size;
    const inventoryValue = products.reduce(
      (total, item) => total + item.stock * item.price,
      0,
    );

    return {
      totalProducts,
      lowStockItems,
      categories,
      inventoryValue,
      chartData: products.map((item) => ({ name: item.name, stock: item.stock })),
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Manager Dashboard
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Signed in as {user?.email}
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Products" value={stats.totalProducts} variant="primary" />
        <StatsCard
          title="Low Stock Items"
          value={stats.lowStockItems}
          variant="warning"
          helperText="Stock below 50 units"
        />
        <StatsCard title="Categories" value={stats.categories} variant="accent" />
        <StatsCard
          title="Inventory Value"
          value={currencyFormatter.format(stats.inventoryValue)}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Stock Levels by Product
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Monitor available inventory across key commodities.
            </p>
          </div>
        </div>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.2)' }}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '0.75rem',
                  border: 'none',
                  color: '#e2e8f0',
                }}
              />
              <Bar dataKey="stock" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
