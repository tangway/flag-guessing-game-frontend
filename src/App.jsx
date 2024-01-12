// working version where a higher order component (HOC) is used so that all
// individualized animation parameters can stay in the svg react components

import React, { useState, useEffect } from 'react';
import questions from './questions';
import mapOfFlags from './components/mapOfFlags';
// import { useAnimation } from 'framer-motion';

// import AnimatedComponent from './components/AnimatedComponent';
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
  const [correctAnswer, setCorrectAnswer] = useState(questions[0].answer);

  // const [startAnimation, setStartAnimation] = useState(false);

  const FlagComponent = mapOfFlags[questions[0].answer];

  const checkAnswer = userSelection => {
    if (userSelection === correctAnswer) {
      setCorrect(true);
      // setStartAnimation(true);
    } else {
      setCorrect(false);
    }
  };

  const getStatus = () => {
    if (correct === true) return 'CORRECT';
    if (correct === null) return 'MAKE SELECTION';
    if (correct === false) return 'WRONG';
    return 'MAKE SELECTION';
  };

  return (
    <>
      <div className="flag-area">
        <FlagComponent />
      </div>
      STATUS:
      {getStatus()}
      <div className="choices">
        <ul>
          {questions[0].choices.map(c => (
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
        <button type="button">Next</button>
      </div>
      <div className="score">Score: 0/5</div>
    </>
  );
};

export default App;
