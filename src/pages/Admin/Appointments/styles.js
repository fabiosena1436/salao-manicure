// src/pages/Admin/Appointments/styles.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
`;

export const HeaderTitle = styled.div`
  h1 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: 1.5rem;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
    font-size: 0.9rem;
  }
`;

export const HeaderActions = styled.div`
  button {
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
    }
  }
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 2rem;
  }
`;

export const SearchBar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  svg {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
    margin-right: 0.5rem;
    font-size: 1.2rem;
    min-width: 20px;
  }

  input {
    width: 100%;
    border: none;
    font-size: 1rem;
    outline: none;
    background: transparent;
  }
`;

export const DateFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
    min-width: 200px;
  }

  svg {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
    font-size: 1.2rem;
  }

  input {
    border: none;
    font-size: 1rem;
    outline: none;
    width: 100%;
    background: transparent;
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
  padding-bottom: 1px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  padding: 0.75rem;
  font-size: 0.9rem;
  color: ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.text};
  border-bottom: 2px solid ${({ $active, theme }) => 
    $active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AppointmentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

export const AppointmentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    gap: 2rem;
    align-items: start;
  }
`;

export const ClientInfo = styled.div`
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};

    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
  }
`;

export const ServiceInfo = styled.div`
  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const AppointmentDetails = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

export const Price = styled.p`
  margin-top: 0.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: ${({ color }) => color};
  color: white;
  font-size: 0.875rem;
  text-align: center;
  align-self: flex-start;

  @media (min-width: 768px) {
    align-self: auto;
  }
`;

export const AppointmentActions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, auto);
    justify-content: flex-end;
    gap: 1rem;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 500;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'success':
        return `
          background: ${theme.colors.success};
          color: white;
          &:hover {
            opacity: 0.9;
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: white;
          &:hover {
            opacity: 0.9;
          }
        `;
      case 'text':
        return `
          background: none;
          color: ${theme.colors.primary};
          padding: 0;
          width: auto;
          &:hover {
            text-decoration: underline;
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: white;
          &:hover {
            opacity: 0.9;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (min-width: 768px) {
    padding: 3rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;