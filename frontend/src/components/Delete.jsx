import { useEffect } from "react";
import { ModalOverlay, InfoModalContent } from "../styles/ModalStyles";
import { Button } from "../styles/ButtonStyles";

export const DeleteConfirmationModal = ({ onClose, userData, setUserData, currentJobData, setShowModifyModal }) => {
    const handleDelete = () => {
      if (userData !== null && currentJobData !== null) {
        fetch (`api/${userData._id}/jobs/${currentJobData.jobid}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Delete request failed');
            }
            return res.json();
          })
          .catch((err) => {
            console.error('Error:', err);
          });

        setShowModifyModal(false);
        onClose();
      }
    };

    useEffect(() => {
      if (userData !== null) {
        fetch(`/api/${userData._id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data){
              localStorage.setItem('userData', JSON.stringify(data));
              setUserData(data);
            }
          })
          .catch((err) => {
            console.error('Error fetching user jobs:', err);
          });
      }
    }, [onClose, userData, setUserData]);

    return (
      <ModalOverlay>
        <InfoModalContent>
          <p>Are you sure you want to delete this job?</p>
          <Button className="red" type="button" onClick={handleDelete}>Yes</Button>
          <Button className="gray" type="button" onClick={onClose}>No</Button>
        </InfoModalContent>
      </ModalOverlay>
    );
};