import React, { useState } from 'react';
import { ModalContent, ModalOverlay } from './ModalStyles';
import { Button, StyledCloseButton } from './ButtonStyles';
import Select from 'react-select';
import { StyledForm, InputGroup, Label, Input } from './InputStyles';
import { StyledCheckbox, CheckboxContainer } from './CheckBoxStyles';

export const ModifyModal = ({ onClose, currentJobData, setShowDeleteConfirmation }) => {
  const [currentJobInfo, setCurrentJobInfo] = useState(currentJobData);

  const handleUpdate = () => {
    // TODO: Implement the submission logic
    onClose();
  };

  const applicationStageOptions = [
    { value: 'No Response', label: 'No Response' },
    { value: 'Phone Screen', label: 'Phone Screen' },
    { value: 'Online Assessment', label: 'Online Assessment' },
    { value: 'Interview', label: 'Interview' },
    { value: 'Offer', label: 'Offer' },
  ];

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
            <Label>Application Stage</Label>
            <Select
              options={applicationStageOptions}
              value={applicationStageOptions.find((option) => option.value === currentJobInfo.applicationStage)}
              onChange={(selectedOption) => {
                setCurrentJobInfo({ 
                  ...currentJobInfo, 
                  applicationStage: selectedOption.value, 
                  rejected: selectedOption.value === 'Offer' ? false : currentJobInfo.rejected
                });
              }}
            />
          </InputGroup>
          <InputGroup>
            <Label>Rejected in the Above Stage?</Label>
            <CheckboxContainer>
              <StyledCheckbox
                type="checkbox"
                id="rejectedCheckbox"
                checked={currentJobInfo.rejected}
                onChange={(e) => {
                  if (currentJobInfo.applicationStage === 'Offer') {
                    e.preventDefault();
                  } else {
                    setCurrentJobInfo({ ...currentJobInfo, rejected: e.target.checked });
                  }
                }}
                disabled={currentJobInfo.applicationStage === 'Offer'}
              />
            </CheckboxContainer>
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
            <Button className='blue' type="button" onClick={handleUpdate}>Update</Button>
            <Button className='red' type="button" onClick={() => setShowDeleteConfirmation(true)}>Delete</Button>
          </InputGroup>
        </StyledForm>
      </ModalContent>
    </ModalOverlay>
  );
};