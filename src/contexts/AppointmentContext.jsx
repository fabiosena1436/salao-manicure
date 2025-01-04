// src/contexts/AppointmentContext.jsx
import { createContext, useContext, useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';
import { useNotification } from './NotificationContext';

const AppointmentContext = createContext({});

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const createAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'appointments'), {
        ...appointmentData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      showSuccess('Agendamento criado com sucesso!');
      return docRef.id;
    } catch (error) {
      showError('Erro ao criar agendamento');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadAppointments = async (filters = {}) => {
    try {
      setLoading(true);
      const appointmentsRef = collection(db, 'appointments');
      let queryConstraints = [];

      if (filters.userId) {
        queryConstraints.push(where('userId', '==', filters.userId));
      }
      
      if (filters.status && filters.status !== 'all') {
        queryConstraints.push(where('status', '==', filters.status));
      }

      if (filters.date) {
        queryConstraints.push(where('date', '==', filters.date));
      }

      queryConstraints.push(orderBy('date', 'desc'));

      const q = query(appointmentsRef, ...queryConstraints);
      const querySnapshot = await getDocs(q);
      
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAppointments(appointmentsData);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      showError('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (appointmentId, data) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'appointments', appointmentId), {
        ...data,
        updatedAt: new Date().toISOString()
      });
      showSuccess('Agendamento atualizado com sucesso!');
    } catch (error) {
      showError('Erro ao atualizar agendamento');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    appointments,
    loading,
    createAppointment,
    loadAppointments,
    updateAppointment
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments deve ser usado dentro de um AppointmentProvider');
  }
  return context;
};