import { motion } from 'framer-motion';
import { equalizerBarVariants } from './variants';

interface Props {
  playerState: 'playing' | 'paused' | 'loading';
}

const Equalizer = ({ playerState }: Props) => (
  <motion.div
    className='flex items-end gap-4 h-32 mb-10 mt-20'
    transition={{ staggerChildren: playerState === 'playing' ? 0.1 : 0 }}
    animate={playerState}
  >
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className='bg-primary-200 origin-bottom w-8 h-32'
        variants={equalizerBarVariants}
      />
    ))}
  </motion.div>
);

export default Equalizer;
