import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Modal.scss';

const modalVariants = {
  hidden: { y: '150%', opacity: 0, scale: 0 }, // Start from the bottom of the screen
  visible: { x: '-50%', y: '-50%', opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'backInOut' } }, // Slide to the center of the screen
  exit: { y: '150%', opacity: 0, scale: 0, transition: { duration: 0.8, ease: 'backInOut' } }, // Slide out to the bottom of the screen
};

const Modal = ({
  attempt,
  gameHasEnded,
  hints,
  showEndModal,
  setShowEndModal = () => {},
}) => {
  const hint1 = hints.timezone;
  const hint2 = hints.population;
  const hint3 = hints.demographic;
  const { funfact, links } = hints; // consider placing these in another key in the json

  const dialogRef = useRef(null);

  const closeModal = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  // triggers .showModal() on first mount
  useEffect(() => {
    if (dialogRef.current) dialogRef.current.showModal();
  }, []);

  // // triggers modal open/close state by clicking on the icon
  // useEffect(() => {
  //   if (dialogRef.current && showEndModal) dialogRef.current.showModal();
  //   else if (!showEndModal) dialogRef.current.close();
  // }, [showEndModal]);

  return (
    <div className="modal-container">
      <motion.dialog
        ref={dialogRef}
        className="modal"
        onClose={() => setShowEndModal(!showEndModal)}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.1 }}
      >
        {gameHasEnded ? (
          <>
            {/* <h5>Bit of Trivia: </h5> */}
            <h4>{funfact}</h4>
            <br />
            <h5>Links to Explore: </h5>
            {links.map((l, i) => (
              <ul key={i}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  ❥ {l.title}
                </a>
              </ul>
            ))}
          </>
        ) : (
          <>
            <h4>{attempt === 3 ? 'LAST HINT' : `Hint No. ${attempt}`}</h4>
            <br />
            {attempt >= 1 ? (
              <>
                <h5>Time Zone:</h5>
                <h2>{hint1}</h2>
              </>
            ) : (
              ''
            )}
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
                {hint3.map((r, i) => (
                  <p key={i} className="demographic-text">
                    {r}
                  </p>
                ))}
                <br />
              </>
            ) : (
              ''
            )}
          </>
        )}

        <br />
        <button className="close-button" onClick={closeModal} type="button">
          close
        </button>
      </motion.dialog>
    </div>
  );
};

const hintsShape = PropTypes.shape({
  demographic: PropTypes.arrayOf(PropTypes.string),
  funfact: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  population: PropTypes.string,
  timezone: PropTypes.string,
});

Modal.propTypes = {
  attempt: PropTypes.number,
  gameHasEnded: PropTypes.bool.isRequired,
  hints: hintsShape.isRequired,
  setShowEndModal: PropTypes.func,
  showEndModal: PropTypes.bool,
};

export default Modal;
