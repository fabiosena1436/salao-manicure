// src/components/Admin/Sidebar/index.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  AiOutlineDashboard, 
  AiOutlineShoppingCart, 
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome
} from 'react-icons/ai';
import { useAuth } from '../../../contexts/AuthContext';
import {
  SidebarContainer,
  SidebarHeader,
  Logo,
  CloseButton,
  NavLinks,
  NavItem,
  NavLink,
  UserInfo,
  LogoutButton,
  MobileToggle
} from './styles';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      path: '/',
      icon: <AiOutlineHome />,
      label: 'Home'
    },
    {
      path: '/admin',
      icon: <AiOutlineDashboard />,
      label: 'Dashboard'
    },
    {
      path: '/admin/products',
      icon: <AiOutlineShoppingCart />,
      label: 'Produtos'
    },
    {
      path: '/admin/appointments',
      icon: <AiOutlineCalendar />,
      label: 'Agendamentos'
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <>
      <MobileToggle onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </MobileToggle>

      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <Logo>
            <Link to="/admin">Painel Admin</Link>
          </Logo>
          <CloseButton onClick={() => setIsOpen(false)}>
            <AiOutlineClose />
          </CloseButton>
        </SidebarHeader>

        <NavLinks>
          {menuItems.map((item) => (
            <NavItem key={item.path}>
              <NavLink 
                to={item.path}
                $active={location.pathname === item.path}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </NavItem>
          ))}
        </NavLinks>

        <UserInfo>
          <div className="user-details">
            <AiOutlineUser />
            <span>{user?.email}</span>
          </div>
          <LogoutButton onClick={handleLogout}>
            <AiOutlineLogout />
            <span>Sair</span>
          </LogoutButton>
        </UserInfo>
      </SidebarContainer>
    </>
  );
};