import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, AlertCircle } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const audioUrl =
    "https://www.dropbox.com/scl/fi/t526ezfu9tza0nn5de1zd/2XKO-OST-Ekko-Character-Theme-Mindscape-EVO-2024.mp3?dl=1";

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setHasError(true);
      }
    }
  };

  return (
    <div>
      <button onClick={togglePlay}>
        {isPlaying ? <Pause /> : <Play />}
      </button>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={() => {
          if (!audioRef.current) return;
          setProgress(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          );
        }}
      />
    </div>
  );
}
