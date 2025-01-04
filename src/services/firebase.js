// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Verificação das variáveis de ambiente
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    console.error(`Variável de ambiente ${key} não está configurada`);
  }
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Nova função de verificação de conexão
const checkFirebaseConnection = async () => {
  try {
    // Tenta habilitar persistência (opcional)
    try {
      await enableIndexedDbPersistence(db);
    } catch (err) {
      if (err.code === 'failed-precondition') {
        console.warn('Múltiplas abas abertas, persistência não disponível');
      } else if (err.code === 'unimplemented') {
        console.warn('Navegador não suporta persistência');
      }
    }

    // Verifica se o app está inicializado
    if (!app) {
      throw new Error('Firebase não inicializado');
    }

    return true;
  } catch (error) {
    console.error('Erro na conexão Firebase:', error);
    return false;
  }
};

export { auth, db, storage, checkFirebaseConnection };