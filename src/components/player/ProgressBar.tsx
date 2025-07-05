import { motion } from 'framer-motion';
import { progressBarVariants } from './variants';

interface Props {
  progress: number;
  currentTime: number;
  duration: number;
  playerState: 'playing' | 'paused' | 'loading';
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  formatTime: (s: number) => string;
}

const ProgressBar = ({ progress, currentTime, duration, playerState, onSeek, formatTime }: Props) => (
  <div>
    <div
      className='w-full h-8 bg-neutral-800 rounded-full overflow-hidden mb-12 cursor-pointer'
      onClick={onSeek}
    >
      <motion.div
        className='h-full rounded-full'
        style={{ width: `${progress}%` }}
        variants={progressBarVariants}
        animate={playerState}
      />
    </div>

    <div className='flex justify-between text-xs text-neutral-400'>
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(duration)}</span>
    </div>
  </div>
);

export default ProgressBar;
