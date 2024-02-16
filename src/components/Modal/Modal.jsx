import { useEffect, useRef } from 'react';
import './Modal.scss';

const Modal = ({ hints }) => {
  const dialogRef = useRef(null);

  const closeModal = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.showModal();
  }, []);

  return (
    <div className="modal-container">
      <dialog ref={dialogRef} className="modal">
        <h5>Time Zone:</h5>
        <h2>{hints}</h2>
        <button onClick={closeModal} type="button">
          close
        </button>
      </dialog>
    </div>
  );
};

export default Modal;
