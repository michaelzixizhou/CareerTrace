import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalContent, ModalOverlay } from './ModalStyles';
import { PageNumber, PaginationContainer, PageNavigationButton } from './PageStyles';
import { Button } from './ButtonStyles';
import { Icon } from '@iconify/react';
import { ModifyModal } from './Modify';
import { DeleteConfirmationModal } from './Delete';
import { ModalHeader, ModalText } from './MobileTableStyles';

const MobileMode = styled.span`
  display: none;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`
const DesktopMode = styled.span`
  @media (max-width: 1200px) {
    display: none;
  }
`
const TableContainer = styled.div`
  padding: min(1vw, 1.5rem);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 100%;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  border: 1px solid #e4e5f1;
  background-color: #ffffff;
  margin-bottom: min(5vw, 1rem);
`;

const TableHeader = styled.th`
  padding: 12px 16px;
  background-color: #777777;
  color: #fff;
  border-bottom: 1px solid #dcdcdc;
  font-weight: 800;
  font-size: var(--font-size__header);
  text-align: left;
  cursor: ${props => (props.hover ? 'pointer' : 'default')};
  transition: background-color 0.5s ease;
  &:hover {
    background-color: ${props => (props.hover ? '#2c3e50' : '#777777')};
  }
  word-break: break-all;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 0.8rem;
  font-size: var(--font-size__text);
  border-bottom: 1px solid #dcdcdc;
  word-break: break-all;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: var(--font-size__badge_x) var(--font-size__badge_y);
  border-radius: 4px;
  font-size: var(--font-size__text);
  line-height: normal;
  vertical-align: middle;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: bold;
  color: #fff;
  text-align: center;
  background-color: ${props => {
    if (props.stage === 'Offer'){
      return 'green';
    } else {
      return props.rejected ? '#dc3545' : '#ffc107';
    }
  }};

  margin-left: ${props => {
    return props.margin ? 'min(2vw, 0.3rem)' : '0';
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

const itemsPerPage = 8; // temporary

const JobTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [currentJobData, setCurrentJobData] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [sortedData, setSortedData] = useState([...data]);
  const [sortOrder, setSortOrder] = useState('asc');

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const visibleData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
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

  const handleOverlayClick = event => {
    event.stopPropagation(); // Prevent the click event from reaching the overlay element
  };

  const handleInfoClick = (job) => {
    setCurrentJobData(job);
    setShowInformationModal(true);
  };

  const handleModifyClick = (job) => {
    setCurrentJobData(job);
    setShowModifyModal(true);
  };

  const customStatusOrder = ['No Response', 'Phone Screen', 'Online Assessment', 'Interview', 'Offer'];

  const handleSort = (column) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (column === 'jobCycle' || column === 'dateEvent') {
        const dateA = new Date(a[column]);
        const dateB = new Date(b[column]);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (column === 'applicationStage') {
        const statusA = customStatusOrder.indexOf(a[column]);
        const statusB = customStatusOrder.indexOf(b[column]);
        return sortOrder === 'asc' ? statusA - statusB : statusB - statusA;
      } else {
        return sortOrder === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
      }
    });
  
    setSortedData(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <TableContainer>
      <DesktopMode>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader onClick={() => handleSort('company')} hover={+true}>Company &#9660;</TableHeader>
              <TableHeader onClick={() => handleSort('role')} hover={+true}>Role &#9660;</TableHeader>
              <TableHeader onClick={() => handleSort('location')} hover={+true}>Location &#9660;</TableHeader>
              <TableHeader onClick={() => handleSort('jobCycle')} hover={+true}>Job Cycle &#9660;</TableHeader>
              <TableHeader onClick={() => handleSort('duration')} hover={+true}>Duration &#9660;</TableHeader>
              <TableHeader onClick={() => handleSort('dateEvent')} hover={+true}>Date of Event&#9660;</TableHeader>
              <TableHeader onClick={() => handleSort('applicationStage')} hover={+true}>Application Stage &#9660;</TableHeader>
              <TableHeader hover={+false}/>
            </tr>
          </thead>
          <tbody>
            {visibleData.length === 0 ? (
              <TableRow>
                <TableCell colSpan="8">No available data</TableCell>
              </TableRow>
            ) : (
              visibleData.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.role}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.jobCycle}</TableCell>
                  <TableCell>{job.duration}</TableCell>
                  <TableCell>{job.dateEvent}</TableCell>
                  <TableCell>
                    <StatusBadge stage={job.applicationStage} rejected={+job.rejected} margin={+false}>
                      {job.applicationStage}
                    </StatusBadge>
                    <InfoIcon icon="clarity:info-solid" onClick={() => handleInfoClick(job)}/>
                  </TableCell>
                  <TableCell>
                    <Button className='gray' type="button" onClick={() => handleModifyClick(job)}>
                      <Icon icon="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </StyledTable>
      </DesktopMode>   
      <MobileMode>
        <StyledTable>
            <thead>
              <tr>
                <TableHeader onClick={() => handleSort('company')} hover={+true}>Company &#9660;</TableHeader>
                <TableHeader onClick={() => handleSort('role')} hover={+true}>Role &#9660;</TableHeader>
                <TableHeader onClick={() => handleSort('applicationStage')} hover={+true}>Stage &#9660;</TableHeader>
                <TableHeader hover={+false}/>
              </tr>
            </thead>
              <tbody>
              {visibleData.length === 0 ? ( 
                <TableRow>
                  <TableCell colSpan="8">No available data</TableCell>
                </TableRow>
              ) : (
                visibleData.map((job, index) => (
                  <TableRow key={index}>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.role}</TableCell>
                    <TableCell>
                      <StatusBadge stage={job.applicationStage} rejected={+job.rejected} margin={+false}>
                        {job.applicationStage}
                      </StatusBadge>
                      <InfoIcon icon="clarity:info-solid" onClick={() => handleInfoClick(job)}/>
                    </TableCell>
                    <TableCell>
                      <Button className='gray' type="button" onClick={() => handleModifyClick(job)}>
                        <Icon icon="streamline:interface-edit-write-2-change-document-edit-modify-paper-pencil-write-writing" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </tbody>
          </StyledTable>
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
          <ModalContent onClick={handleOverlayClick}>
            <ModalHeader>Company<ModalText>: {currentJobData.company}</ModalText></ModalHeader>
            <ModalHeader>Role Name<ModalText>: {currentJobData.role}</ModalText></ModalHeader>
            <ModalHeader>Location<ModalText>: {currentJobData.location}</ModalText></ModalHeader>
            <ModalHeader>Job Cycle<ModalText>: {currentJobData.jobCycle}</ModalText></ModalHeader>
            <ModalHeader>Duration<ModalText>: {currentJobData.duration}</ModalText></ModalHeader>
            <ModalHeader>
              Application Stage <ModalText>:</ModalText>            
              <StatusBadge stage={currentJobData.applicationStage} rejected={+currentJobData.rejected} margin={+true}>
                  {currentJobData.applicationStage}
              </StatusBadge>
            </ModalHeader>
            <ModalHeader>
              {currentJobData.applicationStage && currentJobData.applicationStage !== "No Response" 
                ? "Date of " + currentJobData.applicationStage
                : currentJobData.applicationStage
                  ? "Date Applied"
                  : "Date of Event"}
              <ModalText>: {currentJobData.dateEvent}</ModalText>
            </ModalHeader>
            <ModalHeader>Anticipated Pay<ModalText>: {currentJobData.pay}</ModalText></ModalHeader>
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