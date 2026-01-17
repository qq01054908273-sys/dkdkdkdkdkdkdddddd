
import React, { useState } from 'react';
import { AppSection, ACDMProfile } from './types';
import { AudioPlayer } from './components/AudioPlayer';
import { ProfileCard } from './components/ProfileCard';
import { Terminal, Shield, Globe, HardDrive, Info, AlertTriangle, Lock, Unlock, Eye, EyeOff, Database, X, User, Activity, Zap, Cpu, Scan, Target, Camera, Sword, Flame, Scissors, Boxes, Binary, Radio, Crosshair, ZapOff, Layers, ChevronRight, Frame } from 'lucide-react';

const ACDM_DATA: ACDMProfile = {
  id: 'ACDM-s-a3-2636',
  name: 'ACDM',
  codename: 'Phil Resh',
  status: 'ACTIVE',
  imageUrl: 'https://i.postimg.cc/gc58LFhV/Kakao-Talk-20260111-195235377.jpg',
  specs: {
    height: '247.24cm',
    weight: '453.28kg',
    gender: '남성(외형)',
    age: '38(추정)',
    nationality: '독일',
    birth: '2599.2.8',
    maxSpeed: '45km/h'
  },
  hardware: [
    '6족 보행',
    '두뇌 기반 인식 시스템',
    'H.265/AV1 지원',
    '7075 알루미늄 합금',
    '전압: 402V',
    'ISS 52.0 추종 시스템'
  ],
  description: '전 세계 동시 다발적으로 발생한 에러코드 사태로 인해 생긴 지상의 사체를 처리하기 위해 만들어진 기체입니다. 지상은 피와 오물로 가득 찼으며, 이로 인한 추가적인 피해를 막기 위해 프랑스 당국은 유기물 전환 모듈을 탑재한 ACDM 모델을 양산하였습니다. 이후, 그 쓸모를 다한 모델은 폐기처분이 되었지만 생존한 몇몇 모델은 스스로를 개조하여 두번째 삶을 살고 있습니다.',
  classifiedData: {
    originalName: '필 레쉬 (Phil Resh)',
    originalOccupation: '[접근권한이 부족합니다]',
    conversionDate: '2635.04.12',
    psychologicalStability: '보통 (42%)',
    hiddenNotes: '신체 손상-하반신(78%) 직업-(접근권한이 부족합니다) 등 기타 40 사항을 종합하여 해당 개체를 ACDM으로 개조하는것을 승인함.',
    originalImageUrl: 'https://i.postimg.cc/rs9xwtQm/Kakao-Talk-20260116-141105450.png'
  }
};

const WEAPONS_DATA = [
  {
    id: 'WPN-01',
    name: 'RAIL-08 "딱총새우"',
    type: '레일건',
    description: '검은색과 흰색이 인상적인 총검 형태의 레일건입니다, 다만만 일반적인 무기가 아닌 칩이 이식된 모델입니다',
    extendedDescription: '이 모델은 칩을 이식받은 모델로, 칼날에 칩이 이식되어있습니다,        이식된 생물 모델은 딱총새우(Alpheus cf splendidus)이며, 그에 맞게 느리지만 순간 강력한 일격을 자랑하는 모델입니다, 특징으론 사격,근접 공격이 가능하여 근접 공격시 딱총새우 칩의 기능으로 순간 강력한 타격을 가하여 가속을을 극대화시킵니다',
    specs: { length: '1.5m', power: 'High (A-Tier)', energy: '10~45kW/min', durability: '94%' },
    imageUrl: 'https://i.postimg.cc/JhrdfqyK/Kakao-Talk-20260116-195840954-01.png',
    tags: ['RAILGUN', 'HIGH OUTPUT', 'BLOW']
  },
  {
    id: 'WPN-AT',
    name: 'PT-44-CHIP_Snapping shrimp',
    type: '열지향성 소멸',
    description: '딱총새우의 순간적인 강력한 일격을 자랑하는 기술입니다.',
    extendedDescription: 'PT-44는 플라즈마 입자를 칼날 끝에 모은 후, 레일건을 휘둘러 격발하는 방식으로 작동하는 공격 수단입니다. 휘두룰시 순간 강력한 타격을 가하는 딱총새우 칩의 기능을 응용하여, 불안정적으로 모인 플라즈마를 한번에 터트려 강력한 일격을 가합니다, 다만 충전에 시간이 걸리고 소모 전력이 많아 그다지 자주 사용은 불가능합니다.',
    specs: { range: '2.5km', power: 'HIGH (S-Tier)', energy: '1220kW/pulse', durability: '88%' },
    imageUrl: 'https://i.postimg.cc/7ZVKn2B9/Kakao-Talk-20260116-195840954.png',
    tags: ['THERMAL', 'PLASMA', 'LONG-RANGE']
  }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.OVERVIEW);
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedProfileDetails, setSelectedProfileDetails] = useState<ACDMProfile | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<typeof WEAPONS_DATA[0] | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (val.toUpperCase() === 'FISH') {
      setIsUnlocked(true);
    }
  };

  const navItems = [
    { id: AppSection.OVERVIEW, label: '개요' },
    { id: AppSection.MODEL, label: '모델' },
    { id: AppSection.WORLDVIEW, label: '관련 정보' },
    { id: AppSection.ARCHIVE, label: '아카이브' }
  ];

  const handleNavClick = (sectionId: AppSection) => {
    if (!isUnlocked && sectionId !== AppSection.OVERVIEW) {
      return;
    }
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-orange-900 selection:text-orange-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-600 rounded-sm flex items-center justify-center font-bold text-black text-xl">
            A
          </div>
          <h1 className="text-xl font-bold tracking-[0.1em] text-white">ACDM-세부기록</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navItems.map((item) => {
            const isLocked = !isUnlocked && item.id !== AppSection.OVERVIEW;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                disabled={isLocked}
                className={`relative py-2 text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeSection === item.id 
                    ? 'text-orange-500' 
                    : isLocked 
                      ? 'text-zinc-800 cursor-not-allowed opacity-50' 
                      : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {isLocked && <Lock size={12} className="text-zinc-800" />}
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 animate-scale-x" />
                )}
              </button>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-mono">
          <div className={`w-1.5 h-1.5 rounded-full ${isUnlocked ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
          {isUnlocked ? 'ENCRYPTED CHANNEL OPEN' : 'RESTRICTED ACCESS'}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {activeSection === AppSection.OVERVIEW && (
          <div className="animate-fade-in">
            {!isUnlocked ? (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                  <Lock className="text-zinc-800" size={80} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AlertTriangle className="text-orange-600 animate-pulse" size={24} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-zinc-200 tracking-widest uppercase">Security Authentication Required</h3>
                  <p className="text-zinc-500 text-sm font-mono">ACDM Project: Classified Document Level 5</p>
                </div>

                <div className="w-full max-w-xs relative group">
                  <div className="absolute -inset-0.5 bg-orange-600/20 rounded-sm blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative flex items-center bg-[#0a0a0a] border border-zinc-800 rounded-sm overflow-hidden">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="ACCESS KEY"
                      className="w-full bg-transparent px-4 py-3 text-white font-mono outline-none placeholder:text-zinc-700"
                      autoFocus
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-3 text-zinc-600 hover:text-orange-500 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <p className="text-zinc-700 text-[10px] font-mono animate-pulse uppercase tracking-[0.3em]">
                  Enter "FISH" to unlock archive
                </p>
              </div>
            ) : (
              <div className="space-y-12 animate-in fade-in duration-1000">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-8">
                  <div className="flex items-center gap-4">
                    <Unlock className="text-emerald-500" size={32} />
                    <h2 className="text-4xl font-bold text-white tracking-tight">프로젝트 기밀 개요</h2>
                  </div>
                  <div className="text-right font-mono text-[10px] text-zinc-500">
                    DECRYPTED: {new Date().toLocaleTimeString()}<br />
                    AUTH: ACDM-ROOT-ADMIN
                  </div>
                </div>

                {/* Identity Comparison Gallery */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative h-80 bg-zinc-950 border border-zinc-800 group overflow-hidden">
                    <img 
                      src={ACDM_DATA.classifiedData?.originalImageUrl} 
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 contrast-125"
                      alt="Subject 01 Human"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex flex-col">
                      <span className="text-orange-500 font-mono text-[10px] uppercase tracking-widest">Subject: Original</span>
                      <span className="text-white font-bold tracking-tighter uppercase">{ACDM_DATA.classifiedData?.originalName}</span>
                    </div>
                    <div className="absolute top-2 right-2 p-1 bg-black/50 border border-zinc-800">
                      <Camera size={12} className="text-zinc-500" />
                    </div>
                  </div>
                  
                  <div className="relative h-80 bg-zinc-950 border border-zinc-800 group overflow-hidden">
                    <img 
                      src={ACDM_DATA.imageUrl} 
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 contrast-125"
                      alt="Unit 01 Machine"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex flex-col">
                      <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-widest">Subject: Modified</span>
                      <span className="text-white font-bold tracking-tighter uppercase">{ACDM_DATA.codename} / Unit-01</span>
                    </div>
                    <div className="absolute top-2 right-2 p-1 bg-black/50 border border-zinc-800">
                      <Target size={12} className="text-zinc-500" />
                    </div>
                    <div className="absolute inset-0 border border-orange-600/10 pointer-events-none"></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-8">
                    <section className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-sm">
                      <h4 className="text-orange-500 font-bold mb-4 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                        <Database size={14} /> ACDM 시스템 기원
                      </h4>
                      <div className="text-zinc-400 space-y-4 leading-relaxed">
                        <p>
                          ACDM(Automatic Corpus Disposal Machine)은 물자 운송용 드론과 인간의 육체를 융합한 시체 처리 기계입니다. 
                          이들은 시체를 자신의 내부로 넣어 갈아버린 후, 녹여 연료로 재활용합니다. 다만 시체만이 아닌 살아있는 생물도 연료로 전환이 가능합니다.
                        </p>
                        <p>
                          정부는 비용 절감을 위해 생체 뇌를 기계 장치와 직결하는 '뉴럴 브릿지' 기술을 도입했습니다. 
                          또한 뇌를 정상적으로 작동시키기 위하여 심장,혈관,두뇌,신경계를 제외한 대부분의 신체 구성 요소를 제거하여 기계와 융합시키고.
                          부품이 부족한 부위는 시체의 일부분을 적출한 후, 이식하였습니다.
                        </p>
                      </div>
                    </section>

                    <section className="grid grid-cols-2 gap-4">
                      <div className="border border-zinc-800 p-6 bg-zinc-950/50">
                        <span className="block text-zinc-600 text-[10px] uppercase mb-1">Project Code</span>
                        <span className="text-zinc-200 font-mono font-bold">SILENT_VOX</span>
                      </div>
                      <div className="border border-zinc-800 p-6 bg-zinc-950/50">
                        <span className="block text text-zinc-600 text-[10px] uppercase mb-1">Status</span>
                        <span className="text-emerald-500 font-mono font-bold">OPERATIONAL</span>
                      </div>
                    </section>
                  </div>

                  <aside className="space-y-6">
                    <div className="border border-orange-900/30 bg-orange-950/5 p-6 rounded-sm">
                      <h5 className="text-orange-600 font-bold text-xs uppercase mb-4 tracking-widest">주의사항</h5>
                      <p className="text-zinc-500 text-xs leading-loose">
                        본 문서는 1급 기밀로 분류됩니다. 허가되지 않은 복제나 공유는 연방 보안법에 따라 즉시 처벌 대상이 됩니다. 
                        기체의 유기물 전환 효율이 85% 미만으로 떨어질 경우 즉시 재교정 센터로 입고시키십시오.
                      </p>
                    </div>
                    
                    <div className="p-4 border border-zinc-800 font-mono text-[9px] text-zinc-600">
                      <div className="flex justify-between">
                        <span>CPU Load</span>
                        <span>4.2%</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-1 mt-1">
                        <div className="bg-orange-600 h-full w-[4%]"></div>
                      </div>
                      <div className="flex justify-between mt-3">
                        <span>Organic Fuel</span>
                        <span>92.8%</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-1 mt-1">
                        <div className="bg-emerald-600 h-full w-[92%]"></div>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            )}
          </div>
        )}

        {isUnlocked && activeSection === AppSection.MODEL && (
          <div className="space-y-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
              <Terminal className="text-orange-600" size={32} />
              <h2 className="text-4xl font-bold text-white tracking-tight">모델 프로파일</h2>
            </div>
            
            <ProfileCard profile={ACDM_DATA} index="01" onViewDetails={() => setSelectedProfileDetails(ACDM_DATA)} />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#0a0a0a] border border-zinc-900 p-8 rounded-sm">
                <div className="flex items-center gap-3 mb-6 text-orange-500 font-bold uppercase text-xs tracking-widest">
                  <Shield size={16} /> 하드웨어 상세 스펙
                </div>
                <ul className="space-y-4 font-mono text-sm text-zinc-400">
                  <li className="flex justify-between border-b border-zinc-900 pb-2">
                    <span>신장 / 체중</span>
                    <span className="text-zinc-200">{ACDM_DATA.specs.height} / {ACDM_DATA.specs.weight}</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-900 pb-2">
                    <span>모델 연식</span>
                    <span className="text-zinc-200">생년월일: {ACDM_DATA.specs.birth}</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-900 pb-2">
                    <span>최대 속력</span>
                    <span className="text-zinc-200">{ACDM_DATA.specs.maxSpeed}</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-900 pb-2">
                    <span>주 연료</span>
                    <span className="text-zinc-200">전기, 유기물, 사체</span>
                  </li>
                  <li className="flex justify-between border-b border-zinc-900 pb-2">
                    <span>재질</span>
                    <span className="text-zinc-200">알루미늄/티타늄 합금</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#0a0a0a] border border-zinc-900 p-8 rounded-sm">
                <div className="flex items-center gap-3 mb-6 text-orange-500 font-bold uppercase text-xs tracking-widest">
                  <Globe size={16} /> 오퍼레이션 히스토리
                </div>
                <div className="space-y-4 text-sm text-zinc-500 leading-relaxed">
                  <p>
                    <span className="text-zinc-300 font-bold">[생존한 개체]</span><br />
                    폐기처분 도중, 필 레시는 파괴당한 동일 개체 사이에 숨어 처분을 피하였습니다. 
                    이후, 프랑스를 떠나 정착할 곳을 찾아 긴 여정을 떠났습니다.
                    이후 한국의 지하벙커를 발견하고는 그곳에 자리를 잡아 정착하였습니다.
                  </p>
                  <p>
                    <span className="text-zinc-300 font-bold">[필 레시]</span><br />
                    정착 초기, 가진것이 없고 흉측하게 생긴 필 레시에게 우호적인 사람은 없었지만. 
                    각종 막노동을 하고, 그렇게 얻은 인맥으로 자신을 개조하여 지금의 모습이 되었습니다.
                    그나마 순해진 외모와 평소 행실 덕분에 이젠 그를 받아들인 사람도 많습니다.
                    다만 막노동 시절 PTSD가 심하여 돈에 굉장히 집착하는 면모를 보입니다.
                    이후, 각종 사업을 하던 도중 생체오류진압사령단 모집 공고를 보고는 돈 냄새를 맡아 지원하였습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isUnlocked && activeSection === AppSection.WORLDVIEW && (
          <div className="space-y-12 max-w-4xl animate-fade-in">
            <div className="border-l-4 border-orange-600 pl-6 space-y-2">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">에러코드 사태-F-day49 AF</h2>
              <p className="text-orange-500 font-mono text-[10px] tracking-[0.5em] uppercase opacity-70">Event Log: Urban Decay & Biological Hazard</p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-10 items-start">
              <div className="md:col-span-3 space-y-6 text-zinc-400 leading-relaxed text-lg font-light">
                <p>
                  에러코드 참사 - 프랑스 이후, 지상은 폐허와 노이즈, 그리고 수많은 사체들로 가득 채워졌습니다. 
                  부패하는 사체들이 만들어내는 오물과 악취는 지하의 벙커까지 잠식하기 시작하였고, 얼마안가 하수도까지 영향을 끼쳐 식수 오염 등 갖가지 문제가 발생하였습니다.
                </p>
                <div className="bg-zinc-900/30 p-6 border border-zinc-800 rounded flex gap-4 items-start relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-orange-600/20 group-hover:bg-orange-600/50 transition-colors"></div>
                  <AlertTriangle className="text-orange-600 shrink-0" size={20} />
                  <p className="text-sm">
                    벙커의 지도자들은 인간을 이용해 직접 사체를 처리하려 했으나, 인건비와 오염 문제로 인해 기계를 통한 대량 처리를 결정했다. 
                    하지만 초기 생산된 기계들은 생산 단가가 너무 높았고, 결국 그들은 '가장 저렴한 자원'인 인간의 뇌를 CPU로 사용하기 시작했다.
                  </p>
                </div>
                <p>
                  이 거인들은 파괴된 첨탑이 되어, 인류가 스스로의 손으로 타락에 얼마나 가까이 다가갔는지를 고스란히 상기시키는 비망록이 될 것이다.
                </p>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-orange-600/10 blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative bg-zinc-950 border border-zinc-800 p-1">
                    <img 
                      src="https://i.postimg.cc/mg1jx9kb/Kakao-Talk-20260111-195235377-03.jpg" 
                      alt="Dystopian Ruins" 
                      className="w-full grayscale opacity-60 contrast-125 brightness-75 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 p-1.5 bg-black/80 border border-zinc-800">
                      <Frame size={14} className="text-orange-500" />
                    </div>
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-600/40"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-600/40"></div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 p-4 bg-zinc-900/10 border-l border-zinc-800">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500 font-mono tracking-widest uppercase">
                    <Target size={12} /> Visual Record #402-A
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-tight font-mono">
                    <span className="text-zinc-300">[ACDM-09 수렵]</span> 초기 ACDM-9 수렵 모델. 
                    타 시체로 얻은 부위를 기계와 융합시킨 형태, 인간의 다리와 얼굴,입을 사용한 모델이다. 
                    얊은 팔로 섬세한 동작을, 거대한 팔로 단순한 작업을.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isUnlocked && activeSection === AppSection.ARCHIVE && (
          <div className="space-y-20 animate-fade-in pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-900 pb-10">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-orange-600/10 rounded-sm border border-orange-600/30">
                  <Boxes className="text-orange-600" size={40} />
                </div>
                <div>
                  <h2 className="text-5xl font-bold text-white tracking-tighter uppercase mb-1">Weaponry Archive</h2>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">Tactical Equipment & Modified Armaments</p>
                </div>
              </div>
              <div className="text-right font-mono text-[10px] text-zinc-600 bg-zinc-900/30 p-3 border border-zinc-800">
                <span className="text-orange-500">SYSTEM:</span> ARMORY_V5.1_ENHANCED<br />
                <span className="text-orange-500">REG:</span> SECURE_FACILITY_77
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {WEAPONS_DATA.map((wpn, idx) => (
                <div 
                  key={wpn.id} 
                  onClick={() => setSelectedWeapon(wpn)}
                  className="group relative bg-[#080808] border border-zinc-800 rounded-sm overflow-hidden flex flex-col hover:border-orange-600/50 transition-all duration-500 cursor-pointer shadow-2xl"
                >
                  <div className="w-full aspect-video overflow-hidden relative">
                    <img 
                      src={wpn.imageUrl} 
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                      alt={wpn.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 bg-black/80 border border-orange-600/40 backdrop-blur-md flex items-center gap-2">
                        <Binary className="text-orange-500" size={12} />
                        <span className="text-white font-mono text-[9px] tracking-widest">{wpn.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">{wpn.type}</span>
                      <ChevronRight size={14} className="text-zinc-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tighter uppercase group-hover:text-orange-500 transition-colors">{wpn.name}</h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
                      {wpn.description}
                    </p>
                    <div className="pt-4 flex gap-4 border-t border-zinc-900">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-600 uppercase font-mono">Range</span>
                        <span className="text-zinc-200 font-bold text-xs">{wpn.specs.range}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-zinc-600 uppercase font-mono">Power</span>
                        <span className="text-orange-500 font-bold text-xs">{wpn.specs.power}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative p-1 border border-zinc-800 bg-[#0a0a0a] overflow-hidden group">
              <div className="absolute inset-0 bg-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-12 border border-zinc-900 bg-zinc-950 flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                   <AlertTriangle className="text-orange-600" size={60} />
                   <div className="absolute inset-0 animate-ping opacity-20"><AlertTriangle className="text-orange-600" size={60} /></div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-3xl font-bold text-white uppercase tracking-tighter">하드웨어 무단 개조 및 병기화 금지 경고</h4>
                  <p className="text-zinc-500 text-sm max-w-2xl mx-auto leading-relaxed">
                    ACDM-01 시리즈에 장착된 모든 해체 장비는 당국의 승인 하에 관리되어야 합니다. <br />
                    승인되지 않은 중력장 장치나 플라즈마 증폭기 사용 시 즉각적인 원격 셧다운 절차가 가동됩니다.
                  </p>
                </div>
                <button className="px-10 py-3 bg-orange-600 text-black text-[12px] font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)]">장비 규정 데이터베이스</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Profile Detailed Record Overlay */}
      {selectedProfileDetails && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="bg-[#080808] border border-orange-900/40 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded shadow-[0_0_50px_rgba(249,115,22,0.15)] relative">
            <div className="sticky top-0 bg-[#080808] border-b border-zinc-800 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-600/10 rounded border border-orange-600/20">
                  <Database size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 tracking-wider uppercase">Classified Identity Dossier</h3>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">Personnel Archive: {selectedProfileDetails.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProfileDetails(null)} className="p-2 text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-[0.2em] border-l-2 border-orange-600 pl-3 mb-6">
                    <User size={14} /> 인적 정보 (Original Record)
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-32 h-40 shrink-0 bg-zinc-950 border border-zinc-800 relative group overflow-hidden">
                      <img src={selectedProfileDetails.classifiedData?.originalImageUrl} className="w-full h-full object-cover grayscale opacity-60 contrast-125 sepia-[.3]" alt="Original Identity" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-orange-500/20 animate-scan"></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] font-mono text-orange-500 text-center py-1">PRE-CONVERSION</div>
                    </div>
                    <div className="flex-1 space-y-4 font-mono text-sm">
                      <div className="flex flex-col border-b border-zinc-900 pb-2">
                        <span className="text-[10px] text-zinc-600 uppercase">기명</span>
                        <span className="text-zinc-200">{selectedProfileDetails.classifiedData?.originalName}</span>
                      </div>
                      <div className="flex flex-col border-b border-zinc-900 pb-2">
                        <span className="text-[10px] text-zinc-600 uppercase">변환 승인일</span>
                        <span className="text-zinc-200">{selectedProfileDetails.classifiedData?.conversionDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-[0.2em] border-l-2 border-emerald-600 pl-3 mb-6">
                    <Activity size={14} /> 생체 상태 (Neural Metrics)
                  </div>
                  <div className="space-y-6 bg-zinc-950/40 p-6 border border-zinc-900">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                        <span>Psychological Stability</span>
                        <span className="text-orange-500">{selectedProfileDetails.classifiedData?.psychologicalStability}</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-600 shadow-[0_0_8px_rgba(249,115,22,0.5)]" style={{ width: selectedProfileDetails.classifiedData?.psychologicalStability }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-[0.2em] border-l-2 border-orange-600 pl-3">
                  <Info size={14} /> 관리관 기밀 소견 (Admin Notes)
                </div>
                <div className="bg-zinc-950/50 p-6 border border-zinc-900 rounded-sm font-mono text-xs leading-loose text-zinc-400 relative">
                  <p className="relative z-10">{selectedProfileDetails.classifiedData?.hiddenNotes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedWeapon && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="bg-[#0a0a0a] border border-orange-600/30 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded shadow-[0_0_60px_rgba(249,115,22,0.2)] relative">
            <button 
              onClick={() => setSelectedWeapon(null)}
              className="absolute top-6 right-6 z-20 p-2 text-zinc-500 hover:text-white bg-black/50 border border-zinc-800 rounded transition-all"
            >
              <X size={24} />
            </button>

            <div className="grid lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto overflow-hidden bg-zinc-950 border-r border-zinc-900">
                <img src={selectedWeapon.imageUrl} className="w-full h-full object-cover grayscale opacity-60 contrast-125" alt={selectedWeapon.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-orange-600/40 animate-scan"></div>
                
                <div className="absolute inset-0 p-8 pointer-events-none">
                  <div className="h-full border border-orange-600/10 flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                      <Crosshair size={24} className="text-orange-500/20" />
                      <div className="text-[8px] font-mono text-orange-500/40 text-right uppercase">
                        Target Acquisition System v4.2<br />
                        Weapon ID: {selectedWeapon.id}
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-orange-600/20"></div>)}
                      </div>
                      <Target size={24} className="text-orange-500/20" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-orange-600/10 border border-orange-600/40 text-orange-500 text-[10px] font-mono font-black uppercase tracking-[0.4em]">
                      {selectedWeapon.type}
                    </div>
                  </div>
                  <h2 className="text-5xl font-bold text-white tracking-tighter uppercase leading-none">{selectedWeapon.name}</h2>
                  <div className="flex gap-2">
                    {selectedWeapon.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono font-bold px-2 py-0.5 bg-zinc-900 text-zinc-500 border border-zinc-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-widest border-l-2 border-orange-600 pl-3">
                    <span className="flex items-center gap-2"><Info size={14} /> Weapon Specification</span>
                  </div>
                  <p className="text-zinc-400 text-lg leading-relaxed font-light">
                    {selectedWeapon.extendedDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 p-6 bg-zinc-950 border border-zinc-900">
                  <div className="space-y-1">
                    <span className="block text-zinc-600 text-[9px] uppercase font-mono tracking-widest">Effective Range</span>
                    <span className="text-zinc-100 font-bold text-xl font-mono">{selectedWeapon.specs.range}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-zinc-600 text-[9px] uppercase font-mono tracking-widest">Power Output</span>
                    <span className="text-orange-500 font-bold text-xl font-mono">{selectedWeapon.specs.power}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-zinc-600 text-[9px] uppercase font-mono tracking-widest">Energy Usage</span>
                    <span className="text-zinc-100 font-bold text-xl font-mono">{selectedWeapon.specs.energy}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-zinc-600 text-[9px] uppercase font-mono tracking-widest">Integrity Rank</span>
                    <span className="text-emerald-500 font-bold text-xl font-mono">{selectedWeapon.specs.durability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-20 border-t border-zinc-900 px-6 py-12 text-center text-zinc-700 text-xs tracking-widest font-mono">
        © 2599 ACDM-PROJECT. ALL RIGHTS RESERVED. <br />
        ERROR CODE DETECTED | SIGNAL STRENGTH: OPTIMAL
      </footer>

      <AudioPlayer />
      
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
