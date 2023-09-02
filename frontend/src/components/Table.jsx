import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalContent, ModalOverlay } from './ModalStyles';
import { PageNumber, PaginationContainer, PageNavigationButton } from './PageStyles';
import { Button } from './ButtonStyles';
import { Icon } from '@iconify/react';
import { ModifyModal } from './Modify';
import { DeleteConfirmationModal } from './Delete';
import { MobileTable, MobileTitle, MobileButton, ModalHeader, ModalText } from './MobileTableStyles';

const MobileMode = styled.span`
  display: none;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`
const DesktopMode = styled.span`
  @media (max-width: 800px) {
    display: none;
  }
`
const TableContainer = styled.div`
  margin: 0;
  padding: min(2vw, 3rem);
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
  font-weight: 800;
  font-size: var(--font-size__header);
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
  padding: min(1vw, 2rem);
  border-bottom: 1px solid #dcdcdc;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: min(1vw, 0.3rem) min(1vw, 0.5rem);
  border-radius: 4px;
  font-size: var(--font-size__text);
  line-height: normal;
  vertical-align: middle;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: bold;
  color: #fff;
  text-align: left;
  background-color: ${props => {
    switch (props.status) {
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

const InfoIcon = styled(Icon)`
  font-size: var(--font-size__icon); 
  margin-left: min(0.5vw, 0.3rem);
  margin-top: 0;
  margin-bottom: 0;
  vertical-align: middle;
  color: #6c757d;
  cursor: pointer;
`;

const itemsPerPage = 10; // temporary

const JobTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [currentJobData, setCurrentJobData] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showMobileInformationModal, setShowMobileInformationModal] = useState(false);
  
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

  const handleInfoClick = (job) => {
    setCurrentJobData(job);
    setShowInformationModal(true);
  };

  const handleModifyClick = (job) => {
    setCurrentJobData(job);
    setShowModifyModal(true);
  };

  return (
    <TableContainer>
      <DesktopMode>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>Company</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Date Applied</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Duration</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader/>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.role}</TableCell>
                <TableCell>{job.dateApplied}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.duration}</TableCell>
                <TableCell>
                  <StatusBadge status={job.status}>
                    {job.status}
                  </StatusBadge>
                  <InfoIcon icon="clarity:info-solid" onClick={() => handleInfoClick(job)}/>
                </TableCell>
                <TableCell>
                  <Button className='gray' type="button" onClick={() => handleModifyClick(job)}>
                    <Icon icon="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </DesktopMode>   
      <MobileMode>
        <StyledTable>
            <thead>
              <tr>
                <TableHeader>Company</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader/>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.role}</TableCell>
                  <TableCell>
                    <StatusBadge status={job.status}>
                      {job.status}
                    </StatusBadge>
                    <InfoIcon icon="clarity:info-solid" onClick={() => handleInfoClick(job)}/>
                  </TableCell>
                  <TableCell>
                    <Button className='gray' type="button" onClick={() => handleModifyClick(job)}>
                      <Icon icon="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        {/* {visibleData.map((job, index) => (
          <MobileTitle key={index}>
            {job.company}
            <MobileButton onClick={() => setShowMobileInfo(true)}>Click to Show more</MobileButton>

            {showMobileInfo && (
              <ModalOverlay onClick={() => setShowMobileInfo(false)}>
                <ModalContent>
                  <ModalHeader>Company <ModalText>: {job.company}</ModalText></ModalHeader>
                  <ModalHeader>Role Name <ModalText>: {job.role}</ModalText></ModalHeader>
                  <ModalHeader>Date Applied <ModalText>: {job.dateApplied}</ModalText></ModalHeader>
                  <ModalHeader>Location <ModalText>: {job.location}</ModalText></ModalHeader>
                  <ModalHeader>Duration <ModalText>: {job.duration}</ModalText></ModalHeader>
                  <ModalHeader>Interview Scheduled: <ModalText>: {job.dateApplied}</ModalText></ModalHeader>
                  <ModalHeader>Anticipated Pay: <ModalText>: {job.anticipatedPay}</ModalText></ModalHeader>
                </ModalContent>
              </ModalOverlay>
            )}
          </MobileTitle>
        ))} */}
      </MobileMode>
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
      {showInformationModal && (
        <ModalOverlay onClick={() => setShowInformationModal(false)}>
          <ModalContent>
            <p>Company: {currentJobData.company}</p>
            <p>Role: {currentJobData.role}</p>
            <p>Date Applied: {currentJobData.dateApplied}</p>
            <p>Location: {currentJobData.location}</p>
            <p>Duration: {currentJobData.duration}</p>
            <p>
              Status:            
              <StatusBadge status={currentJobData.status}>
                  {currentJobData.status}
              </StatusBadge>
            </p>
            <p>Interview Scheduled: {currentJobData.dateApplied}</p>
            <p>Anticipated Pay: {currentJobData.anticipatedPay}</p>
          </ModalContent>
        </ModalOverlay>
      )}
      {showModifyModal && (
        <ModifyModal 
          onClose={() => setShowModifyModal(false)}
          currentJobData={currentJobData}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
        />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteConfirmation(false)}
          setShowModifyModal={setShowModifyModal}
        />
      )}
    </TableContainer>
  );
};

export default JobTable;