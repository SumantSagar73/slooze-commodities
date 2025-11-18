import { Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import useAuth from '../hooks/useAuth.js';

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/products" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
