import { useMemo, useState } from 'react';
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineCloudArrowUp,
  HiOutlineMagnifyingGlass,
  HiOutlinePlusSmall,
} from 'react-icons/hi2';
import SiteFooter from '../components/SiteFooter.jsx';
import useToast from '../hooks/useToast.js';

const productCategories = [
  'Grains',
  'Beverages',
  'Essentials',
  'Dry Fruits',
  'Spices',
  'Sweeteners',
];

const discountCategories = ['Seasonal', 'Loyalty', 'Introductory', 'Bulk'];

const initialForm = {
  name: '',
  category: '',
  description: '',
  tags: '',
  price: '',
  discount: '',
  discountCategory: '',
};

const AddProduct = () => {
  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();

  const isValid = useMemo(() => {
    return Boolean(form.name && form.category && form.price);
  }, [form]);

  const handleChange = (field) => (event) => {
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const handleDiscard = () => {
    setForm(initialForm);
    addToast({
      type: 'error',
      title: 'Changes discarded',
      description: 'The product draft has been cleared.',
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!isValid) {
      addToast({
        type: 'error',
        title: 'Missing details',
        description: 'Please fill the required fields: product name, category, and price.',
      });
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        type: 'success',
        title: 'Product drafted',
        description: `${form.name} is saved as a draft. You can publish it later from the dashboard.`,
      });
    }, 600);
  };

  return (
    <form className="space-y-8" onSubmit={handleSave}>
      <header className="rounded-3xl border border-gray-200 bg-white px-6 py-6 shadow-sm transition dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Add Product
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Add New Product
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Create a refined listing with complete metadata, thumbnails, and pricing tiers.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-violet-600 hover:to-fuchsia-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <HiOutlinePlusSmall className="text-lg" />
            Add New Product
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition focus-within:border-gray-300 focus-within:bg-white dark:border-gray-800 dark:bg-gray-900">
            <HiOutlineMagnifyingGlass className="text-lg text-gray-400" />
            <input
              type="search"
              placeholder="Search existing catalog"
              className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none dark:text-gray-100"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDiscard}
              className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-500 transition hover:border-rose-300 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 dark:border-rose-400/40 dark:text-rose-300"
            >
              Discard Change
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full border border-violet-500 bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:border-violet-600 hover:bg-violet-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <HiOutlineArrowPathRoundedSquare className="animate-spin text-base" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-gray-200 bg-white px-6 py-6 shadow-sm transition dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">General Information</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Provide the foundational details that help your teams identify and market this commodity.
        </p>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="product-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name
              </label>
              <input
                id="product-name"
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Enter product name"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="product-category"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Product Category
              </label>
              <select
                id="product-category"
                value={form.category}
                onChange={handleChange('category')}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
              >
                <option value="">Select a category</option>
                {productCategories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={form.description}
                onChange={handleChange('description')}
                placeholder="Summarise your product benefits, sourcing details, and highlights"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tag Keywords
              </label>
              <input
                id="tags"
                type="text"
                value={form.tags}
                onChange={handleChange('tags')}
                placeholder="organic, gluten-free, premium"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
              />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-6 text-center transition dark:border-gray-700 dark:bg-gray-950">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Preview Product</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Drag and drop your image here</p>
              <div className="mt-4 flex h-36 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                <HiOutlineCloudArrowUp className="text-3xl text-gray-400 dark:text-gray-500" />
              </div>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 dark:border-gray-700 dark:text-gray-300"
              >
                Upload Preview
              </button>
            </div>
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-6 text-center transition dark:border-gray-700 dark:bg-gray-950">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Thumbnail Product</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Drag and drop your image here</p>
              <div className="mt-4 flex h-36 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                <HiOutlineCloudArrowUp className="text-3xl text-gray-400 dark:text-gray-500" />
              </div>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 dark:border-gray-700 dark:text-gray-300"
              >
                Upload Thumbnail
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white px-6 py-6 shadow-sm transition dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Pricing</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Set your base pricing along with any promotional incentives.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              id="price"
              type="number"
              value={form.price}
              onChange={handleChange('price')}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="discount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Discount
            </label>
            <input
              id="discount"
              type="number"
              value={form.discount}
              onChange={handleChange('discount')}
              placeholder="0%"
              min="0"
              max="90"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
            />
          </div>

          <div className="space-y-2 md:col-span-2 md:grid md:grid-cols-2 md:gap-6">
            <div className="space-y-2">
              <label
                htmlFor="discount-category"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Discount Category
              </label>
              <select
                id="discount-category"
                value={form.discountCategory}
                onChange={handleChange('discountCategory')}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring focus:ring-violet-200/60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-violet-400 dark:focus:ring-violet-400/20"
              >
                <option value="">Select type</option>
                {discountCategories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
              Need volume-based pricing? Upgrade to the enterprise plan to unlock tiered pricing and automated margin alerts.
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </form>
  );
};

export default AddProduct;
