// src/components/Banner/styles.js
import styled from 'styled-components';
import bannerBg from '../../assets/banner-lang.png';

export const BannerContainer = styled.div`
  width: 100%;
  height: 600px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bannerBg});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;

 
`;

export const BannerContent = styled.div`
  max-width: 800px;
  text-align: center;
  color: white;
`;

export const BannerTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

export const BannerText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

export const BannerButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;