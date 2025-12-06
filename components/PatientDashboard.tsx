import React from 'react';
import { Patient, VitalHistoryPoint, MedicalNote } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Thermometer, Droplets, Heart, AlertTriangle } from 'lucide-react';
import SOAPNoteDisplay from './SOAPNoteDisplay';

interface Props {
  patient: Patient;
  vitalsHistory: VitalHistoryPoint[];
  recentNotes: MedicalNote[];
}

const PatientDashboard: React.FC<Props> = ({ patient, vitalsHistory, recentNotes }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Patient Summary & Vitals */}
      <div className="lg:col-span-1 space-y-6">
        {/* Patient Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center text-medical-700 text-2xl font-bold">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
              <p className="text-sm text-gray-500">MRN: {patient.mrn}</p>
              <p className="text-sm text-gray-500">{patient.age} yrs • {patient.gender}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-red-50 p-3 rounded-lg border border-red-100">
              <h4 className="text-xs font-bold text-red-700 uppercase mb-2 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" /> Allergies
              </h4>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map(a => (
                  <span key={a} className="px-2 py-1 bg-white text-red-600 text-xs rounded border border-red-100 font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Conditions</h4>
              <div className="flex flex-wrap gap-2">
                {patient.conditions.map(c => (
                  <span key={c} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current Vitals Grid */}
        <div className="grid grid-cols-2 gap-4">
          <VitalCard icon={<Heart className="w-5 h-5 text-rose-500" />} label="Heart Rate" value={`${patient.vitals.hr} bpm`} />
          <VitalCard icon={<Activity className="w-5 h-5 text-blue-500" />} label="BP" value={patient.vitals.bp} />
          <VitalCard icon={<Thermometer className="w-5 h-5 text-amber-500" />} label="Temp" value={`${patient.vitals.temp}°C`} />
          <VitalCard icon={<Droplets className="w-5 h-5 text-cyan-500" />} label="SpO2" value={`${patient.vitals.spo2}%`} />
        </div>
      </div>

      {/* Middle/Right: Charts & Notes */}
      <div className="lg:col-span-2 space-y-8">
        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Blood Pressure Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} domain={[60, 160]} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Line type="monotone" dataKey="systolic" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4, fill: '#0ea5e9', strokeWidth: 0}} activeDot={{r: 6}} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1', strokeWidth: 0}} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Notes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Clinical Notes</h3>
          {recentNotes.map(note => (
            <SOAPNoteDisplay key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

const VitalCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
    <div className="mb-2 p-2 bg-gray-50 rounded-full">{icon}</div>
    <span className="text-xs text-gray-500 font-medium uppercase">{label}</span>
    <span className="text-lg font-bold text-gray-900 mt-1">{value}</span>
  </div>
);

export default PatientDashboard;
