import React, { useRef, useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import '../css/BackgroundPlayer.css';

const BackgroundPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.audio.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!isPlaying) {
        handlePlay();
      }
    };

    document.addEventListener('click', handleUserInteraction);
    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [isPlaying]);

  return (
    <div className="audio-player-container">
      <AudioPlayer
        ref={audioRef}
        src="/background-music.mp3"
      />
    </div>
  );
};

export default BackgroundPlayer;