// src/pages/Client/Dashboard/index.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { useAppointments } from '../../../contexts/AppointmentContext'; // Adicione esta importação
import { 
  AiOutlineShoppingCart, 
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineArrowRight
} from 'react-icons/ai';
import {
  DashboardContainer,
  WelcomeCard,
  StatsGrid,
  StatCard,
  RecentSection,
  SectionHeader,
  AppointmentCard,
  OrderCard,
  CardHeader,
  CardBody,
  StatusBadge,
  ViewAllButton
} from './styles';

export const ClientDashboard = () => {
  const { user } = useAuth();
  const { loadAppointments } = useAppointments(); // Adicione este hook
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalOrders: 0,
    totalSpent: 0
  });

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Carregar agendamentos recentes
      const appointmentsRef = collection(db, 'appointments');
      const appointmentsQuery = query(
        appointmentsRef,
        where('userId', '==', user.uid),
        orderBy('date', 'desc'),
        limit(3)
      );
      const appointmentsSnap = await getDocs(appointmentsQuery);
      const appointmentsData = appointmentsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentAppointments(appointmentsData);

      // Carregar todos os agendamentos para estatísticas
      const allAppointmentsQuery = query(
        appointmentsRef,
        where('userId', '==', user.uid)
      );
      const allAppointmentsSnap = await getDocs(allAppointmentsQuery);
      
      // Carregar pedidos recentes
      const ordersRef = collection(db, 'orders');
      const ordersQuery = query(
        ordersRef,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
        limit(3)
      );
      const ordersSnap = await getDocs(ordersQuery);
      const ordersData = ordersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentOrders(ordersData);

      // Calcular estatísticas
      const allOrdersQuery = query(
        ordersRef,
        where('userId', '==', user.uid)
      );
      const allOrdersSnap = await getDocs(allOrdersQuery);

      let totalSpent = 0;
      allOrdersSnap.docs.forEach(doc => {
        const orderData = doc.data();
        if (orderData.total) {
          totalSpent += orderData.total;
        }
      });

      // Adicionar valor dos agendamentos ao total gasto
      allAppointmentsSnap.docs.forEach(doc => {
        const appointmentData = doc.data();
        if (appointmentData.servicePrice) {
          totalSpent += appointmentData.servicePrice;
        }
      });

      setStats({
        totalAppointments: allAppointmentsSnap.size,
        totalOrders: allOrdersSnap.size,
        totalSpent
      });

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Filtrar apenas agendamentos futuros e não cancelados
  const upcomingAppointments = recentAppointments.filter(appointment => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    return appointmentDate > new Date() && appointment.status !== 'cancelled';
  });

  return (
    <DashboardContainer>
      <WelcomeCard>
        <div className="user-info">
          <AiOutlineUser className="icon" />
          <div>
            <h1>Bem-vindo(a), {user?.displayName || 'Cliente'}!</h1>
            <p>Confira seus agendamentos e pedidos recentes</p>
          </div>
        </div>
      </WelcomeCard>

      <StatsGrid>
        <StatCard>
          <div className="icon">
            <AiOutlineCalendar />
          </div>
          <div className="info">
            <span className="value">{stats.totalAppointments}</span>
            <span className="label">Agendamentos</span>
          </div>
        </StatCard>

        <StatCard>
          <div className="icon">
            <AiOutlineShoppingCart />
          </div>
          <div className="info">
            <span className="value">{stats.totalOrders}</span>
            <span className="label">Pedidos</span>
          </div>
        </StatCard>

        <StatCard>
          <div className="icon">
            <AiOutlineShoppingCart />
          </div>
          <div className="info">
            <span className="value">{formatCurrency(stats.totalSpent)}</span>
            <span className="label">Total Gasto</span>
          </div>
        </StatCard>
      </StatsGrid>

      <RecentSection>
        <SectionHeader>
          <h2>Próximos Agendamentos</h2>
          <ViewAllButton as={Link} to="/client/appointments">
            Ver Todos <AiOutlineArrowRight />
          </ViewAllButton>
        </SectionHeader>

        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map(appointment => (
            <AppointmentCard key={appointment.id}>
              <CardHeader>
                <h3>{appointment.service}</h3>
                <StatusBadge status={appointment.status}>
                  {appointment.status === 'pending' && 'Pendente'}
                  {appointment.status === 'confirmed' && 'Confirmado'}
                  {appointment.status === 'cancelled' && 'Cancelado'}
                </StatusBadge>
              </CardHeader>
              <CardBody>
                <p>
                  <AiOutlineCalendar />
                  {formatDate(appointment.date)} às {appointment.time}
                </p>
                {appointment.servicePrice && (
                  <p className="price">
                    {formatCurrency(appointment.servicePrice)}
                  </p>
                )}
              </CardBody>
            </AppointmentCard>
          ))
        ) : (
          <p>Nenhum agendamento próximo</p>
        )}
      </RecentSection>

      <RecentSection>
        <SectionHeader>
          <h2>Pedidos Recentes</h2>
          <ViewAllButton as={Link} to="/client/orders">
            Ver Todos <AiOutlineArrowRight />
          </ViewAllButton>
        </SectionHeader>

        {recentOrders.length > 0 ? (
          recentOrders.map(order => (
            <OrderCard key={order.id}>
              <CardHeader>
                <h3>Pedido #{order.id.slice(-6)}</h3>
                <StatusBadge status={order.status}>
                  {order.status === 'pending' && 'Pendente'}
                  {order.status === 'confirmed' && 'Confirmado'}
                  {order.status === 'delivered' && 'Entregue'}
                </StatusBadge>
              </CardHeader>
              <CardBody>
                <p>{order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'itens'}</p>
                <p className="price">{formatCurrency(order.total || 0)}</p>
              </CardBody>
            </OrderCard>
          ))
        ) : (
          <p>Nenhum pedido recente</p>
        )}
      </RecentSection>
    </DashboardContainer>
  );
};