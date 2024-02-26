import { useEffect, useRef } from 'react';
import './Modal.scss';

const Modal = ({ hint1, hint2, hint3, attempt }) => {
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
        <h4>
          {attempt === 3 ? 'LAST HINT' : `Hint No. ${attempt}`}
        </h4>
        <br />
        <h5>Time Zone:</h5>
        <h2>{hint1}</h2>
        <br />
        {attempt >= 2 ? (
          <>
            <h5>Population:</h5>
            <h2>{hint2}</h2>
            <br />
          </>
        ) : (
          ''
        )}
        <br />
        {attempt >= 3 ? (
          <>
            <h5>Religious Demographic:</h5>
            {hint3.map((r, i) => <p key={i} className='demographic-text'>{r}</p>)}
            <br />
          </>
        ) : (
          ''
        )}
        <br />
        <button className="close-button" onClick={closeModal} type="button">
          close
        </button>
      </dialog>
    </div>
  );
};

export default Modal;
