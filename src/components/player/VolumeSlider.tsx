import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  volume: number;
  onChange: (val: number) => void;
}

const VolumeSlider = ({ volume, onChange }: Props) => (
  <div className='flex items-center gap-12'>
    <Volume2 className='w-20 h-20 text-neutral-400' />
    <div className='flex-1 relative group'>
      <div className='w-full h-4 bg-neutral-800 rounded-full overflow-hidden'>
        <motion.div
          className='h-full rounded-full bg-neutral-400 group-hover:bg-primary-200 transition-colors duration-200'
          style={{ width: `${volume}%` }}
        />
      </div>
      <input
        type='range'
        min='0'
        max='100'
        value={volume}
        onChange={(e) => onChange(Number(e.target.value))}
        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
      />
    </div>
  </div>
);

export default VolumeSlider;
