// src/pages/ServiceDetail/styles.js
import styled from 'styled-components';

export const ServiceDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ServiceHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

export const ServiceTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const ServiceDescription = styled.p`
  white-space: pre-line;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin: 0 auto;
`;

export const GallerySection = styled.section`
  margin: 3rem 0;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const PriceSection = styled.section`
  margin: 3rem 0;
  
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  .price-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

export const PriceCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const BookingSection = styled.section`
  text-align: center;
  margin: 3rem 0;
`;