import { useAnimation } from 'framer-motion';

const AnimatedComponent = Component => props => {
  const controls = useAnimation();

  const handleStartClick = async () => {
    await controls.start({
      opacity: 1,
    });
  };

  const handleResetClick = () => {
    controls.set({ opacity: 0 });
  };

  return (
    <>
      <Component
        {...props}
        animate={controls}
        initial={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <button type="button" onClick={handleStartClick}>
        Start Animation
      </button>
      <button type="button" onClick={handleResetClick}>
        Reset Animation
      </button>
    </>
  );
};

export default AnimatedComponent;
