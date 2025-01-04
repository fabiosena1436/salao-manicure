// src/pages/Admin/Dashboard/index.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { 
  AiOutlineShoppingCart, 
  AiOutlineCalendar, 
  AiOutlineUser, 
  AiOutlineDollar 
} from 'react-icons/ai';
import {
  DashboardContainer,
  DashboardTitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  RecentSection,
  SectionHeader,
  AppointmentsList,
  AppointmentCard,
  StatusBadge
} from './styles';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    appointments: 0,
    clients: 0,
    totalSales: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Produtos
      const productsSnap = await getDocs(collection(db, 'products'));
      const productsCount = productsSnap.size;

      // Agendamentos
      const appointmentsSnap = await getDocs(collection(db, 'appointments'));
      const appointmentsCount = appointmentsSnap.size;

      // Clientes
      const clientsSnap = await getDocs(
        query(collection(db, 'users'), where('role', '==', 'client'))
      );
      const clientsCount = clientsSnap.size;

      // Vendas totais
      const ordersSnap = await getDocs(collection(db, 'orders'));
      const totalSales = ordersSnap.docs.reduce((total, doc) => {
        return total + (doc.data().total || 0);
      }, 0);

      // Agendamentos recentes
      const recentAppointmentsQuery = query(
        collection(db, 'appointments'),
        where('status', '==', 'pending')
      );
      const recentAppointmentsSnap = await getDocs(recentAppointmentsQuery);
      const recentAppointmentsData = recentAppointmentsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setStats({
        products: productsCount,
        appointments: appointmentsCount,
        clients: clientsCount,
        totalSales
      });

      setRecentAppointments(recentAppointmentsData);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <DashboardContainer>
      <DashboardTitle>Dashboard</DashboardTitle>
      
      <StatsGrid>
        <StatCard>
          <StatIcon>
            <AiOutlineShoppingCart />
          </StatIcon>
          <StatValue>{stats.products}</StatValue>
          <StatLabel>Produtos</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon>
            <AiOutlineCalendar />
          </StatIcon>
          <StatValue>{stats.appointments}</StatValue>
          <StatLabel>Agendamentos</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon>
            <AiOutlineUser />
          </StatIcon>
          <StatValue>{stats.clients}</StatValue>
          <StatLabel>Clientes</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon>
            <AiOutlineDollar />
          </StatIcon>
          <StatValue>{formatCurrency(stats.totalSales)}</StatValue>
          <StatLabel>Vendas</StatLabel>
        </StatCard>
      </StatsGrid>

      <RecentSection>
        <SectionHeader>
          <h2>Agendamentos Pendentes</h2>
        </SectionHeader>

        <AppointmentsList>
          {recentAppointments.map(appointment => (
            <AppointmentCard key={appointment.id}>
              <div className="client-info">
                <h3>{appointment.clientName}</h3>
                <p>{appointment.service}</p>
              </div>
              <div className="appointment-info">
                <p>{formatDate(appointment.date)} às {appointment.time}</p>
                <StatusBadge status={appointment.status}>
                  {appointment.status === 'pending' && 'Pendente'}
                  {appointment.status === 'confirmed' && 'Confirmado'}
                  {appointment.status === 'cancelled' && 'Cancelado'}
                </StatusBadge>
              </div>
            </AppointmentCard>
          ))}
        </AppointmentsList>
      </RecentSection>
    </DashboardContainer>
  );
};