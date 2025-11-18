import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import AddProduct from './pages/AddProduct.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute requiredRole="manager">
              <Dashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/products"
          element={(
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/products/new"
          element={(
            <ProtectedRoute requiredRole="manager">
              <AddProduct />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
