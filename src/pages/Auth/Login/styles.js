// src/pages/Auth/Login/styles.js
import styled from 'styled-components'; // Adicione esta importação
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
} from '../../../styles/auth/shared';

export {
  AuthContainer,
  AuthBox,
  AuthTitle,
  AuthForm,
  InputGroup,
  InputIcon,
  Input,
  ErrorMessage,
  AuthLink
};

export const ForgotPassword = styled.div`
  text-align: right;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-size: 0.9rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ForgotPasswordLink = styled.div`
  text-align: right;
  margin-bottom: 1rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;