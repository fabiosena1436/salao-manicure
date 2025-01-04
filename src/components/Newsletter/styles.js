// src/components/Newsletter/styles.js
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const NewsletterContainer = styled.section`
  padding: 3rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

export const NewsletterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const NewsletterTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  
  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const NewsletterText = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

export const NewsletterMessage = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  animation: ${fadeIn} 0.3s ease-out;
  background: ${({ $type, theme }) => 
    $type === 'error' 
      ? 'rgba(255, 0, 0, 0.1)' 
      : 'rgba(255, 255, 255, 0.1)'
  };
  color: ${({ $type }) => 
    $type === 'error' 
      ? '#ff6b6b' 
      : '#4cd964'
  };
`;