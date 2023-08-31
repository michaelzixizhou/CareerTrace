import styled from 'styled-components';
import { Button } from './Button';

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

export const InterviewModal = ({ interviewData, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <h2>Interview Details</h2>
        <p>Company: {interviewData.company}</p>
        <p>Role: {interviewData.roleName}</p>
        <p>Date: {interviewData.scheduledInterview}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export const DeleteConfirmationModal = ({ onClose, onConfirm }) => {
    return (
      <ModalOverlay>
        <ModalContent>
          <p>Are you sure you want to delete this job?</p>
          <Button className="blue" onClick={onConfirm}>Yes</Button>
          <Button className="gray" onClick={onClose}>No</Button>
        </ModalContent>
      </ModalOverlay>
    );
};