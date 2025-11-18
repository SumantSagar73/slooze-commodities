import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineArrowDownTray,
  HiOutlineFunnel,
  HiOutlineMagnifyingGlass,
  HiOutlinePlusSmall,
  HiOutlineEllipsisHorizontal,
} from 'react-icons/hi2';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import useAuth from '../hooks/useAuth.js';
import { products } from '../data/products.js';
import SiteFooter from '../components/SiteFooter.jsx';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

const MiniTrendCard = ({ title, value, delta, isPositive, data, stroke, gradientId, loading }) => {
  if (loading) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white px-5 py-5 shadow-sm transition dark:border-gray-800 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="h-3 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-4 h-6 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-6 h-24 rounded-2xl bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white px-5 py-5 shadow-sm transition dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
        <span
          className={`text-xs font-medium ${
            isPositive ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
          }`}
        >
          {delta}
        </span>
      </div>
      <div className="mt-6 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={0.38} />
                <stop offset="100%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke={stroke} strokeWidth={2} fill={`url(#${gradientId})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Products = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('published');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingTimeoutRef = useRef(null);

  const isManager = user?.role === 'manager';
  const navigate = useNavigate();

  const triggerLoading = (duration = 400) => {
    setIsLoading(true);
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      loadingTimeoutRef.current = null;
    }, duration);
  };

  const categories = ['all', ...new Set(products.filter((item) => item.status === activeTab).map((item) => item.category))];

  const query = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter((item) => {
    if (activeTab !== 'all' && item.status !== activeTab) {
      return false;
    }

    const matchesQuery = !query || item.name.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || item.category === category;
    return matchesQuery && matchesCategory;
  });

  const publishedCount = products.filter((item) => item.status === 'published').length;
  const draftCount = products.filter((item) => item.status === 'draft').length;

  useEffect(() => {
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      loadingTimeoutRef.current = null;
    }, 600);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  const allSelected =
    isManager && !isLoading && filteredProducts.length > 0 && selectedIds.length === filteredProducts.length;

  const toggleSelectAll = () => {
    if (!isManager || isLoading) {
      return;
    }

    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((item) => item.id));
    }
  };

  const toggleRow = (id) => {
    if (!isManager || isLoading) {
      return;
    }

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((current) => current !== id) : [...prev, id],
    );
  };

  const insightCards = [
    {
      id: 'total-views',
      title: 'Total Views',
      value: '112,893',
      delta: '+12,893',
      isPositive: true,
      stroke: '#8b5cf6',
      gradientId: 'viewsGradient',
      data: [
        { label: 'Jun', value: 54000 },
        { label: 'Jul', value: 58200 },
        { label: 'Aug', value: 60300 },
        { label: 'Sep', value: 62800 },
        { label: 'Oct', value: 69400 },
        { label: 'Nov', value: 72893 },
      ],
    },
    {
      id: 'total-sales',
      title: 'Total Sales',
      value: '$98,430',
      delta: '+8.2%',
      isPositive: true,
      stroke: '#22c55e',
      gradientId: 'salesGradient',
      data: [
        { label: 'Jun', value: 38000 },
        { label: 'Jul', value: 40200 },
        { label: 'Aug', value: 41900 },
        { label: 'Sep', value: 45100 },
        { label: 'Oct', value: 48600 },
        { label: 'Nov', value: 51430 },
      ],
    },
    {
      id: 'total-earnings',
      title: 'Total Earnings',
      value: '$146,320',
      delta: '-1.4%',
      isPositive: false,
      stroke: '#f97316',
      gradientId: 'earningGradient',
      data: [
        { label: 'Jun', value: 51200 },
        { label: 'Jul', value: 49800 },
        { label: 'Aug', value: 50600 },
        { label: 'Sep', value: 50200 },
        { label: 'Oct', value: 49700 },
        { label: 'Nov', value: 49180 },
      ],
    },
  ];

  const skeletonRows = Array.from({ length: 6 });

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-gray-200 bg-white px-6 py-6 shadow-sm transition dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Product
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Catalog Overview
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Signed in as {user?.email} • {user?.role}
            </p>
          </div>
          {isManager ? (
            <button
              type="button"
              onClick={() => navigate('/products/new')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-violet-600 hover:to-fuchsia-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <HiOutlinePlusSmall className="text-lg" />
              Add New Product
            </button>
          ) : (
            <div className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-800 dark:text-gray-500">
              View-only access
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition focus-within:border-gray-300 focus-within:bg-white dark:border-gray-800 dark:bg-gray-900">
            <HiOutlineMagnifyingGlass className="text-lg text-gray-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => {
                triggerLoading();
                setSearchTerm(event.target.value);
              }}
              placeholder="Search product names"
              className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none dark:text-gray-100"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={category}
              onChange={(event) => {
                triggerLoading();
                setCategory(event.target.value);
              }}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All categories' : option}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
            >
              <HiOutlineFunnel className="text-base" />
              Filter
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <HiOutlineArrowDownTray className="text-base" />
              Download
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-3xl border border-gray-200 bg-white shadow-sm transition dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 dark:border-gray-800 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 p-1 dark:bg-gray-800">
              {[
                { id: 'published', label: 'Published', count: publishedCount },
                { id: 'draft', label: 'Draft', count: draftCount },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      triggerLoading();
                      setActiveTab(tab.id);
                      setCategory('all');
                      setSelectedIds([]);
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-gray-100'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isActive
                          ? 'bg-violet-500 text-white'
                          : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>Last updated 12 minutes ago</span>
              <span className="hidden h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700 lg:block" />
              <span className="hidden lg:inline">Auto-refresh in 18 minutes</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50/80 text-gray-500 backdrop-blur dark:bg-gray-800/60 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        disabled={!isManager || isLoading}
                        className="h-4 w-4 rounded border-gray-300 text-violet-500 transition focus:ring-violet-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:disabled:border-gray-700 dark:disabled:bg-gray-800"
                      />
                      Product Name
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">
                    Views
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">
                    Pricing
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">
                    Margin
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-gray-900">
                {isLoading ? (
                  skeletonRows.map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-4 w-4 rounded border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800" />
                          <div className="h-12 w-12 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                          <div className="space-y-2">
                            <div className="h-4 w-44 rounded-full bg-gray-100 dark:bg-gray-800" />
                            <div className="h-3 w-32 rounded-full bg-gray-100 dark:bg-gray-800" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="ml-auto h-4 w-16 rounded-full bg-gray-100 dark:bg-gray-800" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="ml-auto h-4 w-20 rounded-full bg-gray-100 dark:bg-gray-800" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="ml-auto h-4 w-24 rounded-full bg-gray-100 dark:bg-gray-800" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="ml-auto h-4 w-12 rounded-full bg-gray-100 dark:bg-gray-800" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="ml-auto h-6 w-20 rounded-full bg-gray-100 dark:bg-gray-800" />
                      </td>
                    </tr>
                  ))
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No products match your current filters.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((item) => {
                    const isSelected = isManager && selectedIds.includes(item.id);
                    const marginTone =
                      item.margin >= 35
                        ? 'text-emerald-500 dark:text-emerald-400'
                        : item.margin >= 28
                        ? 'text-amber-500 dark:text-amber-400'
                        : 'text-rose-500 dark:text-rose-400';

                    return (
                      <tr
                        key={item.id}
                        className={`transition hover:bg-gray-50 dark:hover:bg-gray-800/60 ${
                          isSelected ? 'bg-violet-50/60 dark:bg-violet-500/10' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleRow(item.id)}
                              disabled={!isManager || isLoading}
                              className="h-4 w-4 rounded border-gray-300 text-violet-500 transition focus:ring-violet-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:disabled:border-gray-700 dark:disabled:bg-gray-800"
                            />
                            <div className="h-12 w-12 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800">
                              <img
                                src={item.thumbnail}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {item.category} • {item.stock} units
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {numberFormatter.format(item.views)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {currencyFormatter.format(item.price)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {currencyFormatter.format(item.revenue)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-semibold">
                          <span className={marginTone}>{item.margin}%</span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-500 dark:text-gray-400">
                          {isManager ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600"
                              >
                                Manage
                              </button>
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                              >
                                <HiOutlineEllipsisHorizontal className="text-lg" />
                              </button>
                            </div>
                          ) : (
                            <span className="inline-flex items-center justify-end gap-2 rounded-full border border-dashed border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-400 dark:border-gray-700 dark:text-gray-500">
                              Restricted
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {isLoading
                ? 'Updating inventory...'
                : `Showing ${filteredProducts.length} of ${activeTab === 'draft' ? draftCount : publishedCount} ${activeTab === 'draft' ? 'draft' : 'published'} products`}
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                    page === 1
                      ? 'border-violet-500 bg-violet-500 text-white'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:border-gray-700 dark:text-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="flex h-8 items-center justify-center rounded-full border border-gray-200 px-3 text-xs font-semibold text-gray-500 transition hover:border-gray-300 hover:text-gray-700 dark:border-gray-700 dark:text-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Relate Data</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Track performance across your catalog in real time.
            </p>
          </div>
          {insightCards.map((card) => (
            <MiniTrendCard key={card.id} loading={isLoading} {...card} />
          ))}
        </aside>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Products;
