// src/pages/Client/NewAppointment/styles.js
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  animation: ${fadeIn} 0.3s ease;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0,0,0,0.1);
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 1s ease-in-out infinite;
  margin: 20px auto;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 2rem;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.5;
    transition: all 0.3s;

    &.active {
      opacity: 1;
      color: ${({ theme }) => theme.colors.primary};
      transform: scale(1.05);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
    
    span {
      font-size: 0.8rem;
    }
  }
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s;

  svg {
    font-size: 1.2rem;
    transition: all 0.3s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);

    svg {
      transform: scale(1.1);
    }
  }
`;

export const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease;

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const StepContainer = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.5rem;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
`;

export const ServiceCard = styled.div`
  padding: 1.5rem;
  border: 2px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#eee'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }

  ${({ $selected }) => $selected && css`
    background: ${({ theme }) => theme.colors.primary}11;
    
    &::after {
      content: '✓';
      position: absolute;
      top: 10px;
      right: 10px;
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.2rem;
    }
  `}

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .price {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DateTimeContainer = styled.div`
  .date-select {
    margin-bottom: 2rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.text};
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
      }
    }
  }

  .time-select {
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.text};
      font-weight: 500;
    }
  }
`;

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
  animation: ${fadeIn} 0.3s ease;
`;

export const TimeSlot = styled.button`
  padding: 0.75rem 0.5rem;
  border: 1px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#ddd'};
  border-radius: 4px;
  background: ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : 'white'};
  color: ${({ $selected }) => $selected ? 'white' : 'inherit'};
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f5f5f5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const ConfirmationCard = styled.div`
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  animation: ${fadeIn} 0.3s ease;
  background: ${({ theme }) => theme.colors.primary}11;

  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    strong {
      color: ${({ theme }) => theme.colors.text};
      font-weight: 500;
    }

    span {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 500;
    }
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${({ $variant, theme }) =>
    $variant === 'secondary'
      ? css`
        background: white;
        border: 1px solid ${theme.colors.primary};
        color: ${theme.colors.primary};

        &:hover:not(:disabled) {
          background: ${theme.colors.primary}11;
        }
      `
      : css`
        background: ${theme.colors.primary};
        color: white;

        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.primary}ee;
        }
      `}

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }

  .spin {
    animation: ${spin} 1s linear infinite;
  }
`;