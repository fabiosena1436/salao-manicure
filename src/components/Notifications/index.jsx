// src/components/Notifications/index.jsx
import { useState, useEffect } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { useAuth } from '../../contexts/AuthContext';
import { getUserNotifications } from '../../services/notifications';
import {
  NotificationsContainer,
  NotificationIcon,
  NotificationBadge,
  NotificationPanel,
  NotificationItem,
  EmptyNotifications
} from './styles';

export const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    if (user) {
      const userNotifications = await getUserNotifications(user.uid);
      setNotifications(userNotifications);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContainer>
      <NotificationIcon onClick={() => setIsOpen(!isOpen)}>
        <AiOutlineBell size={24} />
        {unreadCount > 0 && (
          <NotificationBadge>{unreadCount}</NotificationBadge>
        )}
      </NotificationIcon>

      {isOpen && (
        <NotificationPanel>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                $read={notification.read}
                $type={notification.type}
              >
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <small>
                  {new Date(notification.createdAt).toLocaleDateString('pt-BR')}
                </small>
              </NotificationItem>
            ))
          ) : (
            <EmptyNotifications>
              Nenhuma notificação
            </EmptyNotifications>
          )}
        </NotificationPanel>
      )}
    </NotificationsContainer>
  );
};