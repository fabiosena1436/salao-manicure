// src/pages/Admin/Dashboard/styles.js
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const DashboardTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

export const StatIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.75rem;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
  word-break: break-word;

  @media (min-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
`;

export const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const RecentSection = styled.section`
  margin-top: 1.5rem;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (min-width: 768px) {
    margin-top: 2rem;
    padding: 1.5rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.25rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export const AppointmentsList = styled.div`
  display: grid;
  gap: 1rem;
`;

export const AppointmentCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
  }

  .client-info {
    h3 {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0.25rem;
      font-size: 1rem;

      @media (min-width: 768px) {
        font-size: 1.1rem;
      }
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.7;
      font-size: 0.875rem;

      @media (min-width: 768px) {
        font-size: 1rem;
      }
    }
  }

  .appointment-info {
    text-align: left;

    @media (min-width: 640px) {
      text-align: right;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0.5rem;
      font-size: 0.875rem;

      @media (min-width: 768px) {
        font-size: 1rem;
      }
    }
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }

  background: ${({ status, theme }) => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success + '20';
      case 'cancelled':
        return theme.colors.error + '20';
      default:
        return theme.colors.warning + '20';
    }
  }};

  color: ${({ status, theme }) => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.warning;
    }
  }};
`;

export const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;