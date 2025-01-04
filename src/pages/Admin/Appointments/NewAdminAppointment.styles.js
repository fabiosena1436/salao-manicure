// src/pages/Admin/Appointments/NewAdminAppointment.styles.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FormContainer = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
`;

export const TimeSlot = styled.button`
  padding: 0.75rem;
  border: 1px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#ddd'};
  border-radius: 4px;
  background: ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : 'white'};
  color: ${({ $selected }) => $selected ? 'white' : 'inherit'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const BookedSlot = styled(TimeSlot)`
  background: #f5f5f5;
  border-color: #ddd;
  cursor: not-allowed;
  opacity: 0.7;

  &:hover {
    transform: none;
    border-color: #ddd;
  }
`;

export const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 4px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary}50;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary}80;
  }
`;

export const ClientCard = styled.div`
  padding: 1rem;
  background: white;
  border: 2px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#eee'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${({ $selected }) => 
    $selected ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  h4 {
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    svg {
      font-size: 1.1rem;
      color: ${({ theme }) => theme.colors.primary};
      opacity: 0.8;
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  svg {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};

    &::placeholder {
      color: ${({ theme }) => theme.colors.text}80;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;

  &::after {
    content: '';
    width: 20px;
    height: 20px;
    margin-left: 1rem;
    border: 2px solid ${({ theme }) => theme.colors.primary}40;
    border-top: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  background: white;
  border-radius: 8px;
  border: 2px dashed #eee;
  grid-column: 1 / -1;
`;