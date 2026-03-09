import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const ScrollArrow = ({ onClick }) => (
  <motion.div
    className="scroll_arrow"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: [0, 8, 0] }}
    transition={{ y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }, opacity: { duration: 0.5 } }}
    whileHover={{ scale: 1.15 }}
    onClick={onClick}
    role="button"
    aria-label="Siguiente sección"
  >
    <FaChevronDown size={18} color="currentColor" style={{ color: 'var(--color-secondary-400)' }} />
  </motion.div>
);

export default ScrollArrow;