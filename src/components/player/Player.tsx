'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

import {
  containerVariants,
  albumArtworkVariants,
} from './variants';

import Equalizer from './Equalizer';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import VolumeSlider from './VolumeSlider';

type PlayerState = 'playing' | 'paused' | 'loading';

const Player = () => {
  const [playerState, setPlayerState] = useState<PlayerState>('paused');
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // === LOGIC ===
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    setPlayerState('loading');

    if (playerState === 'playing') {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleSkipBack = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setProgress(0);
    setPlayerState('paused');
    audioRef.current.pause();
  };

  const handleSkipForward = () => {
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = duration;
    setCurrentTime(duration);
    setProgress(100);
    setPlayerState('paused');
    audioRef.current.pause();
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percent * 100);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // === EVENT HANDLERS ===
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(duration ? (audio.currentTime / duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onPlay = () => setPlayerState('playing');
    const onPause = () => setPlayerState('paused');
    const onEnded = () => {
      setPlayerState('paused');
      setCurrentTime(duration);
      setProgress(100);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, [duration]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  // === UI ===
  return (
    <motion.div
      className='sm:w-500 sm:h-350 rounded-2xl p-24 relative overflow-hidden'
      animate={
        containerVariants[playerState] as {
          background: string;
          boxShadow: string;
        }
      }
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Artwork + Title + Equalizer */}
      <div className='flex items-start gap-16 mb-12'>
        <motion.div
          className='w-80 h-80 sm:w-120 sm:h-120 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center overflow-hidden'
          variants={albumArtworkVariants}
          animate={playerState}
        >
          <Music className='w-[48px] h-[60px] text-[#252B37]' />
        </motion.div>

        <div className='flex-1 pt-8'>
          <h2 className='text-sm sm:text-lg font-semibold text-white sm:mb-4 sm:mt-20'>Joox Lite</h2>
          <p className='text-xs sm:text-sm text-neutral-400'>DJ Brody</p>

          <Equalizer playerState={playerState} />
        </div>
      </div>

      {/* Progress */}
      <ProgressBar
        playerState={playerState}
        progress={progress}
        duration={duration}
        currentTime={currentTime}
        onSeek={handleProgressBarClick}
        formatTime={formatTime}
      />

      {/* Controls */}
      <Controls
        playerState={playerState}
        onToggle={togglePlayPause}
        onBack={handleSkipBack}
        onForward={handleSkipForward}
      />

      {/* Volume */}
      <VolumeSlider volume={volume} onChange={setVolume} />

      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        preload='auto'
        style={{ display: 'none' }}
      />
    </motion.div>
  );
};

export default Player;
