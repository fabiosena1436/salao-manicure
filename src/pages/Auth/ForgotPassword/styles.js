// src/pages/Auth/ForgotPassword/styles.js
import styled from 'styled-components';
import {
  AuthContainer as BaseAuthContainer,
  AuthBox as BaseAuthBox,
  AuthTitle as BaseAuthTitle,
  AuthForm as BaseAuthForm,
  InputGroup as BaseInputGroup,
  InputIcon as BaseInputIcon,
  Input as BaseInput,
  ErrorMessage as BaseErrorMessage
} from '../../../styles/auth/shared';

export const AuthContainer = styled(BaseAuthContainer)``;
export const AuthBox = styled(BaseAuthBox)`
  .description {
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 2rem;
    opacity: 0.8;
  }
`;
export const AuthTitle = styled(BaseAuthTitle)``;
export const AuthForm = styled(BaseAuthForm)``;
export const InputGroup = styled(BaseInputGroup)``;
export const InputIcon = styled(BaseInputIcon)``;
export const Input = styled(BaseInput)``;
export const ErrorMessage = styled(BaseErrorMessage)``;

export const SuccessMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.success};
  padding: 1rem;
  background: ${({ theme }) => theme.colors.success}10;
  border-radius: 4px;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const BackToLogin = styled.div`
  margin-top: 2rem;
  text-align: center;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;