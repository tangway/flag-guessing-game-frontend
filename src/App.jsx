// working version where a higher order component (HOC) is used so that all
// individualized animation parameters can stay in the svg react components

import React, { useState } from 'react';
import questions from './questions';
import mapOfFlags from './components/mapOfFlags';

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

const App = () => {
  const [correct, setCorrect] = useState(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [selectionMade, setSelectionMade] = useState(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(
    questions[currentQuestionNumber].answer,
  );
  const [score, setScore] = useState(0);

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

  const getStatus = () => {
    if (correct === true) return 'CORRECT';
    if (correct === null) return 'MAKE A SELECTION';
    if (correct === false) return 'WRONG';
    return 'MAKE A SELECTION';
  };

  return (
    <>
      <div className="flag-area">
        <FlagComponent startAnimation={startAnimation} />
      </div>
      STATUS: {getStatus()}
      <div className="choices">
        <ul>
          {questions[currentQuestionNumber].choices.map(c => (
            <button
              key={c}
              type="button"
              className="select"
              onClick={() => checkAnswer(c)}
            >
              {c}
            </button>
          ))}
        </ul>
      </div>
      <div className="next">
        <button type="button" onClick={nextButtonFunc}>
          Next
        </button>
      </div>
      <div className="score">
        Score: {score}/{questions.length}
      </div>
    </>
  );
};

export default App;
