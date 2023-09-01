import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 -10px; 
  position: relative; 
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10vw;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;