import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalContent, ModalOverlay } from './Modals';
import { Button, StyledCloseButton } from './Button';
import Select from 'react-select';
import Autosuggest from 'react-autosuggest';

const AddJobButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 -10px; 
  position: relative; 
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10vw;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const AddJobModal = ({ onClose }) => {
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);

  const [jobInfo, setJobInfo] = useState({
    company: '',
    roleName: '',
    dateApplied: '',
    location: '',
    duration: '',
    anticipatedPay: '',
    state: '',
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
              value={jobInfo.roleName}
              onChange={(e) => setJobInfo({ ...jobInfo, roleName: e.target.value })}
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
              value={jobInfo.anticipatedPay}
              onChange={(e) => setJobInfo({ ...jobInfo, anticipatedPay: e.target.value })}
            />
          </InputGroup>
          <InputGroup>
            <Label>State</Label>
            <Input
              type="text"
              value={jobInfo.state}
              onChange={(e) => setJobInfo({ ...jobInfo, state: e.target.value })}
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
