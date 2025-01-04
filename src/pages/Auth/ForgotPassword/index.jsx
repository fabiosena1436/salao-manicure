// src/pages/Auth/ForgotPassword/index.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../services/firebase';
import { useNotification } from '../../../contexts/NotificationContext';
import { AiOutlineMail, AiOutlineArrowLeft } from 'react-icons/ai';
import { Button } from '../../../components/Button';
import {
  AuthContainer,
  AuthBox,
  AuthTitle,
  AuthForm,
  InputGroup,
  InputIcon,
  Input,
  ErrorMessage,
  SuccessMessage,
  BackToLogin
} from './styles';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      showSuccess('Email de recuperação enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      setError(
        error.code === 'auth/user-not-found'
          ? 'Não existe uma conta com este email.'
          : 'Erro ao enviar email de recuperação. Tente novamente.'
      );
      showError('Erro ao enviar email de recuperação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthBox>
        <AuthTitle>Recuperar Senha</AuthTitle>
        
        {!success ? (
          <>
            <p className="description">
              Digite seu email para receber um link de recuperação de senha.
            </p>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <AuthForm onSubmit={handleSubmit}>
              <InputGroup>
                <InputIcon>
                  <AiOutlineMail />
                </InputIcon>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>

              <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </Button>
            </AuthForm>
          </>
        ) : (
          <SuccessMessage>
            <p>
              Um email com instruções para recuperar sua senha foi enviado para{' '}
              <strong>{email}</strong>
            </p>
            <p>
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </p>
          </SuccessMessage>
        )}

        <BackToLogin>
          <Link to="/login">
            <AiOutlineArrowLeft />
            Voltar para o Login
          </Link>
        </BackToLogin>
      </AuthBox>
    </AuthContainer>
  );
};