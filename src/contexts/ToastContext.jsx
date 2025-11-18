/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(undefined);

const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    const id = toast.id ?? generateId();

    setToasts((previous) => {
      return [...previous, { ...toast, id }];
    });

    setTimeout(() => {
      removeToast(id);
    }, toast.duration ?? 4000);
  }, [removeToast]);

  const value = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex flex-col items-center gap-3 px-4">
        {toasts.map((toast) => {
          const tone = toast.type === 'success'
            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/40'
            : toast.type === 'error'
              ? 'bg-rose-500/10 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-400/40'
              : 'bg-gray-900 text-white border-gray-700';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg shadow-gray-900/10 backdrop-blur transition ${tone}`}
            >
              <div className="flex-1 text-sm">
                {toast.title ? (
                  <p className="font-semibold tracking-tight">{toast.title}</p>
                ) : null}
                {toast.description ? (
                  <p className="mt-1 text-sm leading-snug opacity-90">{toast.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-xs font-semibold uppercase tracking-wide opacity-70 transition hover:opacity-100"
              >
                Close
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }

  return context;
};
