import { useToastContext } from '../contexts/ToastContext.jsx';

const useToast = () => {
  const context = useToastContext();
  return context;
};

export default useToast;
