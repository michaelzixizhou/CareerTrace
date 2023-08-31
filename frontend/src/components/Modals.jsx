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