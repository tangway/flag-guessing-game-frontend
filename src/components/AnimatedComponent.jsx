import React, { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

// // version with start and reset animation buttons
// const AnimatedComponent = Component => props => {
//   const controls = useAnimation();

//   const handleStartClick = async () => {
//     await controls.start({
//       opacity: 1,
//     });
//   };

//   const handleResetClick = () => {
//     controls.set({ opacity: 0 });
//   };

//   return (
//     <>
//       <Component
//         {...props}
//         animate={controls}
//         initial={{ opacity: 0 }}
//         transition={{ duration: 2, ease: 'easeInOut' }}
//       />
//       <button type="button" onClick={handleStartClick}>
//         Start Animation
//       </button>
//       <button type="button" onClick={handleResetClick}>
//         Reset Animation
//       </button>
//     </>
//   );
// };

// export default AnimatedComponent;

// version without buttons and with useEffect triggered by startAnimation
const AnimatedComponent = Component => ({ startAnimation, ...props }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (startAnimation) {
      controls.start({
        opacity: 1,
      });
    } else {
      controls.set({
        opacity: 0,
      });
    }
  }, [startAnimation]);

  return (
    <Component
      {...props}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    />
  );
};

export default AnimatedComponent;
