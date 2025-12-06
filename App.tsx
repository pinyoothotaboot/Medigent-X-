import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, FileText, Settings, Stethoscope, Menu, X } from 'lucide-react';
import PatientDashboard from './components/PatientDashboard';
import ChatInterface from './components/ChatInterface';
import { MOCK_PATIENT, MOCK_NOTES, MOCK_VITALS_HISTORY } from './constants';

enum View {
  DASHBOARD = 'DASHBOARD',
  AI_CHAT = 'AI_CHAT',
  NOTES = 'NOTES'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem: React.FC<{ view: View; icon: React.ReactNode; label: string }> = ({ view, icon, label }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === view 
          ? 'bg-medical-500 text-white shadow-md shadow-medical-500/30' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-850 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="px-6 py-8 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-medical-500 to-medical-600 rounded-lg shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">MediGentX</h1>
              <p className="text-xs text-slate-400">AI Workflow Engine</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            <NavItem view={View.DASHBOARD} icon={<LayoutDashboard size={20} />} label="Patient Dashboard" />
            <NavItem view={View.AI_CHAT} icon={<MessageSquare size={20} />} label="AI Assistant" />
            <NavItem view={View.NOTES} icon={<FileText size={20} />} label="Documentation" />
          </nav>

          {/* Footer User */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center space-x-3 px-2">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                <span className="text-sm font-bold">DP</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Dr. Pravit</p>
                <p className="text-xs text-slate-400 truncate">Cardiology</p>
              </div>
              <Settings size={18} className="text-slate-500 cursor-pointer hover:text-white" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-medical-500 rounded text-white">
              <Stethoscope size={16} />
            </div>
            <span className="font-bold text-gray-800">MediGentX</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentView === View.DASHBOARD && 'Patient Overview'}
                {currentView === View.AI_CHAT && 'MediGentX Intelligence'}
                {currentView === View.NOTES && 'Medical Records'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {currentView === View.DASHBOARD && `Viewing record for ${MOCK_PATIENT.name}`}
                {currentView === View.AI_CHAT && 'Real-time clinical decision support agent'}
              </p>
            </header>

            {currentView === View.DASHBOARD && (
              <PatientDashboard 
                patient={MOCK_PATIENT} 
                vitalsHistory={MOCK_VITALS_HISTORY} 
                recentNotes={MOCK_NOTES} 
              />
            )}

            {currentView === View.AI_CHAT && (
              <div className="max-w-3xl mx-auto">
                <ChatInterface />
              </div>
            )}

            {currentView === View.NOTES && (
               <div className="grid gap-6">
                  {MOCK_NOTES.map(note => <div key={note.id}><PatientDashboard patient={MOCK_PATIENT} vitalsHistory={[]} recentNotes={[note]} /></div>)}
               </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
