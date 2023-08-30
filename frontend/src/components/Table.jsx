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

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Company</TableHeader>
            <TableHeader>Role Name</TableHeader>
            <TableHeader>Location</TableHeader>
            <TableHeader>Duration</TableHeader>
            <TableHeader>Anticipated Pay</TableHeader>
            <TableHeader>Scheduled Interview/OA/etc</TableHeader>
            <TableHeader>State</TableHeader>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.roleName}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.duration}</TableCell>
              <TableCell>{job.anticipatedPay}</TableCell>
              <TableCell>{job.scheduledInterview}</TableCell>
              <TableCell>{job.state}</TableCell>
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
    </TableContainer>
  );
};

export default JobTable;