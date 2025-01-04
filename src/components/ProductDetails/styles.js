// src/components/ProductDetails/styles.js
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: ${slideUp} 0.3s ease;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  z-index: 1;
  padding: 0.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const ProductImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px 0 0 8px;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      border-radius: 8px 8px 0 0;
      max-height: 400px;
    }
  }
`;

export const ProductInfo = styled.div`
  padding: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

export const ProductCategory = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ProductTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  margin: 0.5rem 0;
`;

export const ProductPrice = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const ProductDetails = styled.div`
  margin-bottom: 2rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
    font-size: 1rem;
  }
`;

export const ProductSize = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SizeOption = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#ddd'};
  border-radius: 4px;
  background: ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : 'white'};
  color: ${({ $selected }) => 
    $selected ? 'white' : 'inherit'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ColorOptions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ColorOption = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 2px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : '#ddd'};
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    transition: opacity 0.2s;
  }
`;

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    min-width: 40px;
    text-align: center;
  }
`;

export const AddToCartButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 1rem;

  &:hover {
    filter: brightness(0.9);
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    font-size: 1.2rem;
  }
`;