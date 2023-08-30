import React, { useState } from 'react';
import styled from 'styled-components';

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

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const NavigationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
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

const itemsPerPage = 10;

const JobTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

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

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleBadgeClick = (state, date) => {
    if (state === 'Interview' || state === 'Phone Screen' || state === 'Online Assessment') {
      setModalData(date);
      setShowModal(true);
    }
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
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      <PaginationContainer>
        {currentGroup > 1 && (
          <NavigationButton onClick={() => setCurrentPage(firstPageInGroup - pagesPerGroup)}>
            Left
          </NavigationButton>
        )}
        {visiblePages}
        {lastPageInGroup < totalPages && (
          <NavigationButton onClick={() => setCurrentPage(lastPageInGroup + 1)}>Right</NavigationButton>
        )}
      </PaginationContainer>
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent>
            {modalData}
          </ModalContent>
        </ModalOverlay>
      )}
    </TableContainer>
  );
};

export default JobTable;