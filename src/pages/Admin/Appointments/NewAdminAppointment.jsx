// src/pages/Admin/Appointments/NewAdminAppointment.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAppointments } from '../../../contexts/AppointmentContext';
import { useNotification } from '../../../contexts/NotificationContext';
import { 
  AiOutlineCalendar, 
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineSearch
} from 'react-icons/ai';
import {
  Container,
  FormContainer,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  TimeGrid,
  TimeSlot,
  BookedSlot,
  ClientsGrid,
  ClientCard,
  SearchBar,
  LoadingState,
  EmptyState
} from './NewAdminAppointment.styles';

const services = [
  {
    id: 'manicure',
    name: 'Manicure',
    duration: '60',
    price: 50.00
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    duration: '60',
    price: 60.00
  },
  {
    id: 'manicure-pedicure',
    name: 'Manicure + Pedicure',
    duration: '120',
    price: 100.00
  },
  {
    id: 'design-sobrancelhas',
    name: 'Design de Sobrancelhas',
    duration: '30',
    price: 40.00
  }
];

export const NewAdminAppointment = () => {
  const navigate = useNavigate();
  const { createAppointment } = useAppointments();
  const { showSuccess, showError } = useNotification();
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    date: '',
    time: '',
    userId: ''
  });
  
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState(null);

  // Carregar todos os clientes ao montar o componente
  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoadingClients(true);
        const clientsRef = collection(db, 'users');
        const q = query(
          clientsRef,
          where('role', '==', 'client')
        );
        
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const clientsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log('Clientes carregados:', clientsData);
          setClients(clientsData);
          setFilteredClients(clientsData);
        } else {
          console.log('Nenhum cliente encontrado');
        }
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        showError('Erro ao carregar lista de clientes');
      } finally {
        setLoadingClients(false);
      }
    };

    loadClients();
  }, []);

  // Filtrar clientes quando o termo de busca mudar
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(client => 
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone?.includes(searchTerm)
      );
      setFilteredClients(filtered);
    }
  }, [searchTerm, clients]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute of ['00', '30']) {
        if (!(hour === 18 && minute === '30')) {
          slots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
        }
      }
    }
    return slots;
  };

  useEffect(() => {
    if (formData.date) {
      loadBookedSlots(formData.date);
    }
  }, [formData.date]);

  const loadBookedSlots = async (date) => {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const q = query(
        appointmentsRef,
        where('date', '==', date),
        where('status', 'in', ['pending', 'confirmed'])
      );
      
      const querySnapshot = await getDocs(q);
      const booked = querySnapshot.docs.map(doc => ({
        time: doc.data().time,
        status: doc.data().status,
        clientName: doc.data().clientName,
        service: doc.data().service
      }));
      
      setBookedSlots(booked);
    } catch (error) {
      console.error('Erro ao carregar horários ocupados:', error);
      showError('Erro ao verificar horários disponíveis');
    }
  };

  const handleClientSelect = (client) => {
    setSelectedClientId(client.id);
    setFormData(prev => ({
      ...prev,
      clientName: client.name || client.email,
      clientEmail: client.email,
      clientPhone: client.phone || '',
      userId: client.id
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.userId) {
      showError('Por favor, selecione um cliente');
      return;
    }

    try {
      setLoading(true);
      const selectedService = services.find(s => s.name === formData.service);
      
      await createAppointment({
        ...formData,
        servicePrice: selectedService?.price || 0,
        serviceDuration: selectedService?.duration || '60',
        status: 'confirmed',
        createdBy: 'admin',
        createdAt: new Date().toISOString()
      });
      
      showSuccess('Agendamento criado com sucesso!');
      navigate('/admin/appointments');
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      showError('Erro ao criar agendamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Novo Agendamento</h1>
      
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            <AiOutlineUser />
            Selecionar Cliente
          </Label>
          <SearchBar>
            <AiOutlineSearch />
            <input
              type="text"
              placeholder="Buscar cliente por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          
          {loadingClients ? (
            <LoadingState>Carregando clientes...</LoadingState>
          ) : (
            <ClientsGrid>
              {filteredClients.length > 0 ? (
                filteredClients.map(client => (
                  <ClientCard
                    key={client.id}
                    $selected={selectedClientId === client.id}
                    onClick={() => handleClientSelect(client)}
                  >
                    <h4>{client.name || client.email}</h4>
                    <p>
                      <AiOutlineMail />
                      {client.email}
                    </p>
                    {client.phone && (
                      <p>
                        <AiOutlinePhone />
                        {client.phone}
                      </p>
                    )}
                  </ClientCard>
                ))
              ) : (
                <EmptyState>
                  {searchTerm 
                    ? 'Nenhum cliente encontrado com este termo de busca' 
                    : 'Nenhum cliente cadastrado'}
                </EmptyState>
              )}
            </ClientsGrid>
          )}
        </FormGroup>

        {selectedClientId && (
          <>
            <FormGroup>
              <Label>Serviço</Label>
              <Select
                value={formData.service}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  service: e.target.value
                }))}
                required
              >
                <option value="">Selecione um serviço</option>
                {services.map(service => (
                  <option key={service.id} value={service.name}>
                    {service.name} - {service.duration}min - R${service.price.toFixed(2)}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>
                <AiOutlineCalendar />
                Data
              </Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date: e.target.value,
                  time: ''
                }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </FormGroup>

            {formData.date && (
              <FormGroup>
                <Label>
                  <AiOutlineClockCircle />
                  Horário
                </Label>
                <TimeGrid>
                  {generateTimeSlots().map(time => {
                    const isBooked = bookedSlots.find(slot => slot.time === time);
                    if (isBooked) {
                      return (
                        <BookedSlot 
                          key={time} 
                          title={`${isBooked.clientName} - ${isBooked.service}`}
                        >
                          {time}
                        </BookedSlot>
                      );
                    }
                    return (
                      <TimeSlot
                        key={time}
                        $selected={formData.time === time}
                        onClick={() => setFormData(prev => ({ ...prev, time }))}
                        type="button"
                      >
                        {time}
                      </TimeSlot>
                    );
                  })}
                </TimeGrid>
              </FormGroup>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? 'Criando agendamento...' : 'Criar Agendamento'}
            </Button>
          </>
        )}
      </FormContainer>
    </Container>
  );
};