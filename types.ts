export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  mrn: string; // Medical Record Number
  allergies: string[];
  conditions: string[];
  vitals: {
    bp: string;
    hr: number;
    temp: number;
    spo2: number;
    lastUpdated: string;
  };
}

export enum NoteType {
  SOAP = 'SOAP',
  GENERAL = 'GENERAL',
  PROCEDURE = 'PROCEDURE'
}

export interface SOAPData {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface MedicalNote {
  id: string;
  patientId: string;
  date: string;
  type: NoteType;
  author: string;
  content: SOAPData | string;
  status: 'Draft' | 'Finalized';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface VitalHistoryPoint {
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
}
