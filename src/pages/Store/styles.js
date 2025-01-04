// src/pages/Store/styles.js
import styled, { css } from 'styled-components'; // Adicionando a importação do css


export const StoreContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2.5rem;
  }

 
`;

export const SearchSection = styled.div`
  margin-bottom: 2rem;
  @media screen {
    display: flex;   
  
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  padding-left: 0.6rem;
  padding:  auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);


  svg {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
    margin-right: 0.5rem;
  }

  input {
   
    flex: 1;
    border: none;
    font-size: 1rem;
    outline: none;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const FiltersContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background: white;
  padding: 2rem;
  box-shadow: -2px 0 4px rgba(0,0,0,0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  

  ${({ $showMobile }) =>
    $showMobile &&
    css`
      transform: translateX(0);
    `}

  .filters-content {
    height: 100%;
    overflow-y: auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    position: static;
    width: auto;
    transform: none;
    box-shadow: none;
    padding: 0;
    margin-bottom: 2rem;

    .filters-content {
      display: flex;
      gap: 2rem;
      height: auto;
      overflow: visible;
    }
  }
`;

export const FilterGroup = styled.div`
  margin-bottom: 2rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
    font-size: 1rem;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: 0;
  }
`;

export const SortSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &.active {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const PriceRangeFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 100px;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  span {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

 
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
  padding: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const MobileFilters = styled.div`
  // Seus estilos aqui
`;

export const PriceFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  input {
    width: 100px;
    border: none;
    font-size: 1rem;
    outline: none;
    padding: 0.25rem;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const ProductInfo = styled.div`
  padding: 1.5rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .category {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .description {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }
`;

export const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const AddToCartButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  svg {
    font-size: 1.2rem;
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