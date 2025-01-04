// src/components/Button/styles.js
import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  transition: all 0.2s;

  ${({ $variant, theme }) => // Mudamos variant para $variant
    $variant === 'primary'
      ? css`
          background: ${theme.colors.primary};
          color: white;

          &:hover {
            filter: brightness(0.9);
          }
        `
      : css`
          background: ${theme.colors.secondary};
          color: white;

          &:hover {
            filter: brightness(0.9);
          }
        `}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;