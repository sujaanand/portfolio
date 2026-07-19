import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Trash2, Calendar, User, Eye, Sparkles } from 'lucide-react';
import { ContactMessage } from '../types';

interface InboxViewerProps {
  onMessageCountChange?: (count: number) => void;
}

export default function InboxViewer({ onMessageCountChange }: InboxViewerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Load submissions from localStorage
  const loadMessages = () => {
    const stored = localStorage.getItem('portfolio_submissions');
    if (stored) {
      try {
        const parsed: ContactMessage[] = JSON.parse(stored);
        setMessages(parsed);
        if (onMessageCountChange) onMessageCountChange(parsed.length);
      } catch (e) {
        console.error('Error parsing submissions', e);
      }
    } else {
      // Seed default welcoming message
      const defaultMsg: ContactMessage = {
        id: 'welcome',
        name: 'Suja A',
        email: 'sujajubiya15@gmail.com',
        message: 'Hello! Thank you for visiting my interactive portfolio. Submit a message using the contact form, and you will see it instantly pop up here in real time. Try it out!',
        timestamp: new Date().toLocaleString()
      };
      setMessages([defaultMsg]);
      if (onMessageCountChange) onMessageCountChange(1);
    }
  };

  useEffect(() => {
    loadMessages();
    
    // Set up storage event listener for cross-tab or immediate updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'portfolio_submissions') {
        loadMessages();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom trigger event to listen for same-window submissions
    window.addEventListener('portfolio_message_submitted', loadMessages);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('portfolio_message_submitted', loadMessages);
    };
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_submissions', JSON.stringify(updated));
    if (onMessageCountChange) onMessageCountChange(updated.length);
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleClearAll = () => {
    localStorage.removeItem('portfolio_submissions');
    setMessages([]);
    if (onMessageCountChange) onMessageCountChange(0);
    setSelectedMessage(null);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Mail className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono text-slate-300 font-semibold tracking-wider uppercase">
            Administrative Messages Console
          </span>
          <span className="bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
            {messages.length} Inbox
          </span>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[10px] font-mono text-slate-500 hover:text-rose-400 transition-colors"
          >
            Clear Inbox Database
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[220px]">
        {/* Left pane: Message lists */}
        <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-slate-800/80 max-h-[300px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-10 text-slate-600 italic text-xs">
              No messages stored. Use the Contact Form to test!
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {messages.map(msg => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 text-white'
                        : 'bg-slate-900/30 border-transparent hover:bg-slate-900/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs truncate max-w-[120px]">{msg.name}</span>
                      <span className="text-[9px] font-mono text-slate-500 shrink-0">{msg.timestamp.split(',')[0]}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 truncate w-full">{msg.message}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right pane: Message details */}
        <div className="md:col-span-7 p-6 flex flex-col justify-between max-h-[300px] overflow-y-auto bg-slate-900/20">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      {selectedMessage.name}
                    </h5>
                    <button
                      onClick={(e) => handleDelete(selectedMessage.id, e)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-900 transition-colors"
                      title="Delete this message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs font-mono text-indigo-300 mt-1">{selectedMessage.email}</p>
                  <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" />
                    {selectedMessage.timestamp}
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-6 text-slate-500 space-y-2">
                <div className="p-3 rounded-full bg-slate-900 text-slate-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Select a submission message</p>
                  <p className="text-[10px] text-slate-600 max-w-[240px] mt-0.5">
                    Click any card in the left list to inspect full user contact request details.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
