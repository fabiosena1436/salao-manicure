// src/services/notifications.js
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    getDocs, 
    orderBy 
  } from 'firebase/firestore';
  import { db } from './firebase';
  
  export const createNotification = async (userId, title, message, type = 'info') => {
    try {
      await addDoc(collection(db, 'notifications'), {
        userId,
        title,
        message,
        type,
        read: false,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
    }
  };
  
  export const getUserNotifications = async (userId) => {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      return [];
    }
  };