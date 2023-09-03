import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalContent, ModalOverlay } from './ModalStyles';
import { Button, StyledCloseButton } from './ButtonStyles';
import { StyledForm, InputGroup, Label, Input } from './InputStyles';
import Select from 'react-select';

const AddJobButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const AddJobModal = ({ onClose }) => {
  const [currentJobInfo, setCurrentJobInfo] = useState({
    company: '',
    role: '',
    dateApplied: '',
    location: '',
    duration: '',
    pay: '',
    status: '',
    maxStatus: '',
  });

  const statusOptions = [
    { value: 'Interview', label: 'Interview' },
    { value: 'Phone Screen', label: 'Phone Screen' },
    { value: 'Online Assessment', label: 'Online Assessment' },
    { value: 'Offer', label: 'Offer' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const handleSubmit = () => {
    // TODO: Implement the submission logic
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <StyledForm>
          <InputGroup>
            <StyledCloseButton onClick={onClose}>X</StyledCloseButton>
          </InputGroup>
          <InputGroup>
            <Label>Company</Label>
            <Input
              type="text"
              value={currentJobInfo.company}
              onChange={(e) => setCurrentJobInfo({ ...currentJobInfo, company: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Role</Label>
            <Input
              type="text"
              value={currentJobInfo.role}
              onChange={(e) => setCurrentJobInfo({ ...currentJobInfo, role: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Date Applied</Label>
            <Input
              type="date"
              value={currentJobInfo.dateApplied}
              onChange={(e) => setCurrentJobInfo({ ...currentJobInfo, dateApplied: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Current Status</Label>
            <Select
              options={statusOptions}
              value={statusOptions.find((option) => option.value === currentJobInfo.status)}
              onChange={(selectedOption) =>
                setCurrentJobInfo({ ...currentJobInfo, status: selectedOption.value, maxStatus: selectedOption.value })
              }
            />
          </InputGroup>
          <InputGroup>
            {currentJobInfo.status === 'Rejected' ? (
              <>
                <Label>Max Status</Label>
                <Select
                  options={statusOptions.filter((option) => option.value !== 'Offer')}
                  value={statusOptions.find((option) => option.value === currentJobInfo.maxStatus)}
                  onChange={(selectedOption) =>
                    setCurrentJobInfo({ ...currentJobInfo, maxStatus: selectedOption.value })
                  }
                />
              </>
            ) : (
              <>
                <Label>Max Status</Label>
                <Select
                  options={statusOptions.filter((option) => option.value === currentJobInfo.status)}
                  value={statusOptions.find((option) => option.value === currentJobInfo.maxStatus)}
                  onChange={(selectedOption) =>
                    setCurrentJobInfo({ ...currentJobInfo, maxStatus: selectedOption.value })
                  }
                />
              </>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Location</Label>
            <Input
              type="text"
              value={currentJobInfo.location}
              onChange={(e) => setCurrentJobInfo({ ...currentJobInfo, location: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Duration</Label>
            <Input
              type="text"
              value={currentJobInfo.duration}
              onChange={(e) => setCurrentJobInfo({ ...currentJobInfo, duration: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Anticipated Pay</Label>
            <Input
              type="text"
              value={currentJobInfo.pay}
              onChange={(e) => setCurrentJobInfo({ ...currentJobInfo, pay: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Button className='green' onClick={handleSubmit}>Submit</Button>
          </InputGroup>
        </StyledForm>
      </ModalContent>
    </ModalOverlay>
  );
};

const AddJob = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <AddJobButtonContainer>
      <Button className='blue' onClick={handleOpenModal}>Add Job</Button>
      {showModal && <AddJobModal onClose={handleCloseModal} />}
    </AddJobButtonContainer>
  );
};

export default AddJob;
