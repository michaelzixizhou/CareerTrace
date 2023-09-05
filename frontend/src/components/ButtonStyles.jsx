import styled from 'styled-components';

export const Button = styled.button`
  padding: min(3vw, 0.5rem) min(3vw, 1rem);
  margin: 5px;
  border: none;
  border-radius: 4px;
  font-size: var(--font-size__button);
  cursor: pointer;
  transition: background-color 0.5s ease;

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

  &:hover {
    background-color: #2c3e50;
    color: #fff;
  }
`;

export const StyledCloseButton = styled.button`
  position: fixed;
  top: 15%;
  right: 10%;
  background: none;
  border: none;
  font-size: var(--font-size__button);
  cursor: pointer;
  color: #2c3e50;
  transition: color 0.5s ease;

  &:hover {
    color: #777;
  }
`;