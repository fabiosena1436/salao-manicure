// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Buscar dados completos do usuário no Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const enrichedUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.name,
              phone: userData.phone,
              address: userData.address,
              role: userData.role || 'client',
              // outros dados que você queira incluir
            };
            setUser(enrichedUser);
            setUserRole(userData.role || 'client');
          } else {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: 'client'
            });
            setUserRole('client');
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: 'client'
          });
          setUserRole('client');
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (userData) => {
    try {
      // Criar usuário no Firebase Auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      try {
        // Verificar se é o primeiro usuário
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const isFirstUser = usersSnapshot.empty;

        // Dados completos para salvar no Firestore
        const userDataToSave = {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          role: isFirstUser ? 'admin' : 'client',
          createdAt: new Date().toISOString()
        };

        // Salvar dados adicionais no Firestore
        await setDoc(doc(db, 'users', user.uid), userDataToSave);

        // Retornar usuário com dados completos
        return {
          uid: user.uid,
          email: user.email,
          ...userDataToSave
        };
      } catch (error) {
        console.error("Erro ao salvar dados do usuário:", error);
        throw error;
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const enrichedUser = {
            uid: user.uid,
            email: user.email,
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
            role: userData.role || 'client'
          };
          setUserRole(userData.role || 'client');
          return enrichedUser;
        }
        return user;
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        throw error;
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error("Erro no logout:", error);
      throw error;
    }
  };

  // Função para atualizar dados do usuário
  const updateUserData = async (userData) => {
    if (!user?.uid) throw new Error('Usuário não encontrado');

    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Atualizar o estado do usuário
      setUser(prevUser => ({
        ...prevUser,
        ...userData
      }));

      return true;
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      throw error;
    }
  };

  const value = {
    user,
    userRole,
    register,
    login,
    logout,
    loading,
    updateUserData // Nova função exportada
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};