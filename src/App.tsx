import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, Mail, Phone, MapPin, Linkedin, Github, Instagram, 
  Download, FileText, ExternalLink, Calendar, Award, Sparkles, ChevronRight,
  Menu, X, Check, Coffee, Code2, FileJson, Binary, Cpu, Database, Atom, 
  FileCode, Palette, Wind, MonitorSmartphone, Server, Network, Settings2, 
  Leaf, DatabaseBackup, GitBranch, Terminal, CircuitBoard, Eye, ChevronDown,
  User, CheckCircle
} from 'lucide-react';

import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, TIMELINE, CERTIFICATIONS } from './data';
import CodeQuestSimulator from './components/CodeQuestSimulator';
import AttendanceSimulator from './components/AttendanceSimulator';
import ResumeViewer from './components/ResumeViewer';
import InboxViewer from './components/InboxViewer';
import { Project } from './types';

// Map icon strings to Lucide icon components for safe and optimized rendering
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Coffee, Code2, FileJson, Binary, Cpu, Database, Atom, FileCode, Palette, Wind,
  MonitorSmartphone, Server, Network, Settings2, Leaf, DatabaseBackup, GitBranch,
  Terminal, CircuitBoard, Eye
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  
  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [inboxCount, setInboxCount] = useState(0);

  // Terminal welcome typing text
  const [terminalText, setTerminalText] = useState('');
  const welcomeMessage = `const dev = {\n  name: "Suja A",\n  role: "Software Engineer",\n  pursuing: "MCA @ CEG, Anna University",\n  skills: ["MERN Stack", "Python", "OpenCV"],\n  passion: "User-Centric Architecture"\n};`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTerminalText(welcomeMessage.slice(0, index));
      index++;
      if (index > welcomeMessage.length) {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll to update active nav state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const stored = localStorage.getItem('portfolio_submissions');
      const list = stored ? JSON.parse(stored) : [];
      
      const newSubmission = {
        id: Date.now().toString(),
        name,
        email,
        message,
        timestamp: new Date().toLocaleString()
      };

      list.unshift(newSubmission);
      localStorage.setItem('portfolio_submissions', JSON.stringify(list));
      
      // Dispatch custom event to update inbox live
      window.dispatchEvent(new Event('portfolio_message_submitted'));

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');

      // Auto clear success banner
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  const toggleDemo = (projectId: string) => {
    if (activeDemo === projectId) {
      setActiveDemo(null);
    } else {
      setActiveDemo(projectId);
      // Smooth scroll to the demo block
      setTimeout(() => {
        const el = document.getElementById(`demo-${projectId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans selection:bg-[#22C55E]/30 selection:text-[#22C55E] antialiased overflow-x-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-[#22C55E]/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-neutral-900/20 rounded-full blur-[140px]" />
      </div>

      {/* HEADER / NAVIGATION BAR */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-md border-b-2 border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-md bg-[#22C55E] flex items-center justify-center text-black font-display font-black text-sm tracking-tighter group-hover:bg-[#1ebd5a] transition-colors shadow-md shadow-[#22C55E]/10">
              S
            </span>
            <span className="font-mono text-sm font-bold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              suja.dev<span className="text-[#22C55E] animate-pulse">_</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {['home', 'about', 'skills', 'projects', 'education', 'contact'].map((sect) => (
              <a
                key={sect}
                href={`#${sect}`}
                className={`px-4 py-1.5 border-2 text-xs font-display tracking-wider uppercase transition-all duration-150 ${
                  activeSection === sect
                    ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E] font-black'
                    : 'text-neutral-400 border-transparent hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                {sect}
              </a>
            ))}
          </nav>

          {/* Nav Right (Resume CTA) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setResumeOpen(true)}
              className="px-4 py-2 border-2 border-black bg-[#22C55E] hover:bg-[#1ebd5a] text-black font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:translate-y-0.5"
            >
              <FileText className="w-3.5 h-3.5" />
              View Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 inset-x-0 z-30 bg-[#0E0E0E] border-b-2 border-neutral-800 md:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-3">
              {['home', 'about', 'skills', 'projects', 'education', 'contact'].map((sect) => (
                <a
                  key={sect}
                  href={`#${sect}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 border-2 text-xs font-display uppercase tracking-wider ${
                    activeSection === sect
                      ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E] font-black'
                      : 'text-neutral-400 border-transparent hover:bg-neutral-900/50'
                  }`}
                >
                  {sect}
                </a>
              ))}
              <div className="border-t-2 border-neutral-800 pt-3 mt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeOpen(true);
                  }}
                  className="w-full py-3 border-2 border-black bg-[#22C55E] hover:bg-[#1ebd5a] text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="z-10 relative">

        {/* 1. HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-6 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#22C55E]/10 border-2 border-[#22C55E]">
                <Sparkles className="w-3.5 h-3.5 text-[#22C55E] animate-spin" />
                <span className="text-[10px] font-mono font-black tracking-wider uppercase text-[#22C55E]">
                  OPEN FOR OPPORTUNITIES
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xs sm:text-sm font-mono text-[#22C55E] font-bold uppercase tracking-widest">
                  // HELLO WORLD, I'M
                </h2>
                <h1 className="text-5xl sm:text-7xl font-display font-black tracking-tighter uppercase leading-none text-white">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-xl sm:text-3xl font-display font-extrabold tracking-tight text-neutral-300 uppercase mt-2">
                  {PERSONAL_INFO.role}
                </p>
              </div>

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                {PERSONAL_INFO.tagline}. Pursuing MCA at <strong className="text-[#22C55E] font-bold">College of Engineering Guindy (Anna University)</strong>. 
                I write clean server architectures and construct modern React frontends.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-6 py-3 border-2 border-black bg-[#22C55E] hover:bg-[#1ebd5a] text-black font-display font-extrabold uppercase tracking-wider text-sm flex items-center gap-2 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  View Projects
                  <ArrowUpRight className="w-4 h-4 stroke-[3px]" />
                </a>

                <a
                  href="#contact"
                  className="px-6 py-3 border-2 border-neutral-700 bg-[#161616] hover:bg-neutral-800 text-white font-display font-extrabold uppercase tracking-wider text-sm flex items-center gap-2 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  Contact Me
                </a>
              </div>

              {/* Social Quick Links */}
              <div className="flex items-center gap-4 pt-4 border-t-2 border-neutral-850 w-fit">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#121212] hover:bg-neutral-900 border-2 border-neutral-800 text-neutral-400 hover:text-[#22C55E] transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#121212] hover:bg-neutral-900 border-2 border-neutral-800 text-neutral-400 hover:text-[#22C55E] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <span className="text-neutral-800">|</span>
                <span className="text-xs font-mono text-[#22C55E] font-bold">{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Right Terminal Graphic Column */}
            <div className="lg:col-span-5 relative w-full">
              {/* Backglow glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#22C55E]/10 to-emerald-950/10 blur-xl animate-pulse" />
              
              <div className="relative bg-[#0E0E0E] border-2 border-neutral-800 shadow-2xl">
                {/* Header buttons */}
                <div className="bg-[#161616] px-4 py-3 border-b-2 border-neutral-800 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-none bg-rose-600 block" />
                    <span className="w-2.5 h-2.5 rounded-none bg-amber-500 block" />
                    <span className="w-2.5 h-2.5 rounded-none bg-[#22C55E] block" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-wider">terminal.js</span>
                </div>
                
                {/* Typewriter Text area */}
                <div className="p-5 font-mono text-xs sm:text-sm text-left leading-relaxed h-[210px] overflow-y-auto bg-black text-neutral-300">
                  <span className="text-[#22C55E] font-bold">~/suja-portfolio $</span> <span className="text-neutral-500">cat profile.json</span>
                  <pre className="text-neutral-200 mt-2 whitespace-pre-wrap">
                    {terminalText}
                    <span className="animate-ping text-[#22C55E]">_</span>
                  </pre>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="py-24 px-6 border-t-2 border-neutral-800 bg-[#0E0E0E]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Heading & Large Summary */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <span className="text-xs font-bold text-[#22C55E] uppercase tracking-widest font-mono block">
                  // 01 / BACKGROUND
                </span>
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase leading-none">
                  Professional Profile &amp; Passion
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed text-justify">
                  I believe software is most valuable when it bridges advanced computation with fluid human layouts. 
                  My academic foundations from <span className="text-white font-medium">Anna University</span> merged with deep, hands-on architectural design allow me to construct tools that are scalable on the back end and engaging on the front end.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setResumeOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 border-2 border-black bg-[#22C55E] hover:bg-[#1ebd5a] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all active:translate-y-0.5 animate-none"
                  >
                    <Download className="w-3.5 h-3.5 stroke-[2.5px]" />
                    Download / Print Resume
                  </button>
                </div>
              </div>

              {/* Right Column: Key Details */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <div className="bg-[#121212] border-2 border-neutral-800 p-6 hover:border-neutral-700 transition-all">
                  <h4 className="font-display font-black text-white text-base uppercase tracking-tight">// Analytical Thinker</h4>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Strong foundational expertise in programming languages including Java, C, and Python, built on algorithms and mathematical principles.
                  </p>
                </div>

                <div className="bg-[#121212] border-2 border-neutral-800 p-6 hover:border-neutral-700 transition-all">
                  <h4 className="font-display font-black text-white text-base uppercase tracking-tight">// Full-Stack Architect</h4>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Skilled in setting up secure Express.js servers with JSON Web Tokens, querying document and relational database models, and constructing state managers.
                  </p>
                </div>

                <div className="bg-[#121212] border-2 border-neutral-800 p-6 hover:border-neutral-700 transition-all">
                  <h4 className="font-display font-black text-white text-base uppercase tracking-tight">// Computer Vision Enthusiast</h4>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    Interested in real-time frame scanning pipelines. Experienced with facial detection coordinates, biometric mapping, and Tkinter application controls.
                  </p>
                </div>

                <div className="bg-[#121212] border-2 border-neutral-800 p-6 hover:border-[#22C55E] transition-all">
                  <h4 className="font-display font-black text-[#22C55E] text-base uppercase tracking-tight">🏆 Top Performer</h4>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Awarded Gold Medal for Bachelor of Computer Applications with 9.32 CGPA, maintaining exemplary record of academic and practical execution.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section id="skills" className="py-24 px-6 border-t-2 border-neutral-800 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-2 mb-16">
              <span className="text-xs font-bold text-[#22C55E] uppercase tracking-widest font-mono block">
                // 02 / CAPABILITIES
              </span>
              <h3 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
                Technical Stack &amp; Core Tooling
              </h3>
              <p className="text-sm text-neutral-400 max-w-xl mx-auto">
                Hover over cards to view experience ratings, structured dynamically to scale and operate responsive modern software systems.
              </p>
            </div>

            {/* Skills Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILL_CATEGORIES.map((category, catIdx) => (
                <div 
                  key={catIdx}
                  className="bg-[#121212] border-2 border-neutral-800 p-6 flex flex-col justify-between space-y-6 hover:border-[#22C55E] transition-all text-left"
                >
                  <h4 className="text-xs font-display font-extrabold uppercase tracking-wider text-[#22C55E] pb-2 border-b-2 border-neutral-800">
                    {category.title}
                  </h4>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, sIdx) => {
                      const IconComponent = ICON_MAP[skill.iconName] || Code2;
                      return (
                        <div key={sIdx} className="group cursor-default">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-neutral-200 group-hover:text-white transition-colors flex items-center gap-1.5">
                              <IconComponent className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#22C55E] transition-colors" />
                              {skill.name}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500 group-hover:text-[#22C55E] transition-colors font-bold">
                              {skill.level}%
                            </span>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="h-1.5 bg-neutral-900 overflow-hidden">
                            <div 
                              className="h-full bg-[#22C55E] group-hover:bg-[#4ade80] transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROJECTS SECTION */}
        <section id="projects" className="py-24 px-6 border-t-2 border-neutral-800 bg-[#0E0E0E]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-2 mb-16">
              <span className="text-xs font-bold text-[#22C55E] uppercase tracking-widest font-mono block">
                // 03 / WORK DEMONSTRATION
              </span>
              <h3 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
                Featured Creative Architectures
              </h3>
              <p className="text-sm text-neutral-400 max-w-xl mx-auto">
                No dead links. Launch interactive mock simulator panels directly beneath each card to test-drive features live in the browser.
              </p>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PROJECTS.map((proj, idx) => (
                <div 
                  key={proj.id}
                  className="bg-[#121212] border-2 border-neutral-800 p-6 flex flex-col justify-between h-full hover:border-[#22C55E] transition-all relative text-left"
                >
                  <div className="space-y-4">
                    {/* Placeholder image representation */}
                    <div className="aspect-video bg-black border-2 border-neutral-800 overflow-hidden relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:12px_12px] opacity-60" />
                      
                      <Terminal className="w-10 h-10 text-neutral-850 opacity-80" />
                      <div className="absolute bottom-3 right-3 bg-black text-[9px] font-mono text-[#22C55E] font-bold px-2 py-0.5 border-2 border-[#22C55E]">
                        {proj.category.toUpperCase()}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-display font-black text-white uppercase tracking-tight">{proj.title}</h4>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed min-h-[48px]">{proj.description}</p>
                    </div>

                    {/* Technical badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tech.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="bg-black border-2 border-neutral-800 text-[10px] font-mono text-neutral-300 px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-6 border-t-2 border-neutral-800/60 pt-4">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2.5 border-2 border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 text-neutral-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub URL
                    </a>

                    <button
                      onClick={() => toggleDemo(proj.id)}
                      className={`px-3 py-2.5 border-2 text-xs font-display font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                        activeDemo === proj.id
                          ? 'bg-rose-950/60 border-rose-600 text-rose-300 hover:bg-rose-900/40'
                          : 'bg-[#22C55E] hover:bg-[#1ebd5a] border-black text-black'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {activeDemo === proj.id ? 'Close Sandbox' : 'Live Demo'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* EXPANDABLE SIMULATOR SECTION */}
            <AnimatePresence>
              {activeDemo && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="mt-12 text-left"
                >
                  <div className="border-2 border-neutral-800 bg-[#121212] p-1.5 mb-2 max-w-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-none bg-[#22C55E] animate-ping ml-2 shrink-0" />
                    <span className="text-[10px] font-mono text-[#22C55E] font-bold">ACTIVE PLAYGROUND: {PROJECTS.find(p => p.id === activeDemo)?.title.toUpperCase()}</span>
                  </div>

                  {activeDemo === 'codequest' && <CodeQuestSimulator />}
                  {activeDemo === 'attendance' && <AttendanceSimulator />}
                  {activeDemo === 'portfolio' && (
                    <div id="demo-portfolio" className="p-8 bg-[#121212] border-2 border-neutral-800 text-center text-sm text-neutral-400">
                      <Sparkles className="w-8 h-8 text-[#22C55E] mx-auto mb-3" />
                      <p className="font-display font-black text-white uppercase tracking-tight">Infinite Recursion Shield Triggered</p>
                      <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1">
                        You are currently viewing this portfolio, complete with fluid Framer Motion animations, local storage databases, and high-fidelity simulated containers. Explore around!
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* 5. EXPERIENCE & EDUCATION SECTION */}
        <section id="education" className="py-24 px-6 border-t-2 border-neutral-800 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Timeline details */}
              <div className="lg:col-span-7 text-left space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#22C55E] uppercase tracking-widest font-mono block">
                    // 04 / HISTORIC PROGRESSION
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase leading-none mt-1">
                    Academic Milestones
                  </h3>
                </div>

                {/* Vertical Timeline */}
                <div className="relative border-l-2 border-neutral-800 pl-6 sm:pl-10 space-y-12">
                  {TIMELINE.map((edu) => (
                    <div key={edu.id} className="relative group">
                      
                      {/* Timeline Dot Indicator */}
                      <span className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-4 h-4 bg-black border-2 border-[#22C55E] z-10 group-hover:bg-[#22C55E] transition-colors" />

                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-lg font-display font-black text-white uppercase tracking-tight group-hover:text-[#22C55E] transition-colors">
                            {edu.title}
                          </h4>
                          <span className="text-xs font-mono font-bold text-neutral-400 bg-[#121212] border-2 border-neutral-800 px-2 py-0.5">
                            {edu.period.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 font-bold uppercase tracking-wide">
                          <span>{edu.organization}</span>
                          <span className="text-[#22C55E] font-extrabold">{edu.gpaOrDetails}</span>
                        </div>

                        <ul className="list-disc list-outside pl-4 text-xs text-neutral-400 leading-relaxed space-y-1 pt-1.5">
                          {edu.highlights.map((hl, idx) => (
                            <li key={idx}>{hl}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Certifications & badging */}
              <div className="lg:col-span-5 text-left space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#22C55E] uppercase tracking-widest font-mono block">
                    // CREDENTIALS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight uppercase leading-none mt-1">
                    Industry Certifications
                  </h3>
                </div>

                <div className="space-y-4">
                  {CERTIFICATIONS.map((cert) => (
                    <div 
                      key={cert.id}
                      className="bg-[#121212] border-2 border-neutral-800 hover:border-[#22C55E] p-4 flex items-start gap-4 transition-all"
                    >
                      <div className="p-2.5 bg-black border-2 border-neutral-800 text-[#22C55E] shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-display font-extrabold text-white uppercase tracking-tight leading-snug">{cert.title}</h4>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">{cert.issuer.toUpperCase()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. CONTACT SECTION */}
        <section id="contact" className="py-24 px-6 border-t-2 border-neutral-800 bg-[#0E0E0E]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Side: Contact Information & Social channels */}
              <div className="lg:col-span-5 text-left space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#22C55E] uppercase tracking-widest font-mono block">
                    // 05 / GET IN TOUCH
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase leading-none mt-1">
                    Let's Connect &amp; Collaborate
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mt-2">
                    I'm currently seeking Software Engineering positions and collaborative full-stack projects. Feel free to shoot me an email, call directly, or use the interactive form.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-black border-2 border-neutral-800 text-[#22C55E]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 font-mono font-bold block">// EMAIL ADDRESS</span>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-semibold text-white hover:text-[#22C55E] transition-colors">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-black border-2 border-neutral-800 text-[#22C55E]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 font-mono font-bold block">// PHONE NUMBER</span>
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-semibold text-white hover:text-[#22C55E] transition-colors">
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-black border-2 border-neutral-800 text-[#22C55E]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 font-mono font-bold block">// LOCATION</span>
                      <span className="text-sm font-semibold text-white">
                        {PERSONAL_INFO.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social media connections */}
                <div className="space-y-2 pt-4 border-t-2 border-neutral-800">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block font-mono">
                    Follow Me Around The Web:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href={PERSONAL_INFO.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#121212] hover:bg-neutral-900 border-2 border-neutral-800 text-xs text-neutral-300 font-bold uppercase tracking-wider transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#22C55E]" />
                      LinkedIn
                    </a>

                    <a 
                      href={PERSONAL_INFO.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#121212] hover:bg-neutral-900 border-2 border-neutral-800 text-xs text-neutral-300 font-bold uppercase tracking-wider transition-colors"
                    >
                      <Github className="w-4 h-4 text-neutral-200" />
                      GitHub
                    </a>

                    <a 
                      href={PERSONAL_INFO.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#121212] hover:bg-neutral-900 border-2 border-neutral-800 text-xs text-neutral-300 font-bold uppercase tracking-wider transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-[#22C55E]" />
                      Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Contact Form Submission */}
              <div className="lg:col-span-7 space-y-6">
                <form 
                  onSubmit={handleContactSubmit}
                  className="bg-[#121212] border-2 border-neutral-800 p-6 sm:p-8 text-left space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name-input" className="text-xs font-bold text-[#22C55E] font-mono block">
                        // NAME / ORGANISATION
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-black border-2 border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-700 focus:outline-none focus:border-[#22C55E] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email-input" className="text-xs font-bold text-[#22C55E] font-mono block">
                        // EMAIL ADDRESS
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-black border-2 border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-700 focus:outline-none focus:border-[#22C55E] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message-input" className="text-xs font-bold text-[#22C55E] font-mono block">
                      // YOUR MESSAGE
                    </label>
                    <textarea
                      id="message-input"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Suja, I'd love to chat about software engineering options..."
                      className="w-full px-4 py-3 bg-black border-2 border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-700 focus:outline-none focus:border-[#22C55E] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 border-2 border-black bg-[#22C55E] hover:bg-[#1ebd5a] disabled:opacity-50 text-black font-display font-black uppercase tracking-wider text-sm transition-all active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? 'Transmitting data packet...' : 'Transmit Message'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-emerald-950/40 border-2 border-[#22C55E] text-[#22C55E] rounded-none text-xs flex items-start gap-2.5 font-mono"
                      >
                        <CheckCircle className="w-5 h-5 shrink-0" />
                        <div>
                          <p className="font-bold">Message Transmitted Successfully!</p>
                          <p className="text-[#22C55E]/80 mt-0.5">Your submission has been captured in local storage and is logged in the administrative panel below.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Local storage inbox logs */}
                <InboxViewer onMessageCountChange={setInboxCount} />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t-2 border-neutral-800 bg-black py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-left">
            <span className="w-6 h-6 rounded-none bg-[#22C55E] flex items-center justify-center text-black font-display font-black text-xs">
              S
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              © {new Date().getFullYear()} Suja A. All rights reserved. Built with React &amp; Tailwind CSS.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a href="#home" className="text-neutral-500 hover:text-[#22C55E] transition-colors font-bold uppercase tracking-wider">BACK TO TOP ↑</a>
          </div>
        </div>
      </footer>

      {/* MODAL POPUPS */}
      <AnimatePresence>
        {resumeOpen && (
          <ResumeViewer isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
