import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalContent, ModalOverlay, DeleteConfirmationModal } from './Modals';
import { PageNumber, PaginationContainer, PageNavigationButton } from './Pages';
import { Button } from './Button';

const TableContainer = styled.div`
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
`;

const TableHeader = styled.th`
  padding: 12px 16px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #dcdcdc;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #dcdcdc;
`;

const StateBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  background-color: ${props => {
    switch (props.state) {
      case 'Interview':
        return '#007bff';
      case 'Phone Screen':
        return '#28a745';
      case 'Online Assessment':
        return '#ffc107';
      case 'Offer':
        return '#17a2b8';
      case 'Rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }};
`;

const itemsPerPage = 10; // temporary

const JobTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const visibleData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  const pagesPerGroup = 5;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const firstPageInGroup = (currentGroup - 1) * pagesPerGroup + 1;
  const lastPageInGroup = Math.min(firstPageInGroup + 4, totalPages);
  
  const visiblePages = Array.from({ length: lastPageInGroup - firstPageInGroup + 1 }).map((_, index) => (
    <PageNumber
      key={index}
      onClick={() => setCurrentPage(firstPageInGroup + index)}
      style={{
        backgroundColor: currentPage === firstPageInGroup + index ? '#e0e0e0' : 'transparent',
        fontWeight: currentPage === firstPageInGroup + index ? 'bold' : 'normal',
      }}
    >
      {firstPageInGroup + index}
    </PageNumber>
  ));

  const handleBadgeClick = (state, date) => {
    if (state === 'Interview' || state === 'Phone Screen' || state === 'Online Assessment') {
      setModalData(date);
      setShowModal(true);
    }
  };

  const handleDeleteConfirmation = jobData => {
    setModalData(jobData);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteJob = () => {
    //  TODO: Implement delete logic here (update etc)
    setShowModal(false);
    setShowDeleteConfirmation(false);
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Company</TableHeader>
            <TableHeader>Role Name</TableHeader>
            <TableHeader>Date Applied</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Duration</TableHeader>
            <TableHeader>Anticipated Pay</TableHeader>
            <TableHeader>State</TableHeader>
            <TableHeader/>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.roleName}</TableCell>
              <TableCell>{job.dateApplied}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.duration}</TableCell>
              <TableCell>{job.anticipatedPay}</TableCell>
              <TableCell onClick={() => handleBadgeClick(job.state, job.scheduledInterview)}>
                <StateBadge state={job.state} onClick={() => handleBadgeClick(job.state, job)}>
                  {job.state}
                </StateBadge>
              </TableCell>
              <TableCell>
                <Button className='red' onClick={() => handleDeleteConfirmation(job)}>X</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      <PaginationContainer>
        {currentGroup > 1 && (
          <PageNavigationButton onClick={() => setCurrentPage(firstPageInGroup - pagesPerGroup)}>
            Left
          </PageNavigationButton>
        )}
        {visiblePages}
        {lastPageInGroup < totalPages && (
          <PageNavigationButton onClick={() => setCurrentPage(lastPageInGroup + 1)}>Right</PageNavigationButton>
        )}
      </PaginationContainer>
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent>
            {modalData}
          </ModalContent>
        </ModalOverlay>
      )}
      {showDeleteConfirmation && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent>
            {showDeleteConfirmation ? (
              <DeleteConfirmationModal
                onClose={() => setShowDeleteConfirmation(false)}
                onConfirm={handleDeleteJob}
              />
            ) : (
              <p>{modalData}</p>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </TableContainer>
  );
};

export default JobTable;