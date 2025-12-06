import React from 'react';
import { MedicalNote, NoteType, SOAPData } from '../types';
import { FileText, Calendar, User, CheckCircle, Clock } from 'lucide-react';

interface Props {
  note: MedicalNote;
}

const SOAPNoteDisplay: React.FC<Props> = ({ note }) => {
  const isSOAP = note.type === NoteType.SOAP && typeof note.content !== 'string';
  const content = note.content as SOAPData;

  if (!isSOAP) return <div className="p-4 bg-white rounded shadow">Non-SOAP Note Content</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Clinical Progress Note</h3>
            <div className="flex items-center text-xs text-gray-500 space-x-2">
              <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {note.date}</span>
              <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {note.author}</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
          note.status === 'Finalized' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {note.status === 'Finalized' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
          {note.status}
        </div>
      </div>

      {/* SOAP Content */}
      <div className="p-6 grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Subjective" color="blue" content={content.subjective} />
          <Section title="Objective" color="emerald" content={content.objective} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Assessment" color="amber" content={content.assessment} />
          <Section title="Plan" color="purple" content={content.plan} />
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; color: string; content: string }> = ({ title, color, content }) => {
  const colorClasses: Record<string, string> = {
    blue: 'border-l-blue-500 bg-blue-50 text-blue-900',
    emerald: 'border-l-emerald-500 bg-emerald-50 text-emerald-900',
    amber: 'border-l-amber-500 bg-amber-50 text-amber-900',
    purple: 'border-l-purple-500 bg-purple-50 text-purple-900',
  };

  const headerColors: Record<string, string> = {
    blue: 'text-blue-700',
    emerald: 'text-emerald-700',
    amber: 'text-amber-700',
    purple: 'text-purple-700',
  };

  return (
    <div className={`pl-4 border-l-4 rounded-r-lg p-3 ${colorClasses[color]} bg-opacity-30`}>
      <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${headerColors[color]}`}>{title}</h4>
      <p className="text-sm whitespace-pre-line text-gray-800 leading-relaxed">{content}</p>
    </div>
  );
};

export default SOAPNoteDisplay;
