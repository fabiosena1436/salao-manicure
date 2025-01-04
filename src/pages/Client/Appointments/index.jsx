// src/pages/Client/Appointments/index.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  AiOutlineCalendar, 
  AiOutlineClockCircle,
  AiOutlineDollar,
  AiOutlineClose
} from 'react-icons/ai';
import {
  Container,
  Header,
  FilterTabs,
  TabButton,
  AppointmentsList,
  AppointmentCard,
  AppointmentInfo,
  AppointmentActions,
  StatusBadge,
  IconWrapper,
  Button,
  EmptyState,
  LoadingState
} from './styles';

export const ClientAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);

  const loadAppointments = async () => {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(
        appointmentsRef,
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Ordenar por data e hora
      appointmentsData.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });

      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      return;
    }

    try {
      await updateDoc(doc(db, 'appointments', appointmentId), {
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      });

      await loadAppointments();
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      alert('Erro ao cancelar agendamento. Tente novamente.');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isUpcoming = (appointment) => {
    const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
    return appointmentDate > new Date() && appointment.status !== 'cancelled';
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === 'upcoming') {
      return isUpcoming(appointment);
    }
    return !isUpcoming(appointment) || appointment.status === 'cancelled';
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f0ad4e',    // amarelo
      confirmed: '#5cb85c',  // verde
      cancelled: '#d9534f'   // vermelho
    };
    return colors[status] || colors.pending;
  };

  const getStatusText = (status) => {
    const statusTexts = {
      pending: 'Pendente',
      confirmed: 'Confirmado',
      cancelled: 'Cancelado'
    };
    return statusTexts[status] || 'Pendente';
  };

  if (loading) {
    return <LoadingState>Carregando agendamentos...</LoadingState>;
  }

  return (
    <Container>
      <Header>
        <h1>Meus Agendamentos</h1>
        <Link to="/client/new-appointment">
          <Button>Novo Agendamento</Button>
        </Link>
      </Header>

      <FilterTabs>
        <TabButton 
          $active={activeTab === 'upcoming'} 
          onClick={() => setActiveTab('upcoming')}
        >
          Próximos
        </TabButton>
        <TabButton 
          $active={activeTab === 'past'} 
          onClick={() => setActiveTab('past')}
        >
          Histórico
        </TabButton>
      </FilterTabs>

      <AppointmentsList>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <AppointmentCard key={appointment.id}>
              <AppointmentInfo>
                <h3>{appointment.service}</h3>
                <div className="details">
                  <IconWrapper>
                    <AiOutlineCalendar />
                    <span>{formatDate(appointment.date)}</span>
                  </IconWrapper>
                  <IconWrapper>
                    <AiOutlineClockCircle />
                    <span>{appointment.time}</span>
                  </IconWrapper>
                  <IconWrapper>
                    <AiOutlineDollar />
                    <span>
                      {appointment.servicePrice?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </span>
                  </IconWrapper>
                </div>
                <StatusBadge color={getStatusColor(appointment.status)}>
                  {getStatusText(appointment.status)}
                </StatusBadge>
              </AppointmentInfo>
              
              {isUpcoming(appointment) && appointment.status !== 'cancelled' && (
                <AppointmentActions>
                  <Button 
                    $variant="danger"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    <AiOutlineClose />
                    Cancelar
                  </Button>
                </AppointmentActions>
              )}
            </AppointmentCard>
          ))
        ) : (
          <EmptyState>
            <p>
              Nenhum agendamento {activeTab === 'upcoming' ? 'próximo' : 'no histórico'}
            </p>
            <Link to="/client/new-appointment">
              <Button>Fazer Novo Agendamento</Button>
            </Link>
          </EmptyState>
        )}
      </AppointmentsList>
    </Container>
  );
};