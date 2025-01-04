// src/components/Admin/Layout/index.jsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { AdminLayoutContainer, MainContent } from './styles';

export const AdminLayout = () => {
  return (
    <AdminLayoutContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </AdminLayoutContainer>
  );
};