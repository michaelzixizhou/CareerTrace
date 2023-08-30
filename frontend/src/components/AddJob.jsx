import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalContent, ModalOverlay } from './Modals';
import { Button } from './Button';

const AddJobButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const totalSteps = 7;

const AddJobModal = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [jobInfo, setJobInfo] = useState({
        company: '',
        roleName: '',
        dateApplied: '',
        location: '',
        duration: '',
        anticipatedPay: '',
        state: '',
    });

    const handleNextStep = () => {
      setStep(step + 1);
    };
  
    const handlePreviousStep = () => {
      setStep(step - 1);
    };
  
    const handleSubmit = () => {
      // TODO: Implement the submission logic
      onClose();
    };
  
    return (
      <ModalOverlay>
        <ModalContent>
            {step === 1 && (
            <div>
                <label>Company</label>
                <input
                type="text"
                value={jobInfo.company}
                onChange={e => setJobInfo({ ...jobInfo, company: e.target.value })}
                />
            </div>
            )}

            {step === 2 && (
            <div>
                <label>Role Name</label>
                <input
                type="text"
                value={jobInfo.roleName}
                onChange={e => setJobInfo({ ...jobInfo, roleName: e.target.value })}
                />
            </div>
            )}

            {step === 3 && (
            <div>
                <label>Date Applied</label>
                <input
                type="date"
                value={jobInfo.dateApplied}
                onChange={e => setJobInfo({ ...jobInfo, dateApplied: e.target.value })}
                />
            </div>
            )}

            {step === 4 && (
            <div>
                <label>Location</label>
                <input
                type="text"
                value={jobInfo.location}
                onChange={e => setJobInfo({ ...jobInfo, location: e.target.value })}
                />
            </div>
            )}

            {step === 5 && (
            <div>
                <label>Duration</label>
                <input
                type="text"
                value={jobInfo.duration}
                onChange={e => setJobInfo({ ...jobInfo, duration: e.target.value })}
                />
            </div>
            )}

            {step === 6 && (
            <div>
                <label>Anticipated Pay</label>
                <input
                type="text"
                value={jobInfo.anticipatedPay}
                onChange={e => setJobInfo({ ...jobInfo, anticipatedPay: e.target.value })}
                />
            </div>
            )}

            {step === 7 && (
            <div>
                <label>State</label>
                <input
                type="text"
                value={jobInfo.state}
                onChange={e => setJobInfo({ ...jobInfo, state: e.target.value })}
                />
            </div>
            )}

          {step > 1 && <Button className='blue' onClick={handlePreviousStep}>Previous</Button>}
          {step < totalSteps && <Button className='blue' onClick={handleNextStep}>Next</Button>}
          {step === totalSteps && <Button className='green' onClick={handleSubmit}>Submit</Button>}
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