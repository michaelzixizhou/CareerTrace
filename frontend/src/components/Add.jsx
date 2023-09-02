import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalContent, ModalOverlay } from './ModalStyles';
import { Button, StyledCloseButton } from './ButtonStyles';
import { StyledForm, InputGroup, Label, Input } from './InputStyles';
import Select from 'react-select';
import Autosuggest from 'react-autosuggest';

const AddJobButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const AddJobModal = ({ onClose }) => {
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);

  const [jobInfo, setJobInfo] = useState({
    company: '',
    role: '',
    dateApplied: '',
    location: '',
    duration: '',
    pay: '',
    status: '',
  });

  useEffect(() => {
    const fetchLocationSuggestions = async (inputValue) => {
      try {
        const response = await fetch(`API_URL_FOR_LOCATIONS?query=${inputValue}`);
        const data = await response.json();
        setLocationSuggestions(data.results); 
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    };

    const fetchCompanySuggestions = async (inputValue) => {
      try {
        const response = await fetch(`API_URL_FOR_COMPANIES?query=${inputValue}`);
        const data = await response.json();
        setCompanySuggestions(data.results); 
      } catch (error) {
        console.error('Error fetching company suggestions:', error);
      }
    };

    fetchCompanySuggestions(jobInfo.company);
    fetchLocationSuggestions(jobInfo.location);
  }, [jobInfo.company, jobInfo.location]);

  const handleCompanyChange = (newValue) => {
    setJobInfo({ ...jobInfo, company: newValue });
  };

  const handleLocationChange = (newValue) => {
    setJobInfo({ ...jobInfo, location: newValue });
  };

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
            <Autosuggest
              suggestions={companySuggestions}
              onSuggestionsFetchRequested={({ value }) => handleCompanyChange(value)}
              onSuggestionsClearRequested={() => setCompanySuggestions([])}
              getSuggestionValue={(suggestion) => suggestion.name}
              renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
              inputProps={{
                value: jobInfo.company,
                onChange: (_, { newValue }) => handleCompanyChange(newValue),
              }}
            />
          </InputGroup>
          <InputGroup>
            <Label>Role Name</Label>
            <Input
              type="text"
              value={jobInfo.role}
              onChange={(e) => setJobInfo({ ...jobInfo, role: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Date Applied</Label>
            <Input
              type="date"
              value={jobInfo.dateApplied}
              onChange={(e) => setJobInfo({ ...jobInfo, dateApplied: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Location</Label>
            <Select
              value={{ label: jobInfo.location, value: jobInfo.location }}
              onChange={(newValue) => handleLocationChange(newValue.label)}
              options={locationSuggestions.map((suggestion) => ({
                value: suggestion.name,
                label: suggestion.name,
              }))}
            />
          </InputGroup>
          <InputGroup>
            <Label>Duration</Label>
            <Input
              type="text"
              value={jobInfo.duration}
              onChange={(e) => setJobInfo({ ...jobInfo, duration: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Anticipated Pay</Label>
            <Input
              type="text"
              value={jobInfo.pay}
              onChange={(e) => setJobInfo({ ...jobInfo, pay: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>Status</Label>
            <Input
              type="text"
              value={jobInfo.status}
              onChange={(e) => setJobInfo({ ...jobInfo, status: e.target.value })}
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
