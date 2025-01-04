// src/pages/Auth/Login/index.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Button } from '../../../components/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../contexts/NotificationContext';
import {
  AuthContainer,
  AuthBox,
  AuthTitle,
  AuthForm,
  InputGroup,
  InputIcon,
  Input,
  ErrorMessage,
  AuthLink,
  ForgotPasswordLink
} from './styles';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    setError('');

    try {
      await login(formData.email, formData.password);
      showSuccess('Login realizado com sucesso!');
      navigate('/');
    } catch (err) {
      console.error('Erro no login:', err);
      setError(
        err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
          ? 'Email ou senha incorretos'
          : 'Erro ao fazer login. Tente novamente.'
      );
      showError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthBox>
        <AuthTitle>Login</AuthTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <AuthForm onSubmit={handleSubmit}>
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

          <ForgotPasswordLink>
            <Link to="/forgot-password">Esqueceu sua senha?</Link>
          </ForgotPasswordLink>

          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </AuthForm>

        <AuthLink>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </AuthLink>
      </AuthBox>
    </AuthContainer>
  );
};