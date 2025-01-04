import styled from 'styled-components';

export const ProductsContainer = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.colors.background};
`;

export const ProductsTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
`;

export const ProductName = styled.h3`
text-align: center;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const ViewAllButton = styled.div`
  text-align: center;
  margin-top: 3rem;
`;