// working version where a higher order component (HOC) is used so that all
// individualized animation parameters can stay in the svg react components

import React, { useState, useEffect } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { MagicMotion } from 'react-magic-motion';
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

const initialLoadVariants = {
  hidden: {
    transform: 'scale(10)',
    opacity: 0,
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      transform: { duration: 1.8, ease: 'easeInOut' },
      opacity: { duration: 1.5, ease: 'easeInOut' },
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

const App = () => {
  const [correct, setCorrect] = useState(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [selectionMade, setSelectionMade] = useState(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(
    questions[currentQuestionNumber].answer,
  );
  const [score, setScore] = useState(0);
  const [nextClicked, setNextClicked] = useState(false);
  const [buttonsEmpty, setButtonsEmpty] = useState(false);

  const FlagComponent = AnimatedComponent(
    mapOfFlags[questions[currentQuestionNumber].answer],
  );

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

  const checkAnswer = userSelection => {
    if (!selectionMade) {
      if (userSelection === correctAnswer) {
        setCorrect(true);
        setScore(score + 1);
      } else {
        setCorrect(false);
      }

      setSelectionMade(true);
      setStartAnimation(true);
    }
  };

  // const getStatus = () => {
  //   if (correct === true) return 'CORRECT';
  //   if (correct === null) return 'MAKE A SELECTION';
  //   if (correct === false) return 'WRONG';
  //   return 'MAKE A SELECTION';
  // };

  // useEffect(() => {
  //   setButtonsEmpty(false); // Reset buttonsEmpty when the question number changes
  // }, [currentQuestionNumber]);

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
        {/* <MotionDiv className="status">STATUS: {getStatus()}</MotionDiv> */}
        <br />
        <div className="choices">
          <AnimatePresence mode="wait">
            {questions[currentQuestionNumber].choices.map(choice => (
              <motion.button
                key={`${choice}-${currentQuestionNumber}`}
                type="button"
                className={`choice-button ${buttonsEmpty ? 'empty' : ''}`}
                onClick={() => checkAnswer(choice)}
                initial={{ transform: 'scale(0)', opacity: 0 }}
                animate={{ transform: 'scale(1)', opacity: 1 }}
                exit={{
                  transform: 'scale(0)',
                  transition: { duration: 1, ease: 'easeInOut' },
                }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                layout
              >
                <span className="choice-text">{choice}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        <div className="next-button-container">
          <MotionDiv
            className="next"
            key={currentQuestionNumber}
            variants={nextClicked ? '' : initialLoadVariants}
          >
            <button
              type="button"
              className="next-button"
              onClick={nextButtonFunc}
            >
              Next
            </button>
          </MotionDiv>
        </div>
        <br />
        <MotionDiv
          className="score"
          key={currentQuestionNumber}
          variants={nextClicked ? '' : initialLoadVariants}
        >
          Score: {score}/{questions.length}
        </MotionDiv>
      </div>
      {(correct === false) && <Modal hints={questions[currentQuestionNumber].timezone} />}
    </>
  );
};

export default App;
