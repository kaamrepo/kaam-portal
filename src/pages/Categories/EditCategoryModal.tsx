import ReactModal from 'react-modal';
import { cat } from '../../types/category.types';
import DefaultLayout from '../../layout/DefaultLayout';

interface ModalProps {
  isOpen: boolean;
  closeModal: (event: React.MouseEvent) => void;
  brand: cat | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, brand }) => {
  console.log("isOPen",isOpen);
  console.log("closeModal",closeModal);
  console.log("brand",brand);
  
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Brand Modal"
    >
      <h2>Edit Branda'lksdjfklasdjflasdf;asdjflakdl;das'kdslaj;hSFFFFFFSRTDGHTFGJKFGDFSTGRDATEwrtyuioytdrseaSDGFHJKFDSSL</h2>
      <form>
        <label>
          Name:
          <input type="text" value={brand?.name || ''} readOnly />
        </label>
        {/* Add other input fields for other properties */}
        <button onClick={closeModal}>Close</button>
      </form>
    </ReactModal>
  );
};

export default Modal;
