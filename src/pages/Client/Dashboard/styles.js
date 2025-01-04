// src/pages/Client/Dashboard/styles.js
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const WelcomeCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;

  .user-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .icon {
      font-size: 2.5rem;
      color: ${({ theme }) => theme.colors.primary};
      padding: 1rem;
      background: ${({ theme }) => theme.colors.primary}10;
      border-radius: 50%;
    }

    h1 {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0.5rem;
    }

    p {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.7;
    }
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    padding: 0.75rem;
    background: ${({ theme }) => theme.colors.primary}10;
    border-radius: 8px;
  }

  .info {
    .value {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0.25rem;
    }

    .label {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.7;
      font-size: 0.9rem;
    }
  }
`;

export const RecentSection = styled.section`
  margin-bottom: 2rem;

  > p {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }

  svg {
    font-size: 1.1rem;
  }
`;

export const AppointmentCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const OrderCard = styled(AppointmentCard)``;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }
`;

export const CardBody = styled.div`
  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    &.price {
      color: ${({ theme }) => theme.colors.primary};
      opacity: 1;
      font-weight: bold;
    }

    svg {
      opacity: 0.5;
    }
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success + '20';
      case 'cancelled':
        return theme.colors.error + '20';
      case 'delivered':
        return theme.colors.primary + '20';
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
      case 'delivered':
        return theme.colors.primary;
      default:
        return theme.colors.warning;
    }
  }};
`;