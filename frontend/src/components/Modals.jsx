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
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

const DeleteChoiceButton = styled.button`
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

  &.confirm {
    background-color: #dc3545;
    color: #fff;
  }

  &.cancel {
    background-color: #6c757d;
    color: #fff;
  }
`;

export const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
    return (
      <ModalOverlay>
        <ModalContent>
          <p>Are you sure you want to delete this job?</p>
          <DeleteChoiceButton className="confirm" onClick={onConfirm}>Yes</DeleteChoiceButton>
          <DeleteChoiceButton className="cancel" onClick={onClose}>No</DeleteChoiceButton>
        </ModalContent>
      </ModalOverlay>
    );
};