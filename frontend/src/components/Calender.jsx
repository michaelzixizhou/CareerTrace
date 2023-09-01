import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { ModalContent, ModalOverlay } from './ModalStyles';
import 'react-calendar/dist/Calendar.css';

const CalendarContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const EventDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #007bff;
  margin-right: 4px;
`;

const EventLabel = styled.div`
  display: flex;
  align-items: center;
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

const TrackCalender = ({ data, selectedDate, handleDateChange }) => {
    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [selectedInterviewData, setSelectedInterviewData] = useState(null);
  
    const formattedInterviewDates = data
      .filter(item => item.state === 'Interview')
      .map(item => new Date(item.scheduledInterview).toDateString());

    const formattedApplicationDates = data
      .map(item => new Date(item.dateApplied).toDateString());
  
    const tileContent = ({ date }) => {
        const formattedDate = date.toDateString(); 

        const isInterviewDate = formattedInterviewDates.includes(formattedDate);
        const isApplicationDate = formattedApplicationDates.includes(formattedDate);

        if (isInterviewDate || isApplicationDate) {
            return (
                <EventLabel>
                    {isInterviewDate && <EventDot />}
                    {isApplicationDate && <EventDot />}
                </EventLabel>
            );
        }
    };
  
    const handleTileClick = date => {
      const formattedDate = date.toDateString();
      const interviewData = data.find(item => item.state === 'Interview' && new Date(item.scheduledInterview).toDateString() === formattedDate);
  
      if (interviewData) {
        setSelectedInterviewData(interviewData);
        setShowInterviewModal(true);
      }
    };
  
    const closeModal = () => {
      setShowInterviewModal(false);
      setSelectedInterviewData(null);
    };
  
    return (
      <CalendarContainer>
        <h2>Interview and Application Calendar</h2>
        <Calendar onChange={handleDateChange} value={selectedDate} tileContent={tileContent} onClickDay={handleTileClick} />
        {showInterviewModal && (
          <InterviewModal interviewData={selectedInterviewData} onClose={closeModal} />
        )}
      </CalendarContainer>
    );
};
  
export default TrackCalender;