// src/components/Footer/styles.js
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.text};
  color: white;
  padding: 3rem 1rem 1rem;
  margin-top: auto;

  @media (min-width: 768px) {
    padding: 4rem 2rem 1rem;
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const FooterSection = styled.div`
  padding: 0 1rem;

  @media (max-width: 575px) {
    text-align: center;
  }
`;

export const FooterText = styled.p`
  line-height: 1.6;
  margin-top: 1rem;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.1rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FooterListItem = styled.li`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  @media (max-width: 575px) {
    justify-content: center;
  }

  a, address {
    color: white;
    text-decoration: none;
    transition: color 0.2s;
    font-style: normal;
    font-size: inherit;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 575px) {
    justify-content: center;
  }
`;

export const SocialIcon = styled.a`
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
`;

export const FooterBottom = styled.div`
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

export const FooterRights = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 0 1rem;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;