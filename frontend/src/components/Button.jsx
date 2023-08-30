import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
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
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;