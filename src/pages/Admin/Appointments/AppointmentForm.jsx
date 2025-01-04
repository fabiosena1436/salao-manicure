// src/pages/Admin/Appointments/AppointmentForm.jsx
import { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '../../../components/Button';
import {
  FormOverlay,
  FormContainer,
  FormHeader,
  FormBody,
  FormGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  CloseButton
} from './AppointmentForm.styles';

const services = [
  'Manicure',
  'Pedicure',
  'Manicure e Pedicure',
  'Design de Sobrancelhas',
  'Depilação',
  'Corte de Cabelo',
  'Hidratação',
  'Coloração'
];

const timeSlots = [];
for (let hour = 8; hour <= 18; hour++) {
  for (let minute of ['00', '30']) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
  }
}

export const AppointmentForm = ({ appointment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    service: '',
    date: '',
    time: '',
    status: 'pending',
    ...appointment
  });
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const clientsData = querySnapshot.docs
        .filter(doc => doc.data().role === 'client')
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      setClients(clientsData);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Se selecionou um cliente existente, preenche o telefone
    if (name === 'clientName') {
      const selectedClient = clients.find(client => client.name === value);
      if (selectedClient) {
        setFormData(prev => ({
          ...prev,
          clientPhone: selectedClient.phone
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const appointmentData = {
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        status: formData.status,
        updatedAt: new Date().toISOString()
      };

      if (appointment?.id) {
        await updateDoc(doc(db, 'appointments', appointment.id), appointmentData);
      } else {
        await addDoc(collection(db, 'appointments'), {
          ...appointmentData,
          createdAt: new Date().toISOString()
        });
      }

      onSave();
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      alert('Erro ao salvar agendamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para verificar se uma data é válida (não pode ser no passado)
  const isDateValid = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    return selectedDate >= today;
  };

  return (
    <FormOverlay>
      <FormContainer>
        <FormHeader>
          <h2>{appointment ? 'Editar Agendamento' : 'Novo Agendamento'}</h2>
          <CloseButton onClick={onClose}>
            <AiOutlineClose />
          </CloseButton>
        </FormHeader>

        <FormBody onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Cliente</Label>
            <Input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              list="clients"
              required
            />
            <datalist id="clients">
              {clients.map(client => (
                <option key={client.id} value={client.name} />
              ))}
            </datalist>
          </FormGroup>

          <FormGroup>
            <Label>Telefone</Label>
            <Input
              type="tel"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Serviço</Label>
            <Select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um serviço</option>
              {services.map(service => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Data</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Horário</Label>
            <Select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um horário</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Status</Label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="cancelled">Cancelado</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </ButtonGroup>
        </FormBody>
      </FormContainer>
    </FormOverlay>
  );
};