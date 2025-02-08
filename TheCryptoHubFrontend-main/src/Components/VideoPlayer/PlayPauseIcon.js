import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const PlayPauseIcon = ({ isPlaying }) => {
  return isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />;
};

export default PlayPauseIcon;