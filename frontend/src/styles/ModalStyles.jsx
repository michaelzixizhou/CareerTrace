import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  z-index: 100;
  
  @media (max-width: 1200px) {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  max-width: 85vw;

  @media (max-width: 1200px) {
    text-align: left;
    width: min(400px, 85vw);
  }

  max-height: 70vh;
  overflow-y: auto; /* Add vertical scroll if content overflows */
`;

export const InfoModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  width: min(400px, 85vw);

  @media (max-width: 1200px) {
    text-align: left;
  }

  max-height: 70vh;
  overflow-y: auto; /* Add vertical scroll if content overflows */
`;