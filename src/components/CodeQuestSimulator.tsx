import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle2, Play, Award, RotateCcw, AlertCircle } from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  problem: string;
  codeTemplate: string;
  options: string[];
  correctIndex: number;
  testCases: { input: string; expected: string }[];
}

const QUESTS: Quest[] = [
  {
    id: 1,
    title: 'Quest 1: The Missing Map',
    problem: 'Complete the JavaScript code to double each number in the array using the .map() method.',
    codeTemplate: 'const numbers = [2, 4, 6];\nconst doubled = numbers.map(num => _________);\nconsole.log(doubled); // Expected: [4, 8, 12]',
    options: [
      'num * 2',
      'num * num',
      'num + 2',
      'numbers * 2'
    ],
    correctIndex: 0,
    testCases: [
      { input: '[2, 4, 6]', expected: '[4, 8, 12]' }
    ]
  },
  {
    id: 2,
    title: 'Quest 2: Filter the Odd Ones',
    problem: 'Filter out the odd numbers and keep only even numbers from the list.',
    codeTemplate: 'const items = [1, 2, 3, 4, 5, 6];\nconst evens = items.filter(val => _________);\nconsole.log(evens); // Expected: [2, 4, 6]',
    options: [
      'val / 2 === 0',
      'val % 2 === 0',
      'val % 2 !== 0',
      'val.isEven()'
    ],
    correctIndex: 1,
    testCases: [
      { input: '[1, 2, 3, 4, 5, 6]', expected: '[2, 4, 6]' }
    ]
  },
  {
    id: 3,
    title: 'Quest 3: String Reversal',
    problem: 'Implement a quick string reverse chain in JavaScript.',
    codeTemplate: 'function reverse(str) {\n  return str._________().reverse().join("");\n}',
    options: [
      'explode',
      'split("")',
      'toCharArray()',
      'slice()'
    ],
    correctIndex: 1,
    testCases: [
      { input: '"hello"', expected: '"olleh"' }
    ]
  }
];

export default function CodeQuestSimulator() {
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTested, setIsTested] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [xp, setXp] = useState(150);
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentQuest = QUESTS[currentQuestIndex];

  const handleRunTest = () => {
    if (selectedOption === null) return;
    setIsTested(true);
    const correct = selectedOption === currentQuest.correctIndex;
    setIsCorrect(correct);

    if (correct && !completedQuests.includes(currentQuest.id)) {
      setXp(prev => prev + 100);
      setCompletedQuests(prev => [...prev, currentQuest.id]);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  const handleNext = () => {
    if (currentQuestIndex < QUESTS.length - 1) {
      setCurrentQuestIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsTested(false);
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestIndex(0);
    setSelectedOption(null);
    setIsTested(false);
    setIsCorrect(false);
    setCompletedQuests([]);
    setXp(150);
  };

  const filledCode = () => {
    if (selectedOption === null) return currentQuest.codeTemplate;
    const placeholder = '_________';
    return currentQuest.codeTemplate.replace(placeholder, currentQuest.options[selectedOption]);
  };

  return (
    <div id="codequest-sim" className="bg-[#0E0E0E] border-2 border-neutral-800 shadow-2xl relative">
      {/* Header bar */}
      <div className="bg-[#161616] px-6 py-4 border-b-2 border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 bg-rose-600 block" />
            <span className="w-2.5 h-2.5 bg-amber-500 block" />
            <span className="w-2.5 h-2.5 bg-[#22C55E] block" />
          </div>
          <span className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">CODEQUEST SANDBOX v1.2</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-[#22C55E]/10 border-2 border-[#22C55E] px-3 py-1">
            <Award className="w-4 h-4 text-[#22C55E]" />
            <span className="text-xs font-mono text-[#22C55E] font-extrabold">{xp} XP</span>
          </div>
          <button
            onClick={handleReset}
            className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
            title="Reset All Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Mission Details & Code Template */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-widest font-mono block">
              Level {currentQuestIndex + 1} of {QUESTS.length}
            </span>
            <h4 className="text-lg font-display font-black text-white uppercase tracking-tight mt-1">{currentQuest.title}</h4>
            <p className="text-sm text-neutral-400 mt-2">{currentQuest.problem}</p>
          </div>

          <div className="bg-black p-4 font-mono text-sm border-2 border-neutral-800 relative">
            <Terminal className="absolute top-3 right-3 text-neutral-700 w-5 h-5" />
            <pre className="text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {filledCode()}
            </pre>
          </div>

          {/* Test cases result preview */}
          <div className="bg-black/40 border-2 border-neutral-800 p-3">
            <span className="text-xs font-mono text-neutral-500 block mb-1">TEST CASE LOG:</span>
            {isTested ? (
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span className="text-xs font-mono text-[#22C55E]">
                      PASS: Expected output {currentQuest.testCases[0].expected} matched successfully!
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-xs font-mono text-rose-500">
                      FAIL: Selected syntax returns compile-time error. Try again!
                    </span>
                  </>
                )}
              </div>
            ) : (
              <span className="text-xs font-mono text-neutral-500 italic">
                Select an option and click "Verify Code" to run compilation tests.
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Options & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 border-t lg:border-t-0 lg:border-l border-neutral-800 pt-4 lg:pt-0 lg:pl-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
              Choose the correct code token:
            </span>
            <div className="space-y-2">
              {currentQuest.options.map((option, index) => {
                const isSelected = selectedOption === index;
                return (
                  <button
                    key={index}
                    disabled={isTested && isCorrect}
                    onClick={() => {
                      setSelectedOption(index);
                      setIsTested(false);
                    }}
                    className={`w-full text-left px-4 py-3 border-2 text-sm font-mono transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E] font-black'
                        : 'bg-black border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900/60'
                    } ${(isTested && isCorrect) ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isSelected && <span className="w-2 h-2 bg-[#22C55E]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              disabled={selectedOption === null || (isTested && isCorrect)}
              onClick={handleRunTest}
              className={`w-full py-3 border-2 font-display font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer ${
                selectedOption === null
                  ? 'bg-[#121212] border-neutral-800 text-neutral-600 cursor-not-allowed'
                  : 'bg-[#22C55E] hover:bg-[#1ebd5a] border-black text-black'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              Verify Code
            </button>

            <AnimatePresence mode="wait">
              {isCorrect && currentQuestIndex < QUESTS.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={handleNext}
                  className="w-full py-3 border-2 border-black bg-[#22C55E] hover:bg-[#1ebd5a] text-black font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  Next Quest
                </motion.button>
              )}

              {isCorrect && currentQuestIndex === QUESTS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-emerald-950/40 border border-emerald-800/30 rounded-lg text-center"
                >
                  <span className="text-xs text-emerald-400 font-semibold font-mono block">
                    ✨ Congratulations! You solved all quests! ✨
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-[#0A0A0A]/95 flex flex-col items-center justify-center text-center p-6 z-20"
          >
            <motion.div
              initial={{ rotate: -15, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <Award className="w-20 h-20 text-[#22C55E] mb-4 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">Quest Completed!</h3>
            <p className="text-neutral-400 mt-1 max-w-sm text-xs">
              Excellent software engineering skills. You unlocked new level data and earned:
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#22C55E]/10 border-2 border-[#22C55E] px-4 py-2 text-[#22C55E] font-black text-lg font-mono">
              +100 XP
            </div>
            <p className="text-xs text-neutral-500 mt-6 italic">This overlay will dismiss in a moment...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
