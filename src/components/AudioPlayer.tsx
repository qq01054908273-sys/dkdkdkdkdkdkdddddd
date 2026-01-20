import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, AlertCircle } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const audioUrl =
    'https://www.dropbox.com/scl/fi/t526ezfu9tza0nn5de1zd/2XKO-OST-Ekko-Character-Theme-Mindscape-EVO-2024.mp3?dl=1';

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

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    if (duration) setProgress((currentTime / duration) * 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-zinc-900 border border-zinc-800 p-4 w-80 rounded">
        <button onClick={togglePlay} disabled={hasError}>
          {isPlaying ? <Pause /> : <Play />}
        </button>

        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        <div
          ref={progressRef}
          className="h-1 bg-zinc-800 mt-2"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
export default AudioPlayer;
