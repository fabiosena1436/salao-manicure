// src/pages/Auth/Register/index.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AiOutlineMail,
  AiOutlineLock, 
  AiOutlineUser, 
  AiOutlinePhone, 
  AiOutlineEnvironment 
} from 'react-icons/ai';
import { Button } from '../../../components/Button';
import { useAuth } from '../../../contexts/AuthContext';
import {
  AuthContainer,
  AuthBox,
  AuthTitle,
  AuthForm,
  InputGroup,
  InputIcon,
  Input,
  ErrorMessage,
  AuthLink
} from './styles';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('As senhas não coincidem');
    }

    setLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/'); // Redireciona para a home após o registro
    } catch (err) {
      console.error(err);
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'Este email já está em uso'
          : 'Falha ao criar conta. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthBox>
        <AuthTitle>Criar Conta</AuthTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <AuthForm onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <AiOutlineUser />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <AiOutlineMail />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <AiOutlinePhone />
            </InputIcon>
            <Input
              type="tel"
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <AiOutlineEnvironment />
            </InputIcon>
            <Input
              type="text"
              name="address"
              placeholder="Endereço completo com número"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <AiOutlineLock />
            </InputIcon>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <AiOutlineLock />
            </InputIcon>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </AuthForm>

        <AuthLink>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </AuthLink>
      </AuthBox>
    </AuthContainer>
  );
};