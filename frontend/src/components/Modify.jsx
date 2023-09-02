import React, { useState, useEffect } from 'react';
import { ModalContent, ModalOverlay } from './ModalStyles';
import { Button, StyledCloseButton } from './ButtonStyles';
import Select from 'react-select';
//import Autosuggest from 'react-autosuggest';
import { StyledForm, InputGroup, Label, Input } from './InputStyles';

export const ModifyModal = ({ onClose, currentJobData, setShowDeleteConfirmation }) => {
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [currentJobInfo, setCurrentJobInfo] = useState(currentJobData);

  const handleUpdate = () => {
    // TODO: Implement the submission logic
    onClose();
  };

  const statusOptions = [
    { value: 'Interview', label: 'Interview' },
    { value: 'Phone Screen', label: 'Phone Screen' },
    { value: 'Online Assessment', label: 'Online Assessment' },
    { value: 'Offer', label: 'Offer' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Other', label: 'Other' },
  ];
  
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

    fetchCompanySuggestions(currentJobInfo.company);
    fetchLocationSuggestions(currentJobInfo.location);
  }, [currentJobInfo.company, currentJobInfo.location]);

  const handleCompanyChange = (newValue) => {
    setCurrentJobInfo({ ...currentJobInfo, company: newValue });
  };

  const handleLocationChange = (newValue) => {
    setCurrentJobInfo({ ...currentJobInfo, location: newValue });
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
            {/* <Autosuggest
              suggestions={companySuggestions}
              onSuggestionsFetchRequested={({ value }) => handleCompanyChange(value)}
              onSuggestionsClearRequested={() => setCompanySuggestions([])}
              getSuggestionValue={(suggestion) => suggestion.name}
              renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
              inputProps={{
                value: currentJobInfo.company,
                onChange: (_, { newValue }) => handleCompanyChange(newValue),
              }}
            /> */}
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
                setCurrentJobInfo({ ...currentJobInfo, status: selectedOption.value })
              }
              styles={{
                control: (styles) => ({
                  ...styles,
                  backgroundColor: 'white',
                }),
              }}
            />
          </InputGroup>
          <InputGroup>
            <Label>Max Status</Label>
            <Select
              options={statusOptions}
              value={statusOptions.find((option) => option.value === currentJobInfo.maxStatus)}
              onChange={(selectedOption) =>
                setCurrentJobInfo({ ...currentJobInfo, maxStatus: selectedOption.value })
              }
              styles={{
                control: (styles) => ({
                  ...styles,
                  backgroundColor: 'white',
                }),
              }}
            />
          </InputGroup>
          <InputGroup>
            <Label>Location</Label>
            {/* <Select
              value={{ label: currentJobInfo.location, value: currentJobInfo.location }}
              onChange={(newValue) => handleLocationChange(newValue.label)}
              options={locationSuggestions.map((suggestion) => ({
                value: suggestion.name,
                label: suggestion.name,
              }))}
            /> */}
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