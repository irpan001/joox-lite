import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { playButtonVariants } from './variants';

interface Props {
  playerState: 'playing' | 'paused' | 'loading';
  onToggle: () => void;
  onBack: () => void;
  onForward: () => void;
}

const Controls = ({ playerState, onToggle, onBack, onForward }: Props) => (
  <div className='flex items-center justify-center gap-16 my-12'>
    <Shuffle className='w-20 h-20 text-neutral-400 hover:text-white cursor-pointer' />
    <SkipBack className='w-20 h-20 text-neutral-400 hover:text-white cursor-pointer' onClick={onBack} />

    <motion.button
      className='cursor-pointer w-56 h-56 rounded-full flex items-center justify-center text-white disabled:opacity-50'
      variants={playButtonVariants}
      animate={playerState}
      onClick={onToggle}
      disabled={playerState === 'loading'}
    >
      <AnimatePresence mode='wait'>
        {playerState === 'loading' ? (
          <motion.div
            key='loading'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-20 h-20 border-2 border-white border-t-transparent rounded-full animate-spin'
          />
        ) : playerState === 'playing' ? (
          <motion.div key='pause' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Pause className='w-20 h-20' />
          </motion.div>
        ) : (
          <motion.div key='play' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Play className='w-20 h-20 ml-4' />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>

    <SkipForward className='w-20 h-20 text-neutral-400 hover:text-white cursor-pointer' onClick={onForward} />
    <Repeat className='w-20 h-20 text-neutral-400 hover:text-white cursor-pointer' />
  </div>
);

export default Controls;
