import { ModalOverlay, ModalContent } from "./ModalStyles";
import { Button } from "./ButtonStyles";

export const DeleteConfirmationModal = ({ onClose, setShowModifyModal }) => {
    const handleDelete = () => {
        // TODO: Implement delete logic here (update etc)
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