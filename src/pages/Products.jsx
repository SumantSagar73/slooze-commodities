import { useMemo, useState } from 'react';
import StatsCard from '../components/StatsCard.jsx';
import useAuth from '../hooks/useAuth.js';
import { products } from '../data/products.js';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const Products = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const categories = useMemo(() => {
    return ['all', ...new Set(products.map((item) => item.category))];
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products.filter((item) => {
      const matchesQuery = !query || item.name.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || item.category === category;
      const matchesStock = !showLowStockOnly || item.stock < 50;
      return matchesQuery && matchesCategory && matchesStock;
    });
  }, [category, searchTerm, showLowStockOnly]);

  const metrics = useMemo(() => {
    const lowStockCount = filteredProducts.filter((item) => item.stock < 50).length;
    const categoriesVisible = new Set(filteredProducts.map((item) => item.category)).size;
    const inventoryValue = filteredProducts.reduce(
      (total, item) => total + item.stock * item.price,
      0,
    );

    return {
      total: filteredProducts.length,
      lowStockCount,
      categoriesVisible,
      inventoryValue,
    };
  }, [filteredProducts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Product Inventory
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Signed in as {user?.email} ({user?.role})
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:max-w-lg sm:flex-row">
          <div className="flex-1">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            />
          </div>
          <div className="sm:w-48">
            <label htmlFor="category-filter" className="sr-only">
              Filter by category
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All categories' : option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setShowLowStockOnly((prev) => !prev)}
            className={`whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring ${
              showLowStockOnly
                ? 'border-rose-500 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 dark:border-rose-400 dark:text-rose-300 dark:hover:bg-rose-500/10'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800'
            }`}
          >
            {showLowStockOnly ? 'Showing low stock' : 'Low stock only'}
          </button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Visible Products"
          value={metrics.total}
          variant="primary"
          helperText="After applied filters"
        />
        <StatsCard
          title="Low Stock Visible"
          value={metrics.lowStockCount}
          variant="warning"
          helperText="Stock under 50 units"
        />
        <StatsCard
          title="Categories"
          value={metrics.categoriesVisible}
          variant="accent"
        />
        <StatsCard
          title="Inventory Value"
          value={currencyFormatter.format(metrics.inventoryValue)}
        />
      </section>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-800/60">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Category
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Stock
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    No products match your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      {item.category}
                    </td>
                    <td
                      className={`px-4 py-3 text-sm font-semibold ${
                        item.stock < 50
                          ? 'text-rose-500 dark:text-rose-400'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {item.stock}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                      {currencyFormatter.format(item.price)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
