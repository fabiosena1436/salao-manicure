// src/pages/Services/styles.js
import styled from 'styled-components';

export const ServicesPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  margin-top: 80px; // Espaço para o header fixo
`;

export const ServicesHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

export const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  button {
    padding: 0.75rem 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 25px;
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }

    &.active {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }

  @media (max-width: 768px) {
  flex-direction: column;
  }
`;

export const ServicesGrid = styled.div`
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
  flex-direction: column;
  }
`;

export const ServiceCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ServiceImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .icon {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const ServiceInfo = styled.div`
  padding: 1.5rem;
`;

export const ServiceTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

export const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const ServicePrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: 1.1rem;
`;