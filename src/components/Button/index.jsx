// src/components/Button/index.jsx
import { ButtonContainer } from './styles';

export const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <ButtonContainer $variant={variant} {...props}> {/* Mudamos variant para $variant */}
      {children}
    </ButtonContainer>
  );
};