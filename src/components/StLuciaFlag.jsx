import { motion } from 'framer-motion';

const StLuciaFlag = ({ animate, initial, transition, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 6" {...props}>
    <title>Flag of Saint Lucia</title>
    <motion.path
      id="cyan-bg"
      fill="#6cF"
      d="m0 0h12v6H0z"
      initial={initial}
      animate={animate}
      transition={transition}
    />
    <path
      id="white-triangle"
      fill="#fff"
      d="m6 .5279 2 4.9442L6 5l-2 .4721z"
    />
    <path
      id="black-triangle"
      d="m6 1.1946L7.5394 5H4.4606z"
    />
    <path
      id="yellow-triangle"
      fill="#fcd116"
      d="m6 3 2 2.4721H4z"
    />
  </svg>
);

export default StLuciaFlag;
