import { Modal } from 'react-responsive-modal';

export const EditCategoryModal = ({ open, onCloseModal,selectedCategory }) => {
  const handleSubmit = () => {
    // Your form submit logic here
    console.log(
      "selectedcategour",selectedCategory    );
      };

  return (
    <Modal open={open} onClose={onCloseModal} closeOnOverlayClick={false} center>
      <h2>Edit Category</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
        hendrerit risus, sed porttitor quam.
        {selectedCategory?.name} 
        {selectedCategory?.createon} 
        {selectedCategory?.isActive} 
        {selectedCategory?.createdby} 
      </p>
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};
