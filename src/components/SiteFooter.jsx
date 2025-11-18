import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SiteFooter = () => {
  const socials = [
    { label: 'Facebook', href: '#', icon: <FaFacebookF size={14} /> },
    { label: 'Instagram', href: '#', icon: <FaInstagram size={14} /> },
    { label: 'LinkedIn', href: '#', icon: <FaLinkedinIn size={14} /> },
  ];

  return (
    <footer className="grid gap-10 rounded-3xl border border-gray-200 bg-white px-8 py-10 text-sm shadow-sm transition dark:border-gray-800 dark:bg-gray-900 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
      <div className="space-y-4">
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Slooze Market</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Ease of sourcing is our north star. Powerful analytics and refined filters make it simple to curate the commodities you need.
          </p>
        </div>
        <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm transition hover:border-gray-300 hover:text-gray-600 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:text-gray-300"
              aria-label={item.label}
            >
              {item.icon}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-800 dark:bg-gray-950">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Subscribe
          </span>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none dark:text-gray-200"
          />
        </div>
      </div>
      <div className="space-y-2 text-gray-500 dark:text-gray-400">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Get Started</p>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Service</a>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Contact Us</a>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Affiliate Program</a>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">About Us</a>
      </div>
      <div className="space-y-2 text-gray-500 dark:text-gray-400">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Platform</p>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Dashboard</a>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Inventory</a>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Workflows</a>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">App Design</a>
      </div>
      <div className="space-y-2 text-gray-500 dark:text-gray-400">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Company</p>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Careers</a>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Security</a>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Help Center</a>
        <a href="#" className="block transition hover:text-gray-700 dark:hover:text-gray-200">Terms & Privacy</a>
      </div>
    </footer>
  );
};

export default SiteFooter;
