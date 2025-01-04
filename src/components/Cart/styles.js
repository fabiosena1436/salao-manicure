// src/components/Cart/styles.js
import styled from 'styled-components';

export const CartContainer = styled.div`
  position: relative;
`;

export const CartButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  
  svg {
    font-size: 1.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CartCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

export const CartPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: white;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    padding: 0.5rem;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  align-items: center;
`;

export const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ItemInfo = styled.div`
  h4 {
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 0.25rem 0;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
    font-size: 0.9rem;
  }
`;

export const ItemPrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  margin-top: 0.25rem;
`;

export const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.25rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};

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
    min-width: 20px;
    text-align: center;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const CartFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
`;

export const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  span {
    color: ${({ theme }) => theme.colors.text};
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;