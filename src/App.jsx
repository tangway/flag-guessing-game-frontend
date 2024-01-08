// working version where a higher order component (HOC) is used so that all
// individualized animation parameters can stay in the svg react components

// import AnimatedComponent from './components/AnimatedComponent';
// import StLuciaFlag from './components/st-lucia-svg';
// import SriLankaFlag from './components/sri-lanka-svg';
// import AngolaFlag from './components/angola-flag-svg';
// import AlgeriaFlag from './components/algeria-svg';
// import BelarusFlag from './components/belarus-flag-svg';
// import AlbaniaFlag from './components/albania-flag-svg';
import questions from './questions';
import mapOfFlags from './components/mapOfFlags';

// const AnimatedStLucia = AnimatedComponent(StLuciaFlag);
// const AnimatedSriLanka = AnimatedComponent(SriLankaFlag);
// const AnimatedAngola = AnimatedComponent(AngolaFlag);
// const AnimatedAlgeria = AnimatedComponent(AlgeriaFlag);
// const AnimatedBelarus = AnimatedComponent(BelarusFlag);
// const AnimatedAlbania = AnimatedComponent(AlbaniaFlag);

const App = () => {
  const FlagComponent = mapOfFlags[questions[0].answer];

  const checkAnswer = userSelection => {
    if (userSelection === questions[0].answer) {
      console.log(`CORRECT`);
    } else {
      console.log(`WRONG`);
    }
  };
  return (
    <>
      <div className="flag-area">
        <FlagComponent />
      </div>
      <div className="choices">
        <ul>
          {questions[0].choices.map(c => (
            <button key={c} type="button" onClick={() => checkAnswer(c)}>
              {c}
            </button>
          ))}
        </ul>
      </div>
      <div className="next">
        <button type="submit">Next</button>
      </div>
      <div className="s">0/5 correct</div>
    </>
  );
};

export default App;
