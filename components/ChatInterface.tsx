import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { createMedicalChat, streamMedicalResponse } from '../services/geminiService';
import { Chat } from '@google/genai';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Hello, I am MediGentX. How can I assist you with clinical documentation or medical queries today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini Chat on mount
  useEffect(() => {
    const session = createMedicalChat();
    setChatSession(session);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    const placeholderId = (Date.now() + 1).toString();
    const modelMsgPlaceholder: ChatMessage = {
      id: placeholderId,
      role: 'model',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, userMsg, modelMsgPlaceholder]);
    setInput('');
    setIsThinking(true);

    try {
      await streamMedicalResponse(chatSession, input, (chunk) => {
        setMessages(prev => prev.map(msg => 
          msg.id === placeholderId 
            ? { ...msg, content: msg.content + chunk }
            : msg
        ));
      });
    } finally {
      setIsThinking(false);
      setMessages(prev => prev.map(msg => 
        msg.id === placeholderId ? { ...msg, isStreaming: false } : msg
      ));
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-medical-600 to-medical-700 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <h2 className="font-semibold tracking-wide">MediGentX Assistant</h2>
        </div>
        <span className="text-xs bg-white/20 px-2 py-1 rounded text-blue-50">Gemini 2.5 Flash</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-medical-600 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-white text-gray-800 border border-gray-100 rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {msg.content.split('\n').map((line, i) => (
                <p key={i} className="min-h-[1.2em]">{line}</p>
              ))}
              {msg.isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-emerald-500 animate-pulse" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your medical query or dictate note..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-medical-500 transition-all"
            disabled={isThinking}
          />
          <button
            type="submit"
            disabled={isThinking || !input.trim()}
            className="bg-medical-600 hover:bg-medical-700 text-white rounded-xl px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-12"
          >
            {isThinking ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
