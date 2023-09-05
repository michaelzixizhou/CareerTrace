import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalContent, ModalOverlay } from '../styles/ModalStyles';
import { Button, StyledCloseButton } from '../styles/ButtonStyles';
import { StyledForm, InputGroup, Label, Input, FormContainer, Column } from '../styles/InputStyles';
import { CheckboxContainer, StyledCheckbox } from '../styles/CheckBoxStyles';
import Select from 'react-select';

const AddJobButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const AddJobModal = ({ onClose, userData, setUserData }) => {
  const [currentJobInfo, setCurrentJobInfo] = useState({
    company: '',
    role: '',
    jobCycle: '',
    location: '',
    duration: '',
    pay: '',
    applicationStage: 'No Response',
    rejected: false,
  });

  console.log(userData)
  const applicationStageOptions = [
    { value: 'No Response', label: 'No Response' },
    { value: 'Phone Screen', label: 'Phone Screen' },
    { value: 'Online Assessment', label: 'Online Assessment' },
    { value: 'Interview', label: 'Interview' },
    { value: 'Offer', label: 'Offer' },
  ];

  const handleSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentJobInfo),
    };
  
    fetch(`/api/${userData._id}/jobs`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error posting data to the server');
        }
        console.log('Data posted successfully');
  
        return fetch(`/api/${userData._id}`);
      })
      .then((res) => res.json())
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

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
                  value={ applicationStageOptions.find((option) => option.value === currentJobInfo.applicationStage)}
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
                <Button className='green' onClick={handleSubmit}>Submit</Button>
              </InputGroup>
            </Column>
          </FormContainer>
        </StyledForm>
      </ModalContent>
    </ModalOverlay>
  );
};

const AddJob = ({ userData, setUserData }) => {
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
      {showModal && <AddJobModal onClose={handleCloseModal} userData={userData} setUserData={setUserData} />}
    </AddJobButtonContainer>
  );
};

export default AddJob;
