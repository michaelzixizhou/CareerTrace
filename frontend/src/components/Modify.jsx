import React, { useState, useEffect } from 'react';
import { ModalContent, ModalOverlay } from '../styles/ModalStyles';
import { Button, StyledCloseButton } from '../styles/ButtonStyles';
import Select from 'react-select';
import { StyledForm, InputGroup, Label, Input, FormContainer, Column } from '../styles/InputStyles';
import { StyledCheckbox, CheckboxContainer } from '../styles/CheckBoxStyles';

export const ModifyModal = ({ onClose, currentJobData, setShowDeleteConfirmation, userData, setUserData }) => {
  const [currentJobInfo, setCurrentJobInfo] = useState(currentJobData);

  const handleUpdate = () => {
    if (userData !== null && currentJobData !== null){
      fetch(`api/${userData._id}/jobs/${currentJobData.jobid}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(currentJobInfo), 
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Patch request failed');
            } 
            setUserData(userData);
            return res.json();
          })
          .catch((err) => {
            console.error('Error:', err); 
          });
      onClose();
    }
  };

  useEffect(() => {
    if (userData !== null) {
      fetch(`/api/${userData._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data){
            localStorage.setItem('userData', JSON.stringify(data));
            setUserData(data);
          }
        })
        .catch((err) => {
          console.error('Error fetching user jobs:', err);
        });
    }
  }, [onClose]);

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
          <FormContainer>
            <Column>
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
                <Label>
                  {currentJobInfo.applicationStage && currentJobInfo.applicationStage !== "No Response" 
                    ? "Date of " + currentJobInfo.applicationStage
                    : currentJobInfo.applicationStage
                      ? "Date Applied"
                      : "Date of Event"
                  }
                </Label>
                <Input
                  type="date"
                  value={currentJobInfo.dateEvent}
                  onChange={(e) => setCurrentJobInfo({ ...currentJobInfo, dateEvent: e.target.value })}
                />
              </InputGroup>
            </Column>
            <Column>
              <InputGroup>
                <Label>Location</Label>
                <Input
                  type="text"
                  value={currentJobInfo.location}
                  onChange={(e) => setCurrentJobInfo({ ...currentJobInfo, location: e.target.value })}
                />
              </InputGroup>
              <InputGroup>
                <Label>Job Cycle</Label>
                <Input
                  type="month"
                  value={currentJobInfo.jobCycle}
                  onChange={(e) => setCurrentJobInfo({ ...currentJobInfo, jobCycle: e.target.value })}
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
            </Column>
          </FormContainer>
        </StyledForm>
      </ModalContent>
    </ModalOverlay>
  );
};