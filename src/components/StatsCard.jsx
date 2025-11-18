const variantStyles = {
  primary: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  accent: 'text-indigo-600 dark:text-indigo-400',
  default: 'text-slate-900 dark:text-slate-100',
};

const StatsCard = ({ title, value, variant = 'default', helperText }) => {
  const textClass = variantStyles[variant] ?? variantStyles.default;

  return (
    <div className="rounded-xl border border-transparent bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className={`mt-2 text-2xl font-semibold ${textClass}`}>{value}</p>
      {helperText ? (
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default StatsCard;
