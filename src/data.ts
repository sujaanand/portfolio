import { Project, SkillCategory, TimelineItem, Certification } from './types';

export const PERSONAL_INFO = {
  name: 'Suja A',
  role: 'Software Engineer',
  tagline: 'Building Scalable, User-Centric Full-Stack Solutions',
  summary: 'Aspiring Software Engineer pursuing an MCA at College of Engineering Guindy, Anna University. Skilled in Java, JavaScript, TypeScript, HTML, CSS, React, Node.js, and MongoDB through hands-on full-stack projects. Passionate about developing scalable, user-centric software solutions and continuously improving technical skills.',
  email: 'sujajubiya15@gmail.com',
  phone: '+91 9840242923',
  location: 'Chennai, Tamil Nadu',
  linkedin: 'https://linkedin.com/in/suja-a',
  github: 'https://github.com/sujaanand',
  instagram: 'https://instagram.com',
  resumeUrl: '#'
};

export const PROJECTS: Project[] = [
  {
    id: 'codequest',
    title: 'CodeQuest',
    description: 'A gamified programming learning platform built with MERN stack & TypeScript.',
    longDescription: 'CodeQuest is an engaging full-stack programming platform that gamifies computer science education. It features interactive coding levels, XP rewards, automated code verification, live leaderboards, and user statistics tracking.',
    tech: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
    githubUrl: 'https://github.com/sujaanand/CodeQuest-Gamified-Learning',
    demoUrl: '#demo-codequest',
    category: 'Full-Stack',
    features: [
      'Developed a full-stack gamified programming learning platform using React, TypeScript, Node.js, Express.js, and MongoDB.',
      'Implemented secure authentication, level progression, XP rewards, leaderboard, and REST API integration.',
      'Collaborated in frontend development, backend integration, testing, debugging, and version control using Git.'
    ]
  },
  {
    id: 'attendance',
    title: 'Face Recognition Smart Attendance System',
    description: 'An automated attendance system utilizing OpenCV facial recognition algorithms.',
    longDescription: 'A smart desktop-based application replacing manual class rolls with instant camera face verification. It captures live video streams, matches face coordinates against database profiles, and logs student entry timestamps automatically.',
    tech: ['Python', 'OpenCV', 'MySQL', 'Tkinter'],
    githubUrl: 'https://github.com/sujaanand/Face-Recognition-Attendance-System',
    demoUrl: '#demo-attendance',
    category: 'Python & AI',
    features: [
      'Developed a face recognition-based attendance management system using Python, OpenCV, MySQL, and Tkinter.',
      'Implemented facial image capture, real-time recognition, and automated attendance recording.',
      'Integrated MySQL for student management and designed an interactive, clean desktop interface.'
    ]
  },
  {
    id: 'portfolio',
    title: 'Polished Interactive Portfolio',
    description: 'This responsive portfolio website featuring interactive sandbox simulators.',
    longDescription: 'A highly functional and visually stunning single-page portfolio containing interactive web simulator modules for each major project, an in-browser print-ready resume visualizer, and a locally persistent message inbox system.',
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
    githubUrl: 'https://github.com/sujaanand',
    demoUrl: '#',
    category: 'Frontend',
    features: [
      'Engineered a desktop-first fluid layout with elegant micro-interactions using Tailwind CSS v4.',
      'Created custom functional simulators (CodeQuest interactive level play, Attendance face recognition simulator) directly inside the browser.',
      'Integrated an administrative Inbox to view actual contact messages stored locally.'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', level: 85, iconName: 'Coffee' },
      { name: 'JavaScript', level: 90, iconName: 'Code2' },
      { name: 'TypeScript', level: 85, iconName: 'FileJson' },
      { name: 'Python', level: 80, iconName: 'Binary' },
      { name: 'C', level: 75, iconName: 'Cpu' },
      { name: 'SQL', level: 80, iconName: 'Database' }
    ]
  },
  {
    title: 'Frontend & UI',
    skills: [
      { name: 'React.js', level: 90, iconName: 'Atom' },
      { name: 'HTML5', level: 95, iconName: 'FileCode' },
      { name: 'CSS3', level: 90, iconName: 'Palette' },
      { name: 'Tailwind CSS', level: 95, iconName: 'Wind' },
      { name: 'Responsive Web Design', level: 95, iconName: 'MonitorSmartphone' }
    ]
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Node.js', level: 80, iconName: 'Server' },
      { name: 'Express.js', level: 80, iconName: 'Network' },
      { name: 'REST APIs', level: 85, iconName: 'Settings2' },
      { name: 'MongoDB', level: 80, iconName: 'Leaf' },
      { name: 'MySQL', level: 85, iconName: 'DatabaseBackup' }
    ]
  },
  {
    title: 'Cloud & Tools',
    skills: [
      { name: 'Git & GitHub', level: 90, iconName: 'GitBranch' },
      { name: 'VS Code', level: 95, iconName: 'Terminal' },
      { name: 'Arduino IDE', level: 65, iconName: 'CircuitBoard' },
      { name: 'OpenCV', level: 70, iconName: 'Eye' }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'mca',
    title: 'Master of Computer Applications (MCA)',
    organization: 'College of Engineering Guindy, Anna University',
    period: '2025 – 2027 (Expected)',
    gpaOrDetails: 'CGPA: 7.94 / 10 (Current till Sem 1)',
    highlights: [
      'Pioneering engineering institute in India',
      'Advanced coursework in Algorithms, Cloud Computing, Database Architectures, and Full-Stack Engineering'
    ],
    type: 'education'
  },
  {
    id: 'bca',
    title: 'Bachelor of Computer Applications (BCA)',
    organization: 'Vels Institute of Science, Technology & Advanced Studies (VISTAS), Chennai',
    period: '2021 – 2024',
    gpaOrDetails: 'CGPA: 9.32 / 10 (Gold Medalist)',
    highlights: [
      'Graduated at the top of the department (Gold Medalist) for outstanding academic excellence',
      'Acquired comprehensive core foundations in OOP, Data Structures, Web Design, and Database Systems'
    ],
    type: 'education'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-mern',
    title: 'MERN Stack Development Certification',
    issuer: 'Revamp Academy - Online'
  },
  {
    id: 'cert-python',
    title: 'Python Programming Certification Course',
    issuer: 'Vels University'
  },
  {
    id: 'cert-c',
    title: 'C Programming Certification',
    issuer: 'CADD Institution'
  },
  {
    id: 'cert-cpp',
    title: 'C++ Programming Certification',
    issuer: 'CADD Institution'
  }
];
