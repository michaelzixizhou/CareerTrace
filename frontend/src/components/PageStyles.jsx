import styled from 'styled-components';

export const PageNumber = styled.span`
  margin: 0 min(1vw, 0.5rem);
  padding: min(2vw, 0.3rem) min(5vw, 0.6rem);
  font-size: var(--font-size__text);
  max-width: 0.5vw;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: white; 
  color: #333;

  &:hover {
    background-color: #2c3e50; 
  }
`;

export const PaginationContainer = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  line-height: normal;
  margin-bottom: min(5vw, 1rem);
  object-fit: contain;
`;

export const PageNavigationButton = styled.button`
  margin: 0 min(1vw, 0.5rem);
  padding: min(2vw, 0.3rem) min(5vw, 0.6rem);
  font-size: var(--font-size__text);
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #777777; 
  color: #fff; 
  font-family: 'DM Sans';

  &:hover {
    background-color: #2c3e50; 
  }
`;
