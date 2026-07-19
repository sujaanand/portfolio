import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCw, UserCheck, Eye, Users, Check, ShieldAlert } from 'lucide-react';

interface LogEntry {
  id: string;
  name: string;
  studentId: string;
  timestamp: string;
  confidence: number;
  status: 'Present' | 'Late';
}

const PRESET_STUDENTS = [
  { name: 'Suja A (You)', studentId: 'CEG-2025-001', confidence: 99.4, avatar: '👩‍💻' },
  { name: 'Ananya Sharma', studentId: 'CEG-2025-014', confidence: 98.1, avatar: '👩' },
  { name: 'Rahul Krishnan', studentId: 'CEG-2025-028', confidence: 96.8, avatar: '👨' },
  { name: 'Prof. Ramachandran', studentId: 'FAC-CEG-002', confidence: 99.1, avatar: '👨‍🏫' },
];

export default function AttendanceSimulator() {
  const [scanningState, setScanningState] = useState<'idle' | 'loading' | 'searching' | 'success' | 'error'>('idle');
  const [log, setLog] = useState<LogEntry[]>([
    { id: '1', name: 'Ananya Sharma', studentId: 'CEG-2025-014', timestamp: '10:05:12 AM', confidence: 98.1, status: 'Present' },
    { id: '2', name: 'Rahul Krishnan', studentId: 'CEG-2025-028', timestamp: '10:07:44 AM', confidence: 96.8, status: 'Present' },
  ]);
  const [activeStudent, setActiveStudent] = useState<typeof PRESET_STUDENTS[0] | null>(null);
  const [scanSpeed, setScanSpeed] = useState<number>(1);
  const [scannedCoordinates, setScannedCoordinates] = useState({ x: 120, y: 140, size: 160 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random face coordinate bounding box offsets to look live
  useEffect(() => {
    if (scanningState === 'searching') {
      const coordInterval = setInterval(() => {
        setScannedCoordinates({
          x: Math.floor(100 + Math.random() * 40),
          y: Math.floor(80 + Math.random() * 60),
          size: Math.floor(140 + Math.random() * 30),
        });
      }, 300);
      return () => clearInterval(coordInterval);
    }
  }, [scanningState]);

  const startScan = (studentIndex?: number) => {
    if (scanningState === 'loading' || scanningState === 'searching') return;
    
    // Choose selected or a random student
    const chosenIndex = studentIndex !== undefined ? studentIndex : Math.floor(Math.random() * PRESET_STUDENTS.length);
    const student = PRESET_STUDENTS[chosenIndex];
    setActiveStudent(student);

    setScanningState('loading');

    setTimeout(() => {
      setScanningState('searching');

      setTimeout(() => {
        setScanningState('success');
        
        // Add to log
        const timeNow = new Date().toLocaleTimeString();
        const newEntry: LogEntry = {
          id: Date.now().toString(),
          name: student.name,
          studentId: student.studentId,
          timestamp: timeNow,
          confidence: student.confidence,
          status: 'Present'
        };
        
        setLog(prev => [newEntry, ...prev]);
      }, 2500);
    }, 1200);
  };

  const clearLogs = () => {
    setLog([]);
  };

  return (
    <div id="attendance-sim" className="bg-[#0E0E0E] border-2 border-neutral-800 shadow-2xl relative">
      {/* Top Banner */}
      <div className="bg-[#161616] px-6 py-4 border-b-2 border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#22C55E] animate-pulse animate-duration-1000" />
          <span className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">OPENCV REAL-TIME DEMO v2.1</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-black text-neutral-300 font-mono px-2 py-0.5 border border-neutral-800 font-bold uppercase tracking-wider">LOCAL WEBCAM FEED</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Simulated Video Camera Viewport */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="relative aspect-video bg-black overflow-hidden border-2 border-neutral-800 flex flex-col items-center justify-center">
            
            {/* Mesh background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:16px_16px] opacity-30" />

            {/* Simulated Live Camera overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black px-2 py-1 border border-neutral-800 text-[10px] font-mono text-white">
              <span className="w-1.5 h-1.5 bg-red-600 animate-ping" />
              <span>REC // CAM_01</span>
            </div>

            <AnimatePresence mode="wait">
              {scanningState === 'idle' && (
                <motion.div
                  key="idle-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center p-4 z-10"
                >
                  <div className="w-12 h-12 bg-[#161616] border-2 border-neutral-800 flex items-center justify-center mx-auto mb-3">
                    <Camera className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <p className="text-sm text-neutral-200 font-display font-extrabold uppercase tracking-wider">Camera Stream Inactive</p>
                  <p className="text-xs text-neutral-500 mt-1 max-w-[280px]">
                    Select a student profile below to simulate the facial landmark recognition flow.
                  </p>
                </motion.div>
              )}

              {scanningState === 'loading' && (
                <motion.div
                  key="loading-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center z-10"
                >
                  <RefreshCw className="w-8 h-8 text-[#22C55E] animate-spin mx-auto mb-3" />
                  <p className="text-xs font-mono text-[#22C55E] font-bold uppercase tracking-wider">CONNECTING DESKTOP CONTROLLER...</p>
                </motion.div>
              )}

              {scanningState === 'searching' && (
                <motion.div
                  key="searching-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex items-center justify-center"
                >
                  {/* Face bounding box coordinate guide */}
                  <div
                    className="absolute border-2 border-[#22C55E] transition-all duration-300 ease-out"
                    style={{
                      left: `${scannedCoordinates.x}px`,
                      top: `${scannedCoordinates.y}px`,
                      width: `${scannedCoordinates.size}px`,
                      height: `${scannedCoordinates.size}px`,
                    }}
                  >
                    {/* Bounding box corner ticks */}
                    <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#22C55E]" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#22C55E]" />
                    <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#22C55E]" />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#22C55E]" />
                    
                    {/* Live label inside box */}
                    <span className="absolute top-2 left-2 bg-[#22C55E] text-[8px] font-mono font-black text-black px-1 uppercase tracking-wider">
                      FACE DETECTED: {(95 + Math.random() * 4).toFixed(1)}%
                    </span>
                  </div>

                  {/* Laser line animation */}
                  <div className="absolute inset-x-0 h-0.5 bg-[#22C55E]/80 shadow-[0_0_8px_#22C55E] animate-[bounce_2.5s_infinite]" />

                  {/* Simulated facial landmark dots */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="w-32 h-32 border-2 border-dashed border-[#22C55E]/40 flex items-center justify-center">
                      <div className="grid grid-cols-4 gap-4 p-2 text-[#22C55E] text-[6px] font-mono">
                        <span>•</span><span>•</span><span>•</span><span>•</span>
                        <span>•</span><span>•</span><span>•</span><span>•</span>
                        <span>•</span><span>•</span><span>•</span><span>•</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute bottom-4 bg-black border-2 border-neutral-800 px-3 py-1.5 text-center">
                    <p className="text-[10px] font-mono text-[#22C55E] animate-pulse uppercase tracking-wider font-bold">
                      MAPPING FACIAL VECTOR DESCRIPTORS...
                    </p>
                  </div>
                </motion.div>
              )}

              {scanningState === 'success' && activeStudent && (
                <motion.div
                  key="success-view"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center z-10 p-4 bg-black border-2 border-[#22C55E]"
                >
                  <div className="w-14 h-14 bg-[#22C55E]/10 border-2 border-[#22C55E] flex items-center justify-center text-2xl mx-auto mb-2">
                    {activeStudent.avatar}
                  </div>
                  <h5 className="text-sm font-display font-black text-white uppercase tracking-tight flex items-center justify-center gap-1.5">
                    {activeStudent.name}
                    <span className="bg-[#22C55E] text-black text-[9px] font-mono px-1 font-bold flex items-center uppercase tracking-wider">
                      <Check className="w-2.5 h-2.5" /> VERIFIED
                    </span>
                  </h5>
                  <p className="text-[10px] font-mono text-neutral-400 mt-1">ID: {activeStudent.studentId}</p>
                  
                  <div className="mt-3 text-[10px] font-mono text-neutral-400 border-t-2 border-neutral-800 pt-2 flex justify-between gap-6">
                    <span>MATCH: {activeStudent.confidence}%</span>
                    <span>ATTENDANCE: LOGGED</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick controls */}
          <div className="flex gap-2">
            <button
              onClick={() => startScan()}
              disabled={scanningState === 'searching' || scanningState === 'loading'}
              className="flex-1 py-2.5 border-2 border-black bg-[#22C55E] hover:bg-[#1ebd5a] disabled:bg-[#121212] disabled:border-neutral-800 disabled:text-neutral-600 text-black font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              Scan Random Student
            </button>
            {scanningState === 'success' && (
              <button
                onClick={() => setScanningState('idle')}
                className="py-2.5 px-3 border-2 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-300 font-bold text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                Reset Scanner
              </button>
            )}
          </div>
        </div>

        {/* Right column: Student Profiles & Live Attendance Database Log */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 lg:pl-4 text-left">
          
          {/* Target Student Database */}
          <div>
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider mb-2 block">
              // REGISTERED BIOMETRIC PROFILES:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_STUDENTS.map((student, idx) => (
                <button
                  key={idx}
                  onClick={() => startScan(idx)}
                  disabled={scanningState === 'searching' || scanningState === 'loading'}
                  className="text-left p-2 bg-[#161616] border-2 border-neutral-800 hover:border-[#22C55E] hover:bg-black transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span className="text-lg bg-black border border-neutral-800 w-8 h-8 flex items-center justify-center">
                    {student.avatar}
                  </span>
                  <div className="overflow-hidden">
                    <p className="text-[11px] font-bold text-white truncate group-hover:text-[#22C55E]">
                      {student.name}
                    </p>
                    <p className="text-[9px] font-mono text-neutral-500 truncate">{student.studentId}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Database Log Table */}
          <div className="flex-1 flex flex-col min-h-[160px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#22C55E]" />
                Live Attendance DB Log ({log.length})
              </span>
              {log.length > 0 && (
                <button
                  onClick={clearLogs}
                  className="text-[10px] text-neutral-500 hover:text-rose-500 font-mono transition-colors cursor-pointer font-bold uppercase tracking-wider"
                >
                  Clear Logs
                </button>
              )}
            </div>

            <div className="flex-1 bg-black border-2 border-neutral-800 overflow-hidden text-xs font-mono">
              <div className="bg-[#161616] px-3 py-1.5 border-b-2 border-neutral-800 grid grid-cols-12 text-neutral-500 font-bold text-[10px] uppercase tracking-wider">
                <span className="col-span-5">STUDENT / FACULTY</span>
                <span className="col-span-4">TIMESTAMP</span>
                <span className="col-span-3 text-right">CONF.</span>
              </div>

              <div className="p-1 max-h-[130px] overflow-y-auto space-y-1">
                <AnimatePresence initial={false}>
                  {log.length === 0 ? (
                    <div className="text-center py-8 text-neutral-600 italic">
                      No attendances logged yet. Run a scan.
                    </div>
                  ) : (
                    log.map(entry => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="px-2 py-1.5 hover:bg-neutral-900 grid grid-cols-12 text-[11px] items-center text-slate-300"
                      >
                        <div className="col-span-5 truncate">
                          <span className="font-bold text-neutral-200">{entry.name}</span>
                          <span className="text-[8px] text-neutral-500 block">{entry.studentId}</span>
                        </div>
                        <span className="col-span-4 text-neutral-400">{entry.timestamp}</span>
                        <span className="col-span-3 text-right text-[#22C55E] font-black">
                          {entry.confidence}%
                        </span>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
