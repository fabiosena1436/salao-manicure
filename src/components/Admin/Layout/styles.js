// src/components/Admin/Layout/styles.js
import styled from 'styled-components';

export const AdminLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex: 1;
  background: #f5f5f5;
  padding: 2rem;
  margin-left: 250px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: 1rem;
  }
`;