// src/routes.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react'; // Adicione isso
import { Layout } from './components/Layout';
import { AdminLayout } from './components/Admin/Layout';
import { ClientLayout } from './components/Client/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { Dashboard } from './pages/Admin/Dashboard';
import { Products } from './pages/Admin/Products';
import { Appointments } from './pages/Admin/Appointments';
import { NewAdminAppointment } from './pages/Admin/Appointments/NewAdminAppointment';
import { ClientDashboard } from './pages/Client/Dashboard';
import { ClientAppointments } from './pages/Client/Appointments';
import { NewAppointment } from './pages/Client/NewAppointment';
import { Profile } from './pages/Client/Profile';
import { Checkout } from './pages/Checkout';
import { Store } from './pages/Store';
import { useAuth } from './contexts/AuthContext';
import { Orders } from './pages/Client/Orders';
import { ServiceDetail } from './components/ServiceDetail';
import { ServicesPage } from './pages/Services';


// Componente de Loading
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    Carregando...
  </div>
);

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, userRole } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="store" element={<Store />} />
            <Route 
              path="login" 
              element={user ? <Navigate to="/" /> : <Login />} 
            />
            <Route 
              path="register" 
              element={user ? <Navigate to="/" /> : <Register />} 
            />
            <Route 
              path="forgot-password" 
              element={user ? <Navigate to="/" /> : <ForgotPassword />} 
            />
             <Route path="/servicos" element={<ServicesPage />} />
            <Route path="servicos/:serviceId" element={<ServiceDetail />} />
          </Route>

          {/* Rotas do Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/new" element={<NewAdminAppointment />} />
          </Route>

          {/* Rotas do Cliente */}
          <Route
            path="/client"
            element={
              <PrivateRoute>
                <ClientLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="appointments" element={<ClientAppointments />} />
            <Route path="new-appointment" element={<NewAppointment />} />
            <Route path="profile" element={<Profile />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Rota para páginas não encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};