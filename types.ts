
export enum AppSection {
  OVERVIEW = 'OVERVIEW',
  MODEL = 'MODEL',
  WORLDVIEW = 'WORLDVIEW',
  ARCHIVE = 'ARCHIVE'
}

export interface ACDMProfile {
  id: string;
  name: string;
  codename: string;
  status: 'ACTIVE' | 'TERMINATED' | 'UNKNOWN';
  imageUrl?: string;
  specs: {
    height: string;
    weight: string;
    gender: string;
    age: string;
    nationality: string;
    birth: string;
    maxSpeed: string;
  };
  hardware: string[];
  description: string;
  classifiedData?: {
    originalName: string;
    originalOccupation: string;
    conversionDate: string;
    psychologicalStability: string;
    hiddenNotes: string;
    originalImageUrl?: string;
  };
}
