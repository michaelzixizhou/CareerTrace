import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { ModalContent, ModalOverlay } from '../styles/ModalStyles';
import { Button } from '../styles/ButtonStyles';
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

  @media (max-width: 1200px) {
    align-items: center;
  }
`;

const EventDot = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 100%;
  background-color: #28a745;
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

export const EventModal = ({ eventData, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setCurrentPage((currentPage + 1) % eventData.length);
  };

  const handlePrev = () => {
    setCurrentPage((currentPage - 1 + eventData.length) % eventData.length);
  };

  const handleOverlayClick = event => {
    event.stopPropagation(); // Prevent the click event from reaching the overlay element
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={handleOverlayClick}>
        <h2>Event Details</h2>
        {eventData && eventData.length > 0 ? (
          <>
            <div>
              <p>Type: {
                eventData[currentPage].applicationStage && eventData[currentPage].applicationStage !== "No Response" 
                ? eventData[currentPage].applicationStage
                : eventData[currentPage].applicationStage
                  ? "Application"
                  : "Not Specified"
                }
              </p>
              <p>Company: {eventData[currentPage].company}</p>
              <p>Role: {eventData[currentPage].role}</p>
              <p>Location: {eventData[currentPage].location}</p>
              <p>Date: {eventData[currentPage].dateEvent}</p>
            </div>
            <div>
              <h3>{currentPage + 1}/{eventData.length}</h3>
              <Button className='gray' type="button" onClick={handlePrev}>
                Previous
              </Button>
              <Button className='gray' type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </>
        ) : (
          <div>
            <p>No events available.</p>
          </div>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const TrackCalender = ({ data, selectedDate, handleDateChange }) => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventData, setEventData] = useState(null);

  const tileContent = ({ date }) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const formattedDate = new Date(Date.UTC(year, month, day)).toDateString();
  
    const eventsOnSelectedDate = data.jobapps.filter(
      item =>
        new Date(item.dateEvent).toDateString() === formattedDate
    );

    return (
      <EventLabel>
        {eventsOnSelectedDate && (
          <EventDot>{eventsOnSelectedDate.length}</EventDot>
        )}
      </EventLabel>
    );
  };
    
  const handleTileClick = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const formattedDate = new Date(Date.UTC(year, month, day)).toDateString();

    const eventsOnSelectDate = data.jobapps.filter(
      item => new Date(item.dateEvent).toDateString() === formattedDate
    );

    if (eventsOnSelectDate){
      setEventData(eventsOnSelectDate);
      setShowEventModal(true);
    }
  };

  const closeModal = () => {
    setShowEventModal(false);
    setEventData(null);
  };

  return (
    <>
      <CalendarContainer>
        <CalendarHeader>{data.name}'s Event Tracking Calendar</CalendarHeader>
        <Calendar 
          onChange={handleDateChange} 
          value={selectedDate} 
          tileContent={tileContent}
          onClickDay={handleTileClick} 
          minDetail="month"
          calendarType='gregory'
        />
        {showEventModal && (
          <EventModal 
            eventData={eventData} 
            onClose={closeModal} 
          />
        )}
      </CalendarContainer>
    </>
  );
};

export default TrackCalender;