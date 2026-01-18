
import React from 'react';
import { ACDMProfile } from '../types';
import { ChevronRight, FileText, Scan, Crosshair, Target } from 'lucide-react';

interface ProfileCardProps {
  profile: ACDMProfile;
  index: string;
  onViewDetails: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, index, onViewDetails }) => {
  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 p-8 rounded-sm hover:border-zinc-700 transition-all group relative overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Profile Image Section */}
        <div className="w-full lg:w-72 shrink-0 space-y-4">
          <div className="relative aspect-[3/4] bg-zinc-950 border border-zinc-800 overflow-hidden group/img">
            {/* UI Accents */}
            <div className="absolute top-2 left-2 z-20 text-orange-500 opacity-40 group-hover/img:opacity-100 transition-opacity">
              <Scan size={18} />
            </div>
            <div className="absolute bottom-2 right-2 z-20 text-orange-500 opacity-40 group-hover/img:opacity-100 transition-opacity">
              <Target size={18} />
            </div>
            
            {/* Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-600/30 shadow-[0_0_8px_rgba(249,115,22,0.5)] z-30 animate-scan pointer-events-none"></div>
            
            {/* Image Source */}
            {profile.imageUrl ? (
              <img 
                src={profile.imageUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover grayscale brightness-75 contrast-125 group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-800 font-mono text-[10px] bg-zinc-950">
                <Crosshair size={32} className="mb-2 opacity-20" />
                <span className="animate-pulse tracking-[0.2em]">SIGNAL LOST</span>
              </div>
            )}

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-orange-600/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-orange-600/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-orange-600/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-orange-600/30"></div>
            
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Metadata beneath image */}
          <div className="flex flex-col gap-1 font-mono text-[9px] text-zinc-600 uppercase">
            <div className="flex justify-between border-b border-zinc-900 pb-1">
              <span>Sensor Link</span>
              <span className="text-emerald-500">Connected</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1">
              <span>Visual ID</span>
              <span className="text-zinc-400">Match 99.8%</span>
            </div>
          </div>
        </div>

        {/* Profile Content Section */}
        <div className="flex-1">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-4xl font-bold text-orange-600 opacity-80">{index}</span>
            <h2 className="text-3xl font-bold text-zinc-100 uppercase tracking-tight">
              {profile.name} <span className="text-zinc-500 font-normal">({profile.codename})</span>
            </h2>
          </div>
          <div className="text-orange-500 text-sm font-bold mb-6 tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            사업가 / 시체 처리 기체
          </div>
          
          <p className="text-zinc-400 leading-relaxed mb-6 max-w-2xl text-sm lg:text-base">
            {profile.description}
          </p>
          
          <div className="italic border-l-2 border-orange-600 pl-4 py-1 text-zinc-500 mb-8 text-sm">
            "이 세상이 망하고도 아직 인류의 존속을 가능하게 한 가장 근본적인 원동력이 무엇인줄 압니까? 바로 돈입니다! "
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {profile.hardware.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono uppercase">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="pt-6 border-t border-zinc-900 flex items-center justify-between text-zinc-600 text-xs font-mono">
            <div className="flex items-center gap-2">
              <FileText size={14} />
              파일 ID: {profile.id}
            </div>
            <button 
              onClick={onViewDetails}
              className="group-hover:text-orange-500 transition-colors flex items-center gap-1 cursor-pointer uppercase font-bold tracking-widest outline-none"
            >
              상세 데이터 열람
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        
        {/* Right Corner Badge */}
        <div className="absolute top-8 right-8 hidden sm:block">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest ${
            profile.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-400'
          }`}>
            {profile.status}
          </span>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
};
