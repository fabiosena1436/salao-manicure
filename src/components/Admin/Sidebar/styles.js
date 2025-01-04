// src/components/Admin/Sidebar/styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background: white;
  box-shadow: 2px 0 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  z-index: 1000;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  }
`;

export const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

export const Logo = styled.div`
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: none;
  font-size: 1.2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NavLinks = styled.nav`
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
`;

export const NavItem = styled.div`
  margin-bottom: 0.5rem;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  transition: all 0.2s;
  background: ${({ $active, theme }) => 
    $active ? theme.colors.primary + '10' : 'transparent'};

  svg {
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary + '10'};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UserInfo = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #eee;

  .user-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};

    svg {
      font-size: 1.2rem;
    }

    span {
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.error};
    color: white;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const MobileToggle = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;