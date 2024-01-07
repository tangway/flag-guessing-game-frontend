// // first working code for importing a svg file
// import StLuciaFlag from './assets/sl.svg?react';

// function App() {
//   return <StLuciaFlag />;
// }

// export default App;

// // working version where the svg is made into a react component and imported
// // maybe work on this to manually refactor the animation parameters into the flag component
// import { useAnimation } from 'framer-motion';
// import StLuciaFlag from './components/st-lucia-svg';

// const App = () => {
//   const controls = useAnimation();

//   const handleStartClick = async () => {
//     await controls.start({
//       opacity: 1,
//       transition: { duration: 2 },
//     });
//   };

//   const handleResetClick = () => {
//     controls.set({ opacity: 0 });
//   };

//   return (
//     <>
//       <StLuciaFlag animate={controls} initial={{ opacity: 0 }} />
//       <button type="button" onClick={handleStartClick}>Start Animation</button>
//       <button type="button" onClick={handleResetClick}>Reset Animation</button>
//     </>
//   );
// };

// export default App;

// working version where a higher order component (HOC) is used so that all
// individualized animation parameters can stay in the svg react components
import AnimatedComponent from './components/AnimatedComponent';
import StLuciaFlag from './components/st-lucia-svg';
import SriLankaFlag from './components/sri-lanka-svg';
import AngolaFlag from './components/angola-flag-svg';
import AlgeriaFlag from './components/algeria-svg';
import BelarusFlag from './components/belarus-flag-svg';
import AlbaniaFlag from './components/albania-flag-svg';

const AnimatedStLucia = AnimatedComponent(StLuciaFlag);
const AnimatedSriLanka = AnimatedComponent(SriLankaFlag);
const AnimatedAngola = AnimatedComponent(AngolaFlag);
const AnimatedAlgeria = AnimatedComponent(AlgeriaFlag);
const AnimatedBelarus = AnimatedComponent(BelarusFlag);
const AnimatedAlbania = AnimatedComponent(AlbaniaFlag);

const App = () => (
  <>
    <AnimatedStLucia />
    <AnimatedAlgeria />
    <AnimatedAngola />
    <AnimatedSriLanka />
    <AnimatedBelarus />
    <AnimatedAlbania />
  </>
);

export default App;

// // version that is not working that has all animation parameters in the flag component
// import { useState } from 'react';
// import StLuciaFlag from './components/st-lucia-svg-withAnimation';

// function App() {
//   const [shouldAnimate, setShouldAnimate] = useState(false);

//   const handleStartClick = () => {
//     setShouldAnimate(true);
//   };

//   const handleResetClick = () => {
//     setShouldAnimate(false);
//   };

//   return (
//     <div>
//       <StLuciaFlag shouldAnimate={shouldAnimate} />
//       <button onClick={handleStartClick}>Start Animation</button>
//       <button onClick={handleResetClick}>Reset Animation</button>
//     </div>
//   );
// }

// export default App;
