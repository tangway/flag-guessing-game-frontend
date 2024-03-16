// working version where a higher order component (HOC) is used so that all
// individualized animation parameters can stay in the svg react components

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import { MagicMotion } from 'react-magic-motion';
import questions from './questions';
import mapOfFlags from './components/mapOfFlags';
import Modal from './components/Modal/Modal';
import './App.scss';

import AnimatedComponent from './components/AnimatedComponent';
// import StLuciaFlag from './components/st-lucia-svg';
// import SriLankaFlag from './components/sri-lanka-svg';
// import AngolaFlag from './components/angola-flag-svg';
// import AlgeriaFlag from './components/algeria-svg';
// import BelarusFlag from './components/belarus-flag-svg';
// import AlbaniaFlag from './components/albania-flag-svg';

// const AnimatedStLucia = AnimatedComponent(StLuciaFlag);
// const AnimatedSriLanka = AnimatedComponent(SriLankaFlag);
// const AnimatedAngola = AnimatedComponent(AngolaFlag);
// const AnimatedAlgeria = AnimatedComponent(AlgeriaFlag);
// const AnimatedBelarus = AnimatedComponent(BelarusFlag);
// const AnimatedAlbania = AnimatedComponent(AlbaniaFlag);

// const slideInVariants = {
//   hidden: { y: '-100vh', opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { type: 'spring', stiffness: 150, delay: 0.01 },
//   },
// };

// const initialLoadVariants = {
//   hidden: { scale: 3, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       // scale: { type: "inertia", velocity: 500 },
//       scale: { duration: 1.8, ease: 'easeInOut' },
//       // scale: { type: 'spring', stiffness: 500, damping: 30 },
//       opacity: { duration: 1.5, ease: 'easeInOut' },
//     },
//   },
// };

// // animate in from large, like dropping down
// const initialLoadVariants = {
//   hidden: {
//     transform: 'scale(10)',
//     opacity: 0,
//   },
//   visible: {
//     transform: 'scale(1)',
//     opacity: 1,
//     transition: {
//       transform: { duration: 1.8, ease: 'easeInOut' },
//       opacity: { duration: 1.5, ease: 'easeInOut' },
//     },
//   },
// };

// scale in animation
const initialLoadVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    // rotate: 60,
  },
  visible: {
    opacity: 1,
    scale: 1,
    // rotate: 0,
    transition: {
      duration: 2.5,
      ease: 'easeInOut',
    },
  },
};

// for animation when user clicks Next button but it is currently not working
// can be enabled with conditional rendering of variants
// const nextClickedVariants = {
//   hidden: { width: '0px', opacity: 0 },
//   visible: {
//     width: '200px',
//     opacity: 1,
//     transition: {
//       width: { duration: 1, ease: 'easeInOut' },
//       opacity: { duration: 1, ease: 'easeInOut' },
//     },
//   },
// };

// const buttonPopUpVariant = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//   },
// };

const MotionDiv = ({ className, children, variants }) => (
  <motion.div
    className={className}
    variants={variants}
    initial="hidden"
    animate="visible"
  >
    {children}
  </motion.div>
);

