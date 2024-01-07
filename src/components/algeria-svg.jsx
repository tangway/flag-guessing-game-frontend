import { motion } from 'framer-motion';

const AlgeriaFlag = ({ animate, initial, transition, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
    <motion.path
      fill="#fff"
      d="M0 0h900v600H0z"
      initial={initial}
      animate={animate}
      transition={transition}
    />
    <motion.path
      id="green"
      fill="#063"
      d="M0 0h450v600H0z"
      initial={initial}
      animate={animate}
      transition={transition}
    />
    <path
      id="red-static"
      fill="#d21034"
      d="M579.903811 225a150 150 0 1 0 0 150 120 120 0 1 1 0-150M585.676275 300 450 255.916106 533.852549 371.329239v-142.658277L450 344.083894z"
    />
  </svg>
);

export default AlgeriaFlag;
