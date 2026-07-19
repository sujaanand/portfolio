import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Printer, Copy, Check, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, TIMELINE, SKILL_CATEGORIES, CERTIFICATIONS } from '../data';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const resumeText = `
${PERSONAL_INFO.name.toUpperCase()} - ${PERSONAL_INFO.role.toUpperCase()}
Location: ${PERSONAL_INFO.location} | Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

SUMMARY:
${PERSONAL_INFO.summary}

EDUCATION:
${TIMELINE.map(e => `- ${e.title} at ${e.organization} (${e.period}) | ${e.gpaOrDetails}`).join('\n')}

TECHNICAL SKILLS:
${SKILL_CATEGORIES.map(cat => `${cat.title}: ${cat.skills.map(s => s.name).join(', ')}`).join('\n')}

PROJECTS:
${PROJECTS.map(p => `- ${p.title} (${p.tech.join(', ')})\n  ${p.description}\n  GitHub: ${p.githubUrl}`).join('\n\n')}

CERTIFICATIONS:
${CERTIFICATIONS.map(c => `- ${c.title} (${c.issuer})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Background overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-sm transition-opacity" 
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-[#0E0E0E] border-2 border-neutral-800 w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Controls Bar */}
        <div className="bg-[#161616] px-6 py-4 border-b-2 border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#22C55E]" />
            <span className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">RESUME_VIEWER.sh</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 border-2 border-neutral-800 hover:border-[#22C55E] bg-[#121212] text-neutral-300 font-display font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                  Copied Text!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Text
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 border-2 border-black bg-[#22C55E] hover:bg-[#1ebd5a] text-black font-display font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>

            <button
              onClick={onClose}
              className="p-1.5 border-2 border-transparent hover:border-neutral-800 hover:bg-[#161616] text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Container */}
        <div className="flex-1 overflow-y-auto p-8 bg-black">
          <div 
            id="printable-resume" 
            className="bg-white text-slate-800 p-8 sm:p-12 shadow-lg border border-slate-200 font-sans mx-auto max-w-[800px] text-left"
          >
            {/* Header */}
            <div className="border-b-2 border-slate-300 pb-5 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-sm font-semibold tracking-wider text-[#22C55E] uppercase mt-1">
                {PERSONAL_INFO.role}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-4 mt-3 text-xs text-slate-600 font-medium font-sans">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  {PERSONAL_INFO.location}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  {PERSONAL_INFO.phone}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  {PERSONAL_INFO.email}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-4 mt-2 text-xs text-slate-600 font-medium">
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-700 hover:underline">
                  <Linkedin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  LinkedIn
                </a>
                <span className="text-slate-300">•</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-700 hover:underline">
                  <Github className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6">
              <h3 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1">
                Professional Summary
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2 text-justify">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mt-6">
              <h3 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1">
                Technical Skills
              </h3>
              <div className="mt-2 space-y-1.5 text-xs sm:text-sm">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-1">
                    <span className="col-span-3 font-bold text-slate-800">{cat.title}:</span>
                    <span className="col-span-9 text-slate-700">
                      {cat.skills.map(s => s.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="mt-6">
              <h3 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1">
                Projects
              </h3>
              <div className="mt-3 space-y-4">
                {PROJECTS.slice(0, 2).map((proj, idx) => (
                  <div key={idx} className="text-xs sm:text-sm">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-900">{proj.title}</span>
                      <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase">
                        {proj.tech.slice(0, 4).join(' • ')}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5 underline font-medium">
                      GitHub: <a href={proj.githubUrl} className="text-neutral-700 hover:underline">{proj.githubUrl}</a>
                    </p>
                    <ul className="list-disc list-outside pl-4 mt-2 space-y-1 text-slate-700 text-xs">
                      {proj.features.map((feat, fIdx) => (
                        <li key={fIdx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mt-6">
              <h3 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1">
                Education
              </h3>
              <div className="mt-3 space-y-3">
                {TIMELINE.map((edu, idx) => (
                  <div key={idx} className="text-xs sm:text-sm">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-900">{edu.title}</span>
                      <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">{edu.period}</span>
                    </div>
                    <div className="flex justify-between text-slate-700 font-medium text-[11px] sm:text-xs">
                      <span>{edu.organization}</span>
                      <span className="font-bold text-slate-800">{edu.gpaOrDetails}</span>
                    </div>
                    <ul className="list-disc list-outside pl-4 mt-1.5 space-y-0.5 text-slate-600 text-xs">
                      {edu.highlights.map((hl, hlIdx) => (
                        <li key={hlIdx}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-6">
              <h3 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1">
                Certifications
              </h3>
              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-700 list-disc pl-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <li key={idx} className="leading-tight">
                    <span className="font-semibold text-slate-900">{cert.title}</span> – <span className="text-slate-500">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Extra CSS injection for Print Mode */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-resume, #printable-resume * {
              visibility: visible;
            }
            #printable-resume {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
              color: black !important;
            }
          }
        `}</style>
      </motion.div>
    </div>
  );
}
