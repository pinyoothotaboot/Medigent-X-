import { Patient, MedicalNote, NoteType, VitalHistoryPoint } from './types';

export const MOCK_PATIENT: Patient = {
  id: 'pt_12345',
  name: 'Sombat Jai-Dee',
  age: 45,
  gender: 'Male',
  dob: '1979-05-15',
  mrn: 'HN-998877',
  allergies: ['Penicillin', 'Peanuts'],
  conditions: ['Hypertension', 'Type 2 Diabetes'],
  vitals: {
    bp: '135/85',
    hr: 78,
    temp: 36.8,
    spo2: 98,
    lastUpdated: '2024-05-20T10:30:00'
  }
};

export const MOCK_VITALS_HISTORY: VitalHistoryPoint[] = [
  { date: 'May 01', systolic: 140, diastolic: 90, heartRate: 82 },
  { date: 'May 05', systolic: 138, diastolic: 88, heartRate: 80 },
  { date: 'May 10', systolic: 135, diastolic: 85, heartRate: 78 },
  { date: 'May 15', systolic: 132, diastolic: 84, heartRate: 76 },
  { date: 'May 20', systolic: 135, diastolic: 85, heartRate: 78 },
];

export const MOCK_NOTES: MedicalNote[] = [
  {
    id: 'note_1',
    patientId: 'pt_12345',
    date: '2024-05-20',
    type: NoteType.SOAP,
    author: 'Dr. Pravit',
    status: 'Draft',
    content: {
      subjective: 'Patient reports mild dizziness upon standing. No chest pain or shortness of breath. Adherent to medication.',
      objective: 'BP 135/85 mmHg, HR 78 regular. Lungs clear to auscultation. No peripheral edema.',
      assessment: '1. Hypertension, controlled.\n2. Orthostatic hypotension symptoms.',
      plan: 'Continue current Amlodipine 5mg. Advise slow position changes. Follow up in 2 weeks.'
    }
  },
  {
    id: 'note_2',
    patientId: 'pt_12345',
    date: '2024-04-15',
    type: NoteType.SOAP,
    author: 'Dr. Pravit',
    status: 'Finalized',
    content: {
      subjective: 'Follow up for diabetes. Blood sugars ranging 140-160 mg/dL fasting.',
      objective: 'Wt 78kg. Foot exam normal. A1C 7.2%.',
      assessment: 'Type 2 DM, slightly above target.',
      plan: 'Dietary counseling provided. Increase Metformin to 1000mg BID.'
    }
  }
];
