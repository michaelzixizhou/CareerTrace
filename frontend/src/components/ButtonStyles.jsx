import styled from 'styled-components';

export const Button = styled.button`
  padding: min(3vw, 0.5rem) min(3vw, 1rem);
  margin: 5px;
  border: none;
  border-radius: 4px;
  font-size: var(--font-size__button);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }

  &.red {
    background-color: #dc3545;
    color: #fff;
  }

  &.blue {
    background-color: #007bff;
    color: #fff;
  }

  &.green {
    background-color: #28a745;
    color: #fff;
  }

  &.gray {
    background-color: #777777;
    color: #fff;
  }
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: var(--font-size__button);
  cursor: pointer;
`;