// code is generated from phind w/o my checking it
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const StLuciaFlag = props => {
  const controls = useAnimation();

  useEffect(() => {
    if (props.shouldAnimate) {
      controls
        .start({
          opacity: 1,
          transition: { duration: 3 },
        })
        .then(() => {
          props.setShouldAnimate(false);
        });
    } else {
      controls.set({ opacity: 0 });
    }
  }, [props.shouldAnimate]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 6"
      initial={{ opacity: 0 }}
      animate={controls}
      {...props}
    >
      <title>{'Flag of Saint Lucia'}</title>
      <path id="cyan-bg" fill="#6cF" d="m0 0h12v6H0z" />
      <path fill="#fff" d="m6 .5279 2 4.9442L6 5l-2 .4721z" />
      <path d="m6 1.1946L7.5394 5H4.4606z" />
      <path fill="#fcd116" d="m6 3 2 2.4721H4z" />
    </motion.svg>
  );
};

export default StLuciaFlag;