const SingleQuestion = () => {
  const [correct, setCorrect] = useState(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [selectionMade, setSelectionMade] = useState(false);

  const randomQuestionNumber = Math.floor(Math.random() * 5);
  const [currentQuestionNumber, setCurrentQuestionNumber] =
    useState(randomQuestionNumber);
  // const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(
    questions[currentQuestionNumber].answer,
  );
  const [score, setScore] = useState(0);
  const [nextClicked, setNextClicked] = useState(false);
  const [buttonsEmpty, setButtonsEmpty] = useState(false);
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [buttonClicked, setButtonClicked] = useState([]);
  const [correctButton, setCorrectButton] = useState(null);
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [playerFailed, setPlayerFailed] = useState(false);

  // const FlagComponent = AnimatedComponent(
  //   mapOfFlags[questions[currentQuestionNumber].answer],
  // );

  // const FlagComponent = React.memo(
  //   AnimatedComponent(mapOfFlags[questions[currentQuestionNumber].answer]),
  // );

  const FlagComponent = useMemo(
    () =>
      AnimatedComponent(mapOfFlags[questions[currentQuestionNumber].answer]),
    [currentQuestionNumber],
  );

  const shouldShowModal =
    numberOfAttempts > 0 && numberOfAttempts < 4 && correct === false;

  const nextButtonFunc = () => {
    if (currentQuestionNumber === questions.length - 1) {
      console.log('THE END');
    } else {
      setCorrect(null);
      setSelectionMade(false);
      setStartAnimation(false);
      setCurrentQuestionNumber(currentQuestionNumber + 1);
      setCorrectAnswer(questions[currentQuestionNumber + 1].answer);
      setNextClicked(true);
      setButtonsEmpty(true);
    }
  };

  const checkAnswer = event => {
    const target = event.currentTarget;

    if (!gameHasEnded) {
      target.disabled = true;
      setButtonClicked(buttonClicked.concat(target.id));
      setNumberOfAttempts(numberOfAttempts + 1);
    }

    if (target.textContent === correctAnswer) {
      // console.log(`in checkAnswer correct answer condition`)
      setCorrect(true);
      setGameHasEnded(true);
      setCorrectButton(target.id);
      setScore(score + 1);
      setStartAnimation(true);
    } else {
      setCorrect(false);
    }
  };

  // to animate the flag when all attempts fail
  useEffect(() => {
    if (gameHasEnded) {
      setStartAnimation(true);
      setPlayerFailed(true);
    }
  }, [gameHasEnded]);

  const showEndModalFunc = () => {
    setShowEndModal(true);
  };

  // useEffect(() => {
  //   setButtonsEmpty(false); // Reset buttonsEmpty when the question number changes
  // }, [currentQuestionNumber]);

  // this section is for animating the present emoji after game has ended
  const controls = useAnimation();

  // // simple version
  // useEffect(() => {
  //   if (numberOfAttempts === 4 || correct === true) {
  //     controls.start({
  //       // opacity: 1,
  //       scale: 1,
  //       transition: { duration: 1, ease: 'easeInOut', delay: 2.5 },
  //     });
  //   }
  // }, [numberOfAttempts, correct, controls]);

  useEffect(() => {
    if (numberOfAttempts === 4 || correct === true) {
      setGameHasEnded(true);

      // first part of animation
      // the timeout value has to be longer than the duration+delay in the first
      // part of animation otherwise the second part will override the first part
      controls.start({
        scale: 1,
        // x: [0, 0],
        // y: [0, 0],
        transition: { duration: 2.5, ease: 'easeInOut', delay: 5 },
      });

      // second part of animation
      setTimeout(() => {
        controls.start({
          // scale: [1, 0.9, 1.1, 1], // Shake scale values
          scale: [1, 0.8, 1],
          transition: {
            duration: 2.5,
            repeat: 'Infinity',
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        });
      }, 7600);
    }
  }, [numberOfAttempts, correct]);

  const renderStatusMessage = () => {
    if (correct) {
      return <h2 className="status-bar-correct">CORRRECT!!</h2>;
    }
    if (playerFailed) {
      return <h2 className="status-bar">It's {correctAnswer} 😢😢</h2>;
    }

    return <h2 className="status-bar">{4 - numberOfAttempts} attempts left</h2>;
  };

  return (
    <>
      <MotionDiv
        className="flag-area"
        key={currentQuestionNumber}
        variants={nextClicked ? '' : initialLoadVariants}
      >
        <FlagComponent startAnimation={startAnimation} />
      </MotionDiv>
      <div className="user-interface">
        <MotionDiv
          key={currentQuestionNumber}
          variants={nextClicked ? '' : initialLoadVariants}
        >
          {renderStatusMessage()}
        </MotionDiv>
        {/* <MotionDiv
          className="score"
          key={currentQuestionNumber}
          variants={nextClicked ? '' : initialLoadVariants}
        >
          Score: {score}/{questions.length}
        </MotionDiv> */}
        <br />
        <div className="choices">
          <AnimatePresence mode="wait">
            {questions[currentQuestionNumber].choices.map(choice => (
              <motion.button
                key={`${choice}-${currentQuestionNumber}`}
                type="button"
                className={`choice-button ${
                  buttonClicked.includes(choice) ? 'clicked' : ''
                } ${correctButton === choice ? 'correct-answer' : ''}`}
                id={`${choice}`}
                // onClick={() => checkAnswer(choice)}
                onClick={checkAnswer}
                // this disables all buttons when answer is correct or no more attempts left
                disabled={numberOfAttempts === 4 || correct ? true : false}
                initial={{ transform: 'scale(0)', opacity: 0 }}
                animate={{ transform: 'scale(1)', opacity: 1 }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
                exit={{
                  transform: 'scale(0)',
                  transition: { duration: 1.3, ease: 'easeInOut' },
                }}
                layout
              >
                <span className="choice-text">{choice}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        <div className="next-button-container">
          {/* <MotionDiv
            className="next"
            key={currentQuestionNumber}
            variants={nextClicked ? '' : initialLoadVariants}
          >
            <button
              type="button"
              className="next-button"
              onClick={nextButtonFunc}
            >
              Did you know?
            </button>
          </MotionDiv> */}
          <motion.p
            // className="next-button"
            // onClick={nextButtonFunc}
            onClick={showEndModalFunc}
            initial={{ scale: 0 }}
            animate={controls}
            style={{
              fontSize: '3rem',
            }}
          >
            🎁
          </motion.p>
          {/* <motion.button
            type="button"
            className="next-button"
            onClick={nextButtonFunc}
            initial={{ scale: 0 }}
            animate={controls}
          >
            Next
          </motion.button> */}
        </div>
        <br />
      </div>
      <AnimatePresence>
        {shouldShowModal &&
          (console.log(`state of correct at shouldShowModal: ${correct}`),
          (
            <Modal
              key={numberOfAttempts}
              attempt={numberOfAttempts}
              gameHasEnded={gameHasEnded}
              hints={questions[currentQuestionNumber]}
            />
          ))}
      </AnimatePresence>

      {/* {showEndModal && (
        <Modal
          gameHasEnded={gameHasEnded}
          hints={questions[currentQuestionNumber]}
        />
      )} */}
      {showEndModal && (
        <Modal
          showEndModal={showEndModal}
          setShowEndModal={setShowEndModal}
          gameHasEnded={gameHasEnded}
          hints={questions[currentQuestionNumber]}
        />
      )}
    </>
  );
};

export default SingleQuestion;
