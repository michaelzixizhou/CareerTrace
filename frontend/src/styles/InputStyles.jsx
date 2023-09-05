import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative; 
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 min(10vw, 5rem);
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

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 10px;
  
  @media (min-width: 1201px) {
    overflow-y: auto;
  }
`;