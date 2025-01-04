
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: auto; 
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

export const CartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 1000;
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const NavLink = styled.span`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MobileIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

export const MobileContainer = styled.div`
  display: none;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;