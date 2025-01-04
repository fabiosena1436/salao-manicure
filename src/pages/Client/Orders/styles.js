// src/pages/Client/Orders/styles.js
import styled from 'styled-components';

export const OrdersContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  margin-bottom: 2rem;

  h1 {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const OrderCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
`;

export const OrderHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .order-info {
    .order-number {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 0.5rem;
      display: block;
    }

    .order-details {
      display: flex;
      gap: 1rem;
      color: ${({ theme }) => theme.colors.text};
      font-size: 0.9rem;

      span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    }
  }
`;

export const OrderStatus = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const OrderItems = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
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
  flex: 1;

  h4 {
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 0.25rem 0;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
    font-size: 0.9rem;
  }

  .price {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    margin-top: 0.25rem;
  }
`;

export const OrderFooter = styled.div`
  padding: 1.5rem;
  background: #f9f9f9;
  border-top: 1px solid #eee;

  .payment-info {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;

    p {
      margin-bottom: 0.25rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.text};
`;