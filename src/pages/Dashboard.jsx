import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FiPlus, FiSearch, FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import useAuth from '../hooks/useAuth.js';
import {
  earningsTimeline,
  monthlyOverview,
  paymentHistory,
  recentSales,
  subscriptionTrend,
  summaryMetrics,
  topProducts,
  weeklySales,
} from '../data/dashboard.js';

const Dashboard = () => {
  const { user } = useAuth();

  const cards = useMemo(() => summaryMetrics, []);

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-violet-500">
            Dashboard
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Welcome back, {user?.email ?? 'Manager'}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor revenue, track subscriptions, and keep every commodity running smoothly.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:w-64">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search reports"
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:from-violet-600 hover:to-indigo-600"
          >
            <FiPlus className="h-4 w-4" />
            Add New Product
          </button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((metric) => (
          <SummaryCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" title="Overview" caption="Revenue across the past year">
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyOverview}>
                <defs>
                  <linearGradient id="overviewBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="revenue" fill="url(#overviewBar)" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Sales" caption="Latest transactions from your network" actionLabel="View all">
          <div className="mt-6 space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{sale.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{sale.email}</p>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{sale.amount}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card
          title="Earnings Timeline"
          caption="Compare this year to last year"
          pills={['Years', 'Aug 20th - Dec 4th', 'Compared to previous', '2024']}
        >
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsTimeline}>
                <defs>
                  <linearGradient id="earningsCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="previous" stroke="#cbd5f5" strokeWidth={2} fill="none" />
                <Area type="monotone" dataKey="current" stroke="#34d399" strokeWidth={3} fill="url(#earningsCurrent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Weekly Sales" caption="Actual vs goal">
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySales}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="goal" fill="#c4b5fd" radius={[10, 10, 0, 0]} />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Subscriptions" caption="Followers this year">
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={subscriptionTrend}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="subscribers" stroke="#f97316" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card title="Subscriptions Performer" caption="Follower growth this year">
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-4xl font-semibold text-gray-900 dark:text-gray-100">+500</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">New followers this month</p>
            </div>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subscriptionTrend}>
                  <Bar dataKey="subscribers" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Get Started
            </button>
          </div>
        </Card>

        <Card title="Top Sales Products" caption="Manage your recent payments">
          <div className="mt-6 space-y-4">
            {topProducts.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white/40 px-4 py-3 dark:border-gray-800 dark:bg-white/5">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.buyer}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.amount}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Payment History" caption="Manage your payments">
          <div className="mt-6 space-y-3">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white/40 px-4 py-3 dark:border-gray-800 dark:bg-white/5">
                <div className="space-y-1">
                  <StatusBadge status={payment.status} />
                  <p className="text-xs text-gray-500 dark:text-gray-400">{payment.email}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{payment.amount}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

const SummaryCard = ({ metric }) => {
  const TrendIcon = metric.trend === 'down' ? FiTrendingDown : FiTrendingUp;
  const trendColor = metric.trend === 'down' ? 'text-rose-500' : 'text-emerald-500';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</p>
          <p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">{metric.value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300`}>
          <TrendIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-sm font-semibold ${trendColor}`}>{metric.change}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{metric.caption}</span>
      </div>
    </div>
  );
};

const Card = ({ title, caption, children, className = '', actionLabel, pills }) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{caption}</p>
        </div>
        {actionLabel ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
      {pills ? (
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700"
            >
              {pill}
            </span>
          ))}
        </div>
      ) : null}
      {children}
    </div>
  );
};

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white/95 px-3 py-2 text-xs text-gray-600 shadow-lg backdrop-blur dark:border-gray-800 dark:bg-gray-900/95 dark:text-gray-300">
      <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="mt-1 flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{`${item.dataKey}: ${item.value}`}</span>
        </p>
      ))}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const palette = {
    Success: 'bg-emerald-500/10 text-emerald-600',
    Pending: 'bg-amber-500/10 text-amber-600',
    Failed: 'bg-rose-500/10 text-rose-500',
  };

  const tone = palette[status] ?? 'bg-gray-500/10 text-gray-500';

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {status}
    </span>
  );
};

export default Dashboard;
