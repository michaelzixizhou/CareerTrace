import { ModalOverlay, ModalContent } from "./ModalStyles";
import { Button } from "./ButtonStyles";

export const DeleteConfirmationModal = ({ onClose, userData, setUserData, currentJobData, setShowModifyModal }) => {
    const handleDelete = () => {
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
          .then((data) => {
            console.log('Deleted successfully', data);
            setUserData(userData);
          })
          .catch((err) => {
            console.error('Error:', err);
          });

        setShowModifyModal(false);
        onClose();
    };

    return (
      <ModalOverlay>
        <ModalContent>
          <p>Are you sure you want to delete this job?</p>
          <Button className="red" type="button" onClick={handleDelete}>Yes</Button>
          <Button className="gray" type="button" onClick={onClose}>No</Button>
        </ModalContent>
      </ModalOverlay>
    );
};