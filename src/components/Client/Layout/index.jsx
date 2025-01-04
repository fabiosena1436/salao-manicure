// src/components/Client/Layout/index.jsx
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import {
  LayoutContainer,
  MainContent,
  ClientNav,
  MobileMenuButton,
  NavLinks,
  MobileOverlay
} from './styles';

export const ClientLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { path: '/client', label: 'Meu Painel', end: true },
    { path: '/client/appointments', label: 'Meus Agendamentos' },
    { path: '/client/orders', label: 'Meus Pedidos' },
    { path: '/client/profile', label: 'Meu Perfil' },
    { path: '/', label: 'Home' }
  ];

  return (
    <LayoutContainer>
      <ClientNav>
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </MobileMenuButton>

        <NavLinks $isOpen={isMenuOpen}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
              end={item.end}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <MobileOverlay $isOpen={isMenuOpen} onClick={closeMenu} />
      </ClientNav>
      
      <MainContent onClick={isMenuOpen ? closeMenu : undefined}>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};