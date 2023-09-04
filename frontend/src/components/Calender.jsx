import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { ModalContent, ModalOverlay } from './ModalStyles';
import { Button } from './ButtonStyles';
import 'react-calendar/dist/Calendar.css';

const CalendarContainer = styled.div`
  flex-grow: 1; 
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 20px;
  align-items: center;
  text-align: center;
  align-self: center;
  align-content: center;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;

  @media (max-width: 1000px) {
    align-items: center;
  }
`;

const EventDot = styled.div`
  width: 50%;
  height: auto;
  border-radius: 50%;
  background-color: ${props => (props.type === 'interviews' ? '#28a745' : '#007bff')};
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: var(--font-size__text);
  color: #fff;
`;

const CalendarHeader = styled.div`
  font-size: var(--font-size__header);
  font-weight: 800;
  margin-bottom: 1.2rem;
`;

const EventLabel = styled.div`
  display: flex;
  align-items: center;
`;

export const InterviewApplicationModal = ({ interviewData, applicationData, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDataType, setCurrentDataType] = useState('interview'); // interview or application

  const handleNext = () => {
    // Calculate the next page, and if it goes beyond the last page, loop back to the first page
    setCurrentPage((currentPage + 1) % currentData.length);
  };

  const handlePrev = () => {
    // Calculate the previous page, and if it goes below the first page, loop to the last page
    setCurrentPage((currentPage - 1 + currentData.length) % currentData.length);
  };

  const handleOverlayClick = event => {
    event.stopPropagation(); // Prevent the click event from reaching the overlay element
  };

  const handleDataSwitch = dataType => {
    setCurrentDataType(dataType);
    setCurrentPage(0);
  };

  const currentData = currentDataType === 'interview' ? interviewData : applicationData;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={handleOverlayClick}>
        <h2>{currentDataType === 'interview' ? 'Assessment Details' : 'Application Details'}</h2>
        {currentData && currentData.length > 0 ? (
          <>
            <div>
              {currentDataType === 'interview' && (<p>Type: {currentData[currentPage].applicationStage}</p>)}
              {currentDataType !== 'interview' && (<p>Status: {currentData[currentPage].rejected === false ? 'Pending Response' : 'Rejected'}</p>)}
              {(currentDataType !== 'interview' && currentData[currentPage].rejected === false) && (<p>Application Status: {currentData[currentPage].applicationStage}</p>)}
              <p>Company: {currentData[currentPage].company}</p>
              <p>Role: {currentData[currentPage].role}</p>
              <p>Location: {currentData[currentPage].location}</p>
              {currentDataType === 'interview' ? (
                <p>Interview Date: {currentData[currentPage].scheduledInterview}</p>
              ) : (
                <p>Date Applied: {currentData[currentPage].jobCycle}</p>
              )}
            </div>
            <div>
              <h3>{currentPage + 1}/{currentData.length}</h3>
              <Button className='gray' type="button" onClick={handlePrev}>Previous</Button>
              <Button className='gray' type="button" onClick={handleNext}>Next</Button>
              <Button
                className='blue'
                type="button"
                onClick={() =>
                  handleDataSwitch(
                    currentDataType === 'application' ? 'interview' : 'application'
                  )
                }
              >
                {currentDataType === 'interview' ? 'Switch to Applications' : 'Switch to Interviews'}
              </Button>
            </div>
          </>
        ) : (
          <div>
            <p>No {currentDataType === 'interview' ? 'interview' : 'application'} on this day.</p>
            <Button
                className='blue'
                type="button"
                onClick={() =>
                  handleDataSwitch(
                    currentDataType === 'application' ? 'interview' : 'application'
                  )
                }
              >
                {currentDataType === 'interview' ? 'Switch to Applications' : 'Switch to Interviews'}
            </Button>
          </div>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const TrackCalender = ({ data, selectedDate, handleDateChange }) => {
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedInterviewData, setSelectedInterviewData] = useState(null);
  const [selectedApplicationData, setSelectedApplicationData] = useState(null);

  const tileContent = ({ date }) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const newDate = new Date(year, month, day); // Define formattedDate here
    const formattedDate = newDate.toDateString();
    
    const interviewsOnSelectedDate = data.filter(
      item =>
        ((item.applicationStage === 'Interview' || item.applicationStage === 'Phone Screen' || item.applicationStage === 'Online Assessment') && item.rejected === false) &&
        new Date(item.dateEvent).toDateString() === formattedDate
    );
  
    const applicationsOnSelectedDate = data.filter(
      item =>
        new Date(item.dateEvent).toDateString() === formattedDate
    );

    return (
      <EventLabel>
        {interviewsOnSelectedDate && (
          <EventDot type="interviews">{interviewsOnSelectedDate.length}</EventDot>
        )}
        {applicationsOnSelectedDate && (
          <EventDot type="applications">{applicationsOnSelectedDate.length}</EventDot>
        )}
      </EventLabel>
    );
  };
    
  const handleTileClick = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const newDate = new Date(year, month, day); // Define formattedDate here
    const formattedDate = newDate.toDateString();

    const interviewsOnSelectedDate = data.filter(
      item =>
      ((item.applicationStage === 'Interview' || item.applicationStage === 'Phone Screen' || item.applicationStage === 'Online Assessment') && item.rejected === false) &&
        new Date(item.dateEvent).toDateString() === formattedDate
    );
  
    const applicationsOnSelectedDate = data.filter(
      item =>
        new Date(item.dateEvent).toDateString() === formattedDate
    );

    if (interviewsOnSelectedDate){
      setSelectedInterviewData(interviewsOnSelectedDate);
      setShowInterviewModal(true);
    }

    if (applicationsOnSelectedDate){
      setSelectedApplicationData(applicationsOnSelectedDate);
      setShowInterviewModal(true);
    }
  };

  const closeModal = () => {
    setShowInterviewModal(false);
    setSelectedInterviewData(null);
  };

  return (
    <>
      <CalendarContainer>
        <CalendarHeader>Interview and Application Calendar</CalendarHeader>
        <Calendar 
          onChange={handleDateChange} 
          value={selectedDate} 
          tileContent={tileContent}
          onClickDay={handleTileClick} 
          minDetail="month"
          calendarType='gregory'
        />
        {showInterviewModal && (
          <InterviewApplicationModal 
            interviewData={selectedInterviewData} 
            applicationData={selectedApplicationData} 
            onClose={closeModal} 
          />
        )}
      </CalendarContainer>
    </>
  );
};

export default TrackCalender;