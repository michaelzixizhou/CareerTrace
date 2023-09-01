import styled from 'styled-components';

export const PageNumber = styled.span`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageNavigationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;
