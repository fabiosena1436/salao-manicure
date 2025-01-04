// src/components/Header/index.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Button } from '../Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Cart } from '../Cart';
import {
  HeaderContainer,
  Logo,
  Nav,
  NavLinks,
  MobileIcon,
  ButtonContainer,
  NavLink,
  MobileContainer,
  CartContainer
} from './styles';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useNotification();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess('Logout realizado com sucesso!');
      navigate('/login');
      closeMenu();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      showError('Erro ao fazer logout. Tente novamente.');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/" onClick={closeMenu}>Salão & Lingerie</Link>
      </Logo>

      <Nav $isOpen={isOpen}>
        <NavLinks>
          <li>
            <NavLink onClick={() => handleNavigation('/')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => handleNavigation('/servicos')}>
              Serviços
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => handleNavigation('/store')}>
              Loja
            </NavLink>
          </li>
          <li>
            <NavLink 
              onClick={() => handleNavigation(user ? "/client/new-appointment" : "/login")}
            >
              Agendar
            </NavLink>
          </li>
        </NavLinks>
      </Nav>

      <CartContainer>
        <Cart />
        <ButtonContainer>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Button 
                  $variant="secondary" 
                  onClick={() => handleNavigation('/admin')}
                >
                  Painel Admin
                </Button>
              )}
              <Button 
                $variant="secondary" 
                onClick={() => handleNavigation('/client')}
              >
                Minha Área
              </Button>
              <Button $variant="secondary" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <Button 
              $variant="secondary" 
              onClick={() => handleNavigation('/login')}
            >
              Login
            </Button>
          )}
        </ButtonContainer>
      </CartContainer>

      <MobileContainer>
        <Cart />
        <MobileIcon onClick={toggleMenu}>
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </MobileIcon>
      </MobileContainer>
    </HeaderContainer>
  );
};