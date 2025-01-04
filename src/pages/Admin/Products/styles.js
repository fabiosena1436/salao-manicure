// src/pages/Admin/Products/styles.js
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

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.5rem;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  button {
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
    }
  }
`;

export const SearchSection = styled.div`
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
  }

  input {
    width: 100%;
    border: none;
    font-size: 1rem;
    outline: none;
    background: transparent;
  }
`;

export const FilterDropdown = styled.div`
  display: flex;
  align-items: center;
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
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }

  select {
    width: 100%;
    border: none;
    font-size: 1rem;
    outline: none;
    background: transparent;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};

    option {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  padding-top: 75%; // 4:3 aspect ratio
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductInfo = styled.div`
  padding: 1rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    line-height: 1.4;
  }

  .category {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .price {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .stock {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.875rem;
  }
`;

export const ProductActions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #eee;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  button {
    width: 100%;
    justify-content: center;
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
    opacity: 0.7;
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

export const ConfirmDialog = styled.div`
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

  .content {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;

    @media (min-width: 768px) {
      padding: 2rem;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 1rem;
      font-size: 1.25rem;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      line-height: 1.5;

      @media (min-width: 768px) {
        font-size: 1rem;
        margin-bottom: 2rem;
      }
    }

    .actions {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      button {
        width: 100%;
      }
    }
  }
`;