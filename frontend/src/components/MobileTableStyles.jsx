import styled from 'styled-components';

export const MobileTable = styled.div`
  display: none;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

export const MobileTitle = styled.div`
  display: none;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    font-size: var(--font-size__header);
    margin-bottom: min(1vw, 0.2rem);
  }
`;

export const MobileButton = styled.div`
    display: none;

    @media (max-width: 800px) {
        display: flex;
        font-size: var(--font-size__button);
        background-color: lightgreen;
        margin-bottom: min(5vw, 3rem);
        align-self: left;
        align-items: left;
        border-radius: 5px;
        cursor: pointer;
    }
`;

export const ModalHeader = styled.div`
    font-size: var(--font-size__button);
    font-weight: 800;
    display: flex;
    flex-direction: row;
    margin-bottom: min(5vw, 2rem);
`;

export const ModalText = styled.div`
    font-weight: 500;
`;