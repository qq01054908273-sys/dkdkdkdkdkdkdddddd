
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, AlertCircle } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  /**
   * [오류 해결] Dropbox 링크는 dl=1 파라미터가 있어야 직접 오디오 데이터를 반환합니다.
   * dl=0은 웹 페이지 프리뷰를 반환하므로 오디오 태그에서 재생이 불가능합니다.
   */
  const audioUrl = "https://www.dropbox.com/scl/fi/t526ezfu9tza0nn5de1zd/2XKO-OST-Ekko-Character-Theme-Mindscape-EVO-2024.mp3?rlkey=zaydr6s2572aq10pa910qcb23&st=ow4i3zmy&dl=1";

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      if (playPromiseRef.current !== null) {
        try {
          await playPromiseRef.current;
        } catch (error) {
          // Play was interrupted
        }
      }
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setHasError(false);
        // 브라우저 보안 정책상 사용자 클릭 후 재생이 가능합니다.
        playPromiseRef.current = audioRef.current.play();
        setIsPlaying(true);
        await playPromiseRef.current;
      } catch (error) {
        console.error("Playback failed:", error);
        setIsPlaying(false);
        setHasError(true);
      } finally {
        playPromiseRef.current = null;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current && audioRef.current.duration) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(0, Math.min(1, x / width));
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  const handleAudioError = () => {
    console.error("Audio element reported an error. The source URL may be invalid or blocked.");
    setHasError(true);
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in group">
      <div className={`bg-[#121212]/90 backdrop-blur-sm border ${hasError ? 'border-red-900/50' : 'border-zinc-800'} rounded-lg p-4 w-80 shadow-2xl glow-orange flex flex-col gap-3 transition-all hover:border-orange-900/40`}>
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2 text-[10px] text-orange-500 font-bold uppercase tracking-widest">
            <div className={`w-1.5 h-1.5 rounded-full ${hasError ? 'bg-red-600' : 'bg-orange-500'} ${isPlaying ? 'animate-pulse' : ''}`} />
            {hasError ? 'SYSTEM ERROR // LINK INVALID' : 'ECLIPSE AUDIO // SECURE LINK'}
          </div>
          {hasError && <AlertCircle size={12} className="text-red-600 animate-pulse" />}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={togglePlay}
            disabled={hasError}
            className={`w-12 h-12 ${hasError ? 'bg-zinc-800 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500'} rounded-md flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(234,88,12,0.3)]`}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause size={20} className="fill-white" /> : <Play size={20} className="fill-white" />}
          </button>
          
          <div className="flex flex-col overflow-hidden flex-1">
            <span className={`text-sm font-bold truncate tracking-tight ${hasError ? 'text-zinc-600' : 'text-white'}`}>
              {hasError ? 'Invalid Audio Source' : 'Altars of Apostasy'}
            </span>
            <span className="text-zinc-500 text-[10px] font-mono uppercase truncate opacity-70">
              {hasError ? 'Check URL Permissions' : (isPlaying ? 'Now Decrypting...' : 'Signal Standby')}
            </span>
          </div>
          
          <div className="flex flex-col items-end gap-1 opacity-40">
            <Volume2 size={12} className="text-zinc-500" />
            <span className="text-[8px] font-mono text-zinc-600">PCM</span>
          </div>
        </div>
        
        {/* HTML Audio Element */}
        <audio 
          ref={audioRef}
          preload="auto"
          loop 
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onError={handleAudioError}
          src={audioUrl}
        >
          브라우저가 오디오 재생을 지원하지 않습니다.
        </audio>
        
        {/* Progress Bar Container */}
        <div className="space-y-1.5">
          <div 
            ref={progressRef}
            onClick={!hasError ? handleSeek : undefined}
            className={`h-1.5 ${hasError ? 'bg-zinc-950' : 'bg-zinc-900'} rounded-full overflow-hidden cursor-pointer relative group/bar`}
          >
            <div className="absolute inset-0 bg-zinc-800/30"></div>
            <div 
              className={`h-full ${hasError ? 'bg-zinc-800' : 'bg-orange-600'} relative transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(249,115,22,0.6)]`} 
              style={{ width: `${progress}%` }}
            >
              {!hasError && <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40 blur-[1px]"></div>}
            </div>
          </div>
          
          <div className="flex justify-between font-mono text-[8px] text-zinc-700 uppercase tracking-tighter">
            <span>Progress: {Math.round(progress)}%</span>
            <span>Channel: V.04</span>
          </div>
        </div>
      </div>
    </div>
  );
};
