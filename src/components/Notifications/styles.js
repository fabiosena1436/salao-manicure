// src/components/Notifications/styles.js
import styled from 'styled-components';

export const NotificationsContainer = styled.div`
  position: relative;
`;

export const NotificationIcon = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

export const NotificationPanel = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const NotificationItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background: ${({ $read }) => ($read ? 'white' : 'rgba(255, 105, 180, 0.1)')};

  h4 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  small {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    font-size: 0.8rem;
  }

  ${({ $type, theme }) => {
    switch ($type) {
      case 'success':
        return `border-left: 4px solid ${theme.colors.success};`;
      case 'error':
        return `border-left: 4px solid ${theme.colors.error};`;
      case 'warning':
        return `border-left: 4px solid ${theme.colors.warning};`;
      default:
        return `border-left: 4px solid ${theme.colors.primary};`;
    }
  }}
`;

export const EmptyNotifications = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;