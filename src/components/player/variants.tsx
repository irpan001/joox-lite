import type { Variants } from 'framer-motion';

export const containerVariants: Variants = {
  playing: {
    background: '#1a1a1a',
    boxShadow: '0 0 50px rgba(139, 92, 246, 0.3)',
  },
  paused: {
    background: '#0f0f0f',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  loading: {
    background: '#0f0f0f',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  },
};

export const playButtonVariants: Variants = {
  playing: {
    backgroundColor: '#7C3AED',
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  paused: {
    backgroundColor: '#7C3AED',
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  loading: {
    backgroundColor: '#717680',
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export const albumArtworkVariants: Variants = {
  playing: {
    scale: 1,
    opacity: 1,
    rotate: 360,
    transition: {
      scale: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      rotate: { repeat: Infinity, duration: 20, ease: 'linear' },
    },
  },
  paused: {
    scale: 0.95,
    opacity: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  loading: {
    scale: 0.9,
    opacity: 0.5,
    rotate: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export const equalizerBarVariants: Variants = {
  playing: {
    scaleY: [0.2, 1, 0.2],
    opacity: 1,
    transition: {
      scaleY: {
        duration: 0.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      },
      opacity: { duration: 0.3 },
    },
  },
  paused: {
    scaleY: 0.2,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  loading: {
    scaleY: 0.5,
    opacity: 0.5,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const progressBarVariants: Variants = {
  playing: {
    backgroundColor: '#a872fa',
    transition: { duration: 0.3 },
  },
  paused: {
    backgroundColor: '#717680',
    transition: { duration: 0.3 },
  },
  loading: {
    backgroundColor: '#717680',
    transition: { duration: 0.3 },
  },
};
