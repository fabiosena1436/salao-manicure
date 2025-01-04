// src/pages/Client/Profile/index.jsx
import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../contexts/NotificationContext';
import { 
  AiOutlineUser, 
  AiOutlineMail, 
  AiOutlinePhone, 
  AiOutlineEnvironment,
  AiOutlineEdit,
  AiOutlineSave
} from 'react-icons/ai';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileCard,
  ProfileForm,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputIcon,
  Button,
  ButtonGroup
} from './styles';

export const Profile = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        updatedAt: new Date().toISOString()
      });

      showSuccess('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      showError('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <h1>Meu Perfil</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <AiOutlineEdit />
            Editar Perfil
          </Button>
        )}
      </ProfileHeader>

      <ProfileCard>
        <ProfileForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nome Completo</Label>
            <InputGroup>
              <InputIcon>
                <AiOutlineUser />
              </InputIcon>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <InputGroup>
              <InputIcon>
                <AiOutlineMail />
              </InputIcon>
              <Input
                type="email"
                name="email"
                value={formData.email}
                disabled={true}
                required
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Telefone</Label>
            <InputGroup>
              <InputIcon>
                <AiOutlinePhone />
              </InputIcon>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <Label>Endereço</Label>
            <InputGroup>
              <InputIcon>
                <AiOutlineEnvironment />
              </InputIcon>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </InputGroup>
          </FormGroup>

          {isEditing && (
            <ButtonGroup>
              <Button 
                type="button" 
                $variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  'Salvando...'
                ) : (
                  <>
                    <AiOutlineSave />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </ButtonGroup>
          )}
        </ProfileForm>
      </ProfileCard>
    </ProfileContainer>
  );
};