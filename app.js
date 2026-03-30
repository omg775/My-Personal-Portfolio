/* ═══════════════════════════
   HELPERS
═══════════════════════════ */
function isMobileView() {
  return window.matchMedia("(max-width: 640px)").matches;
}

function resetWindowPosition(winEl) {
  if (!winEl) return;
  winEl.classList.remove('win-positioned', 'win-dragging');
  winEl.style.left = '';
  winEl.style.top = '';
  winEl.style.transform = '';
  winEl.style.translate = '';
  winEl.style.animation = '';
}

/* ═══════════════════════════
   BOOT SCREEN INIT
═══════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const bootScreen = document.getElementById("bootScreen");
  const bootProgressBar = document.getElementById("bootProgressBar");

  if (bootScreen && bootProgressBar) {
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      bootProgressBar.style.width = "100%";
    }, 100);

    setTimeout(() => {
      bootScreen.style.opacity = "0";
      setTimeout(() => {
        bootScreen.remove();
        document.body.style.overflow = "";
      }, 800);
    }, 2500);
  }
});

/* ═══════════════════════════
   DATA
═══════════════════════════ */
const PROJECTS = [
  {
    icon: '🧠',
    title: 'Medinoted AI',
    desc: 'AI-powered clinical note cleaner and health diary platform with voice transcription, SOAP formatting, sentiment tracking, and intelligent health insights.',
    stack: ['Python', 'Streamlit', 'Azure OpenAI', 'Whisper', 'Azure'],
    cat: 'fullstack',
    github: 'https://github.com/omg775/Medinoted-AI',
  },
  {
    icon: '⚡',
    title: 'Clarity AI',
    desc: 'Chrome extension that summarizes notes, extracts key insights, and suggests related topics using AI, with a Spring Boot backend for fast processing.',
    stack: ['Java', 'Spring Boot', 'Gemini API', 'Chrome Extension', 'JavaScript'],
    cat: 'tool',
    github: 'https://github.com/omg775/ClarityAI',
  },
  {
    icon: '🧩',
    title: 'Real-time Collaborative Whiteboard',
    desc: 'Distributed whiteboard system showcasing multiple architectures including RPC, RMI, P2P, and WebSockets for real-time collaboration.',
    stack: ['Java', 'Node.js', 'Socket.io', 'TCP/UDP', 'AWS'],
    cat: 'backend',
    github: 'https://github.com/omg775/Real-time-Collaborative-Whiteboard',
  },
  {
    icon: '🖥️',
    title: 'My Personal Portfolio',
    desc: 'Interactive macOS-style portfolio with draggable windows, desktop UI, widgets, and a mini-game for an engaging user experience.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    cat: 'frontend',
    github: 'https://github.com/omg775/My-Personal-Portfolio',
  },
  {
    icon: '📅',
    title: 'Simulation-Based System for Automated Network Traffic Anomaly Detection',
    desc: 'Designed and implemented a simulation-based system for automated network traffic anomaly detection, utilizing machine learning algorithms to identify and classify potential security threats in real-time.',
    stack: ['Spring Boot', 'PostgreSQL', 'Hibernate', 'Embedded Tomcat', 'Apache Commons Csv'],
    cat: 'backend',
    github: 'https://github.com/omg775/AnomalyDetectionApplication',
  
  }
];

const CERTIFICATES = [
  { title: 'Java Course', org: 'NIX Europe', date: 'Feb 2026', desc: 'Focused on core Java concepts, object-oriented programming, and backend fundamentals.' },
  { title: 'HSUP – Startup Fundamentals Program', org: 'Hungarian Startup University Program', date: 'Dec 2025', desc: 'Learned entrepreneurship, business planning, and innovation in a startup-focused environment.' },
  { title: 'Skyscanner – Front-End Engineering Job Simulation', org: 'Forage', date: 'Jan 2026', desc: 'Built a React-based web application in a real-world frontend engineering simulation.' },
  { title: 'Commonwealth Bank – Software Engineering Simulation', org: 'Forage', date: 'Jan 2026', desc: 'Worked on web development and cybersecurity tasks in a simulated enterprise environment.' },
  { title: 'Master Java, Spring & Microservices', org: 'Telusko', date: '2026', desc: 'Covered Spring Boot, Spring Security, microservices architecture, Docker, and backend system design.' },
];

const EDUCATION = {
  institution: 'University of Dunaújváros',
  degree: 'BSc Computer Science',
  date: '2023 – 2027',
  gpa: '4.7 / 5.0',
  desc: 'Focused on software engineering, data structures, algorithms, and distributed systems while building real-world projects.',
  highlights: [
    'Won TDK Talent Day two years in a row',
    'Won Google Developers competition among Hungarian universities',
    'Founded a Computer Science club',
    'Participant in Hungarian Startup University Program (HSUP)'
  ]
};

const ACHIEVEMENTS = [
  { title: 'Won Google Developers Competition', desc: 'Ranked among top participants in a university-level development competition in Hungary.' },
  { title: 'TDK Talent Day Winner (2x)', desc: 'Won university talent competition two consecutive years.' },
  { title: 'Founded Computer Science Club', desc: 'Created and led a student community focused on programming and collaboration.' },
  { title: 'Built Full-Stack & AI Projects', desc: 'Developed multiple projects using React, Spring Boot, and AI APIs.' },
  { title: 'Completed Advanced Certifications', desc: 'Completed certifications in Java, Spring Boot, frontend engineering, and software simulations.' },
];

const CONTACTS = [
  { icon: 'assets/mail-icon.png', label: 'Email', value: 'omgawde775@gmail.com', href: 'mailto:omgawde775@gmail.com', bg: 'transparent' },
  { icon: 'assets/linkedin-icon.png', label: 'LinkedIn', value: 'linkedin.com/in/om-gawde', href: 'https://www.linkedin.com/in/om-gawde-692073272/', bg: 'transparent' },
  { icon: 'assets/github-icon.png', label: 'GitHub', value: 'github.com/omg775', href: 'https://github.com/omg775', bg: 'transparent' },
];

const RESUME_DATA = {
  name: "OM GAWDE",
  contact: {
    email: "omgawde775@gmail.com",
    phone: "H: +36707417255 | M: +36707417255",
    address: "Ulloi ut 61, Budapest Hungary",
    linkedin: "https://www.linkedin.com/in/omgawde/",
    github: "https://github.com/omg775"
  },
  summary: "Computer Science student with a strong foundation in programming, problem-solving, and software development. Familiar with Java, frontend technologies, and AI concepts, with hands-on experience through projects, camps, and practical learning. Motivated to apply technical skills in real-world applications and continue growing as a developer.",
  experience: [
    {
      role: "Camp Counsellor",
      org: "Camp America",
      date: "Jun 2025 - Aug 2025",
      desc: "Worked as a Resident Counselor in the United States during the summer, where I supported incoming students by helping them transition into university life. Responsibilities included assisting with orientation, accommodation, and day-to-day guidance to ensure students settled smoothly into their new academic environment. The role required strong communication and interpersonal skills while working with diverse cultural backgrounds. Additionally, I had the opportunity to attend selected classes at various universities, gaining exposure to different academic systems and teaching styles."
    },
    {
      role: "Data Analyst",
      org: "Cretech Engineering",
      date: "2022 - 2023",
      desc: "Worked as a Data Analyst at Cretech, where I created and maintained Excel spreadsheets to analyze company data and support decision-making. Assisted the accounting department by organizing financial records, tracking expenses, and ensuring data accuracy. Gained practical experience in data handling, reporting, and cross-department collaboration before beginning my Bachelor's studies in Hungary."
    }
  ],
  education: {
    institution: "UNIVERSITY OF DUNAUJVAROS",
    degree: "Bachelors in Computer Science Engineering",
    desc: "Achieved consecutive wins at science fairs by designing an aviation radar system, demonstrating strong programming and problem-solving skills. Co-founded a Computer Science Club, growing a collaborative tech community, and won the Google Developer Student Clubs (GDSC) competition against teams from multiple Hungarian universities, highlighting technical excellence, teamwork, and leadership."
  },
  certifications: [
    { title: "Java Course — NIX Europe (Feb 2026)", desc: "Covered core Java, OOP principles, and backend fundamentals." },
    { title: "Startup Fundamentals Program (HSUP) — Hungarian Startup University (Dec 2025)", desc: "Gained knowledge in entrepreneurship, business strategy, and innovation." },
    { title: "Front-End Engineering Job Simulation — Skyscanner (Forage) (Jan 2026)", desc: "Built a React-based application in a real-world frontend engineering simulation." },
    { title: "Software Engineering Job Simulation — Commonwealth Bank (Forage) (Jan 2026)", desc: "Completed tasks in web development and cybersecurity within a simulated enterprise environment." },
    { title: "Master Java, Springboot, SpringAI, Docker & Microservices — Telusko (2026)", desc: "Learned Spring Boot, Spring Security, microservices architecture, and Docker." }
  ],
  skills: {
    languages: "Java, Python",
    frameworks: "Spring, Hibernate, React, React Native, Streamlit",
    databases: "PostgreSQL, MySQL, SQLite, Supabase",
    devops: "Git, GitHub, GitLab, GitHub Actions, Docker, AWS, Azure, Vercel, Netlify",
    tools: "Windows Terminal, Bash Scripting, Apache Maven, Apache Tomcat, Vite, Postman",
    design: "Figma, Canva, Adobe Illustrator"
  },
  projects: [
    {
      title: "Clarity AI — Chrome Extension + Spring Boot Backend",
      bullets: [
        "Built an AI-powered Chrome extension to summarize notes, extract key insights, and suggest related topics using the Gemini API.",
        "Developed a scalable backend with Spring Boot and integrated real-time API processing for fast responses."
      ]
    },
    {
      title: "Medinoted AI — Full-Stack AI Health Platform",
      bullets: [
        "Developed a clinical note cleaner and AI health diary with voice transcription, SOAP formatting, and sentiment analysis.",
        "Implemented speech-to-text using Whisper and generated insights using Azure OpenAI, with data visualization for tracking user health trends."
      ]
    },
    {
      title: "Real-Time Collaborative Whiteboard — Distributed Systems Project",
      bullets: [
        "Designed a real-time whiteboard system exploring multiple architectures including RPC, RMI, P2P, and WebSockets.",
        "Implemented scalable communication models and demonstrated system design concepts such as distributed state and real-time synchronization."
      ]
    }
  ],
  awards: "Google Developer Student Clubs (GDSC) Competition Winner. Won against teams from multiple Hungarian universities, demonstrating technical excellence, teamwork, and leadership."
};

const NOW_STATUS = [
  {
    title: "Building",
    color: "green",
    desc: "Developing a production-ready Spring Boot microservices system with JWT authentication, Redis session management, and Docker deployment.",
    tags: ["Spring Boot", "Redis", "JWT", "Docker"]
  },
  {
    title: "Learning",
    color: "purple",
    desc: "Deep dive into system design concepts including distributed systems, consistent hashing, CAP theorem, and advanced Java concurrency patterns.",
    tags: ["System Design", "Distributed Systems", "Java Concurrency"]
  },
  {
    title: "Focus",
    color: "blue",
    desc: "Targeting backend-focused internship opportunities where I can build scalable systems and work on developer tools or fintech infrastructure.",
    tags: ["Backend", "Microservices", "Fintech"]
  }
];

const BUILD_LAB = [
  {
    title: "Dev Tools Dashboard",
    cat: "SaaS",
    status: "Planning",
    desc: "Unified dashboard for developers combining GitHub activity, CI/CD status, and deployment logs.",
    link: "https://github.com/features/actions"
  },
  {
    title: "Spring Boot Starter Kit",
    cat: "Open Source",
    status: "Idea",
    desc: "Pre-configured Spring Boot template with authentication, logging, rate limiting, and Docker setup.",
    link: "https://spring.io/projects/spring-boot"
  },
  {
    title: "Code Snippet Manager",
    cat: "Productivity",
    status: "Exploring",
    desc: "A searchable snippet vault with tagging, editor integrations, and local-first storage.",
    link: "https://www.raycast.com/extensions/snippets"
  },
  {
    title: "PR Review Assistant",
    cat: "AI",
    status: "Planning",
    desc: "Tool that analyzes pull requests for code quality, performance issues, and security risks using AI.",
    link: "https://github.com/features/code-review"
  },
  {
    title: "API Diffing Tool",
    cat: "Dev Tool",
    status: "Idea",
    desc: "Compare API versions and generate changelogs with breaking changes highlighted automatically.",
    link: "https://swagger.io/tools/swagger-diff/"
  },
  {
    title: "Developer Portfolio OS",
    cat: "Community",
    status: "Exploring",
    desc: "A customizable system for building interactive, OS-style developer portfolios.",
    link: "https://github.com/topics/portfolio"
  }
];

const SKILLS = [
  { cat: 'Languages', items: ['Java', 'PHP', 'Octave'] },
  { cat: 'Frameworks & Libraries', items: ['Spring', 'Hibernate', 'React', 'React Native', 'Streamlit'] },
  { cat: 'Databases', items: ['Postgres', 'MySQL', 'SQLite', 'Supabase'] },
  { cat: 'DevOps & Cloud', items: ['Git', 'GitHub', 'GitLab', 'GitHub Actions', 'Docker', 'AWS', 'Azure', 'Vercel', 'Netlify'] },
  { cat: 'Tools & Environments', items: ['Windows Terminal', 'Bash Script', 'Apache Maven', 'Apache Tomcat', 'Vite', 'Postman'] },
  { cat: 'Design', items: ['Figma', 'Canva', 'Adobe Illustrator'] },
];

/* ═══════════════════════════
   STATE
═══════════════════════════ */
let activeWindowId = null;
let activeDockId = null;
let terminalDone = false;
let _winZ = 120;
let resumeRendered = false;
let notesInited = false;
let contactsRendered = false;
let projectsRendered = false;
let kaboomInst = null;

/* ═══════════════════════════
   CANVAS: STARS
═══════════════════════════ */
(function initStars() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const a = s.a * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(ts => draw(ts / 1000));
  }

  window.addEventListener('resize', resize);
  resize();
  draw(0);
})();

/* ═══════════════════════════
   CLOCK
═══════════════════════════ */
function tick() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = (h % 12) || 12;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const mos = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const el = document.getElementById('menuClock');
  if (el) el.textContent = `${days[now.getDay()]} ${mos[now.getMonth()]} ${now.getDate()}  ${h12}:${m} ${ampm}`;
}
tick();
setInterval(tick, 1000);

/* ═══════════════════════════
   WINDOW MANAGEMENT
═══════════════════════════ */
const DOCK_MAP = {
  projectsWindow: 'dockFinder',
  aboutWindow: 'dockSafari',
  skillsWindow: 'dockTerminal',
  experienceWindow: 'dockNotes',
  contactWindow: 'dockMail',
  resumeWindow: 'dockPreview',
  arcadeWindow: 'dockArcade',
};

function bringToFront(winEl) {
  _winZ++;
  winEl.style.zIndex = _winZ;
}

function openWindow(winId, dockId) {
  const winEl = document.getElementById(winId);
  const dockEl = dockId ? document.getElementById(dockId) : null;
  if (!winEl) return;

  if (winEl.classList.contains('active')) {
    winEl.classList.remove('active');
    dockEl?.classList.remove('running');
    return;
  }

  document.getElementById('welcomeWindow')?.classList.remove('active');

  if (isMobileView()) {
    resetWindowPosition(winEl);
  }

  winEl.classList.add('active');
  dockEl?.classList.add('running');

  activeWindowId = winId;
  activeDockId = dockId || null;
  bringToFront(winEl);

  if (winId === 'projectsWindow') renderProjects();
  if (winId === 'experienceWindow') renderExperience();
  if (winId === 'contactWindow') renderContacts();
  if (winId === 'resumeWindow' && !resumeRendered) renderResume();
  if (winId === 'ideasWindow') renderBuildLab();
  if (winId === 'nowWindow') renderNow();
  if (winId === 'skillsWindow' && !terminalDone) setTimeout(animateTerminal, 180);
  if (winId === 'arcadeWindow') setTimeout(initPlatformerGame, 80);
}

function closeWindow(winId) {
  const winEl = document.getElementById(winId);
  if (!winEl) return;

  winEl.classList.remove('active');

  const dId = DOCK_MAP[winId] || activeDockId;
  if (dId) document.getElementById(dId)?.classList.remove('running');

  if (activeWindowId === winId) {
    activeWindowId = null;
    activeDockId = null;
  }
}

/* ═══════════════════════════
   RENDER: PROJECTS
═══════════════════════════ */
function renderProjects() {
  if (projectsRendered) return;
  projectsRendered = true;

  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  PROJECTS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.cat = p.cat;
    card.dataset.index = i;
    card.innerHTML = `
      <div class="pc-title">${p.title}</div>
      <p class="pc-desc">${p.desc}</p>
      <div class="pc-stack">${p.stack.map(s => `<span class="stack-pill">${s}</span>`).join('')}</div>
      <div class="pc-links">
        <a class="pc-link gh" href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a class="pc-link lv" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live</a>
      </div>
    `;
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px)';
    grid.appendChild(card);

    setTimeout(() => {
      card.style.transition = 'opacity .35s ease, transform .35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 65);
  });

  let currentCategory = 'all';
  let selectedTags = [];

  function updateFiltering() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      const cardCat = card.dataset.cat;
      const projectData = PROJECTS[card.dataset.index];

      const matchCat = currentCategory === 'all' || cardCat === currentCategory;
      const matchTags = selectedTags.length === 0 || selectedTags.every(t => projectData.stack.includes(t));
      const shouldShow = matchCat && matchTags;

      if (shouldShow) {
        card.style.display = '';
        requestAnimationFrame(() => card.classList.remove('hidden'));
      } else {
        card.classList.add('hidden');
        setTimeout(() => {
          if (card.classList.contains('hidden')) card.style.display = 'none';
        }, 300);
      }
    });
  }

  document.querySelectorAll('.sidebar-item[data-filter]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-item').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      currentCategory = el.dataset.filter;

      if (currentCategory === 'all') {
        selectedTags = [];
        document.querySelectorAll('.sidebar-tag').forEach(t => t.classList.remove('active'));
      }

      updateFiltering();
    });
  });

  document.querySelectorAll('.sidebar-tag[data-tag]').forEach(el => {
    el.addEventListener('click', () => {
      const tag = el.dataset.tag;
      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
        el.classList.remove('active');
      } else {
        selectedTags.push(tag);
        el.classList.add('active');
      }
      updateFiltering();
    });
  });
}

/* ═══════════════════════════
   VIEW TOGGLE
═══════════════════════════ */
function setProjectView(mode) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.classList.toggle('list-view', mode === 'list');
  document.getElementById('viewGrid')?.classList.toggle('active', mode === 'grid');
  document.getElementById('viewList')?.classList.toggle('active', mode === 'list');
}

/* ═══════════════════════════
   RENDER: EXPERIENCE
═══════════════════════════ */
function renderExperience() {
  if (notesInited) return;
  notesInited = true;

  const tabs = document.querySelectorAll('.notes-list-item[data-tab]');
  tabs.forEach(tabEl => {
    tabEl.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabEl.classList.add('active');
      renderNotesContent(tabEl.dataset.tab);
    });
  });

  renderNotesContent('certificates');
}

function renderNotesContent(tab) {
  const container = document.getElementById('expTimeline');
  const titleEl = document.querySelector('.notes-title');
  const dateEl = document.querySelector('.notes-date');
  if (!container || !titleEl || !dateEl) return;

  container.innerHTML = '';
  container.parentElement.scrollTop = 0;

  let content = [];
  let title = '';
  let countText = '';

  if (tab === 'certificates') {
    title = 'Certificates';
    content = CERTIFICATES;
    countText = `Updated March 2026 · ${CERTIFICATES.length} items`;
  } else if (tab === 'education') {
    title = 'Education';
    countText = `Updated March 2026 · 1 item`;
    const edu = EDUCATION;
    const el = document.createElement('div');
    el.className = 'edu-content';
    el.innerHTML = `
      <div class="edu-header">
        <div class="edu-institution">${edu.institution}</div>
        <div class="edu-degree">${edu.degree} · ${edu.date}</div>
        <div class="edu-gpa">GPA: ${edu.gpa}</div>
      </div>
      <p class="edu-desc">${edu.desc}</p>
      <div class="edu-highlights">
        <div class="edu-h-title">Highlights:</div>
        <ul>${edu.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
      </div>
    `;
    applyNoteAnimation(el, 0);
    container.appendChild(el);
  } else if (tab === 'achievements') {
    title = 'Achievements';
    content = ACHIEVEMENTS;
    countText = `Updated March 2026 · ${ACHIEVEMENTS.length} items`;
  }

  titleEl.textContent = title;
  dateEl.textContent = countText;

  if (tab !== 'education') {
    content.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'note-item';
      el.innerHTML = `
        <div class="note-item-header">
          <div class="note-item-title">${item.title}</div>
          ${item.date ? `<div class="note-item-date">${item.date}</div>` : ''}
        </div>
        ${item.org ? `<div class="note-item-org">${item.org}</div>` : ''}
        <p class="note-item-desc">${item.desc}</p>
      `;
      applyNoteAnimation(el, i);
      container.appendChild(el);
    });
  }
}

function applyNoteAnimation(el, index) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, index * 60 + 20);
}

/* ═══════════════════════════
   RENDER: CONTACTS
═══════════════════════════ */
function renderContacts() {
  if (contactsRendered) return;
  contactsRendered = true;

  const container = document.getElementById('mailLinks');
  if (!container) return;

  CONTACTS.forEach((c, i) => {
    const a = document.createElement('a');
    a.className = 'mail-link-item' + (i === 0 ? ' active' : '');
    a.href = c.href;
    a.target = '_blank';
    a.rel = 'noopener';

    a.innerHTML = `
      <div class="mli-icon" style="background:${c.bg}">
        <img src="${c.icon}" alt="${c.label}" style="width:100%;height:100%;object-fit:contain;border-radius:6px;display:block;" />
      </div>
      <div class="mli-info"><strong>${c.label}</strong><span>${c.value}</span></div>
      <span class="mli-arr">›</span>
    `;

    a.addEventListener('mousedown', () => {
      container.querySelectorAll('.mail-link-item').forEach(el => el.classList.remove('active'));
      a.classList.add('active');
    });

    container.appendChild(a);
  });
}

/* ═══════════════════════════
   RESUME
═══════════════════════════ */
function renderResume() {
  const container = document.getElementById('resumeContent');
  if (!container) return;

  const r = RESUME_DATA;
  container.innerHTML = `
    <header class="cv-header">
      <h1>${r.name}</h1>
      <div class="cv-contact">
        <p>${r.contact.email} | ${r.contact.phone}</p>
        <p>${r.contact.address}</p>
        <p>LinkedIn: <a href="${r.contact.linkedin}" target="_blank">${r.contact.linkedin}</a> | GitHub: <a href="${r.contact.github}" target="_blank">${r.contact.github}</a></p>
      </div>
    </header>

    <section class="cv-section">
      <h2 class="cv-section-title">SUMMARY</h2>
      <p class="cv-text">${r.summary}</p>
    </section>

    <section class="cv-section">
      <h2 class="cv-section-title">EXPERIENCE</h2>
      ${r.experience.map(exp => `
        <div class="cv-item">
          <div class="cv-item-header">
            <strong>${exp.org}, ${exp.role}</strong>
            <span class="cv-date">${exp.date}</span>
          </div>
          <p class="cv-text">${exp.desc}</p>
        </div>
      `).join('')}
    </section>

    <section class="cv-section">
      <h2 class="cv-section-title">EDUCATION</h2>
      <div class="cv-item">
        <div class="cv-item-header">
          <strong>${r.education.institution}</strong>
        </div>
        <p class="cv-sub">${r.education.degree}</p>
        <p class="cv-text">${r.education.desc}</p>
      </div>
    </section>

    <section class="cv-section">
      <h2 class="cv-section-title">LICENSES & CERTIFICATIONS</h2>
      ${r.certifications.map(c => `
        <div class="cv-item">
          <div class="cv-item-header" style="font-weight:700; font-size:13.5px; margin-bottom: 2px;">
            ${c.title}
          </div>
          <p class="cv-text">${c.desc}</p>
        </div>
      `).join('')}
    </section>

    <section class="cv-section">
      <h2 class="cv-section-title">SKILLS</h2>
      <ul class="cv-list">
        <li><strong>Languages:</strong> ${r.skills.languages}</li>
        <li><strong>Frameworks & Libraries:</strong> ${r.skills.frameworks}</li>
        <li><strong>Databases:</strong> ${r.skills.databases}</li>
        <li><strong>DevOps & Cloud:</strong> ${r.skills.devops}</li>
        <li><strong>Tools & Environments:</strong> ${r.skills.tools}</li>
        <li><strong>Design:</strong> ${r.skills.design}</li>
      </ul>
    </section>

    <section class="cv-section">
      <h2 class="cv-section-title">HONORS & AWARDS</h2>
      <p class="cv-text">${r.awards}</p>
    </section>

    <section class="cv-section">
      <h2 class="cv-section-title">PROJECTS</h2>
      ${r.projects.map(p => `
        <div class="cv-item">
          <div class="cv-item-header">
            <strong>${p.title}</strong>
          </div>
          <ul class="cv-list">
            ${p.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </section>
  `;

  resumeRendered = true;
}

/* ═══════════════════════════
   NOW
═══════════════════════════ */
function renderNow() {
  const container = document.getElementById('nowStatusGrid');
  if (!container) return;

  container.innerHTML = '';
  const now = new Date();
  const timeStr = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const timeEl = document.getElementById('nowUpdateTime');
  if (timeEl) timeEl.textContent = `Status active as of ${timeStr}`;

  NOW_STATUS.forEach((status, i) => {
    const card = document.createElement('div');
    card.className = `status-card status-${status.color}`;
    card.style.setProperty('--delay', `${i * 0.12}s`);

    card.innerHTML = `
      <div class="status-card-header">
        <div class="status-orb"></div>
        <h3>${status.title}</h3>
      </div>
      <p>${status.desc}</p>
      <div class="status-tags">
        ${status.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    `;
    container.appendChild(card);
  });
}

/* ═══════════════════════════
   BUILD LAB
═══════════════════════════ */
function renderBuildLab() {
  const container = document.getElementById('buildLabGrid');
  if (!container) return;

  container.innerHTML = '';

  BUILD_LAB.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'lab-card';
    card.style.setProperty('--delay', `${i * 0.1}s`);

    card.innerHTML = `
      <div class="lab-card-top">
        <span class="lab-cat">${item.cat}</span>
        <span class="lab-status status-${item.status.toLowerCase()}">${item.status}</span>
      </div>
      <h3 class="lab-title">${item.title}</h3>
      <p class="lab-desc">${item.desc}</p>
      <div class="lab-footer">
        <a href="${item.link}" target="_blank" class="lab-link-btn" rel="noopener">Reference</a>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ═══════════════════════════
   TERMINAL ANIMATION
═══════════════════════════ */
async function animateTerminal() {
  terminalDone = true;
  const out = document.getElementById('terminalOutput');
  if (!out) return;

  const wait = ms => new Promise(r => setTimeout(r, ms));
  const addLine = (cls, text) => {
    const row = document.createElement('div');
    row.className = 'tl-row';
    const sp = document.createElement('span');
    sp.className = cls;
    sp.textContent = text;
    row.appendChild(sp);
    out.appendChild(row);
    out.parentElement.scrollTop = out.parentElement.scrollHeight;
  };

  await wait(320);
  addLine('tcmt', '# Loading skill manifest…');
  await wait(540);
  addLine('tsuc', '✓ Resolved 30 skills across 6 categories');
  await wait(260);
  addLine('tl-row', '');

  for (const group of SKILLS) {
    await wait(300);
    addLine('tcat', `▸ ${group.cat}`);
    for (const item of group.items) {
      await wait(80);
      addLine('tskill', item);
    }
  }

  await wait(400);
  addLine('tcmt', '');
  addLine('tsuc', '# Stack loaded. Ready to ship 🚀');
}

/* ═══════════════════════════
   MAIL / SEND
═══════════════════════════ */
function scrollToCompose() {
  document.getElementById('mailCompose')?.scrollIntoView({ behavior: 'smooth' });
}

async function sendMail() {
  const btn = document.getElementById('sendBtn');
  const email = document.getElementById('contactEmail')?.value.trim();
  const subject = document.getElementById('contactSubject')?.value.trim();
  const message = document.getElementById('contactMessage')?.value.trim();

  if (!email || !subject || !message) {
    showToast('Please fill in all fields.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.');
    return;
  }

  try {
    btn.disabled = true;
    btn.style.opacity = '0.5';
    showToast('Sending message...');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
        from_name: email,
        subject: subject,
        message: message
      })
    });

    const result = await response.json();

    if (result.success) {
      showToast('Message sent successfully!');
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactSubject').value = '';
      document.getElementById('contactMessage').value = '';
    } else {
      showToast('Error: ' + result.message);
    }
  } catch (err) {
    console.error("Form Error:", err);
    showToast('Connection error. Try again.');
  } finally {
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

/* ═══════════════════════════
   RESUME DOWNLOAD
═══════════════════════════ */
function downloadResume() {
  const resume = document.getElementById('resumeContent');
  if (!resume) return;

  showToast('Preparing document…');

  const printWin = window.open('', '_blank');
  const styles = Array.from(document.styleSheets)
    .filter(s => !s.href || s.href.includes(window.location.origin))
    .map(s => {
      try {
        return Array.from(s.cssRules).map(r => r.cssText).join('');
      } catch (e) {
        return '';
      }
    }).join('');

  printWin.document.write(`
    <html>
      <head>
        <title>Om Gawde - Resume</title>
        <style>
          ${styles}
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .cv-page { box-shadow: none !important; margin: 0 !important; width: 100% !important; max-width: none !important; }
          @page { margin: 2cm; }
        </style>
      </head>
      <body>
        <div class="cv-page" id="resumeContent">${resume.innerHTML}</div>
        <script>
          window.onload = () => setTimeout(() => window.print(), 500);
        </script>
      </body>
    </html>
  `);
  printWin.document.close();
}

/* ═══════════════════════════
   TOAST
═══════════════════════════ */
function showToast(msg, ms = 3000) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), ms);
}

/* ═══════════════════════════
   DOCK MAGNIFICATION
═══════════════════════════ */
function initDockMagnification() {
  const dock = document.getElementById('dock');
  const items = dock?.querySelectorAll('.dock-item');
  if (!dock || !items) return;

  dock.addEventListener('mousemove', e => {
    if (isMobileView()) {
      items.forEach(item => item.style.transform = '');
      return;
    }

    const mx = e.clientX;
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const dist = Math.abs(mx - cx);
      const max = 130;

      if (dist < max) {
        const t = 1 - dist / max;
        item.style.transform = `translateY(-${t * 18}px) scale(${1 + t * 0.45})`;
      } else {
        item.style.transform = '';
      }
    });
  });

  dock.addEventListener('mouseleave', () => {
    items.forEach(item => item.style.transform = '');
  });
}

/* ═══════════════════════════
   KEYBOARD SHORTCUTS
═══════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && activeWindowId) {
    closeWindow(activeWindowId);
    return;
  }

  const MAP = {
    '1': ['projectsWindow', 'dockFinder'],
    '2': ['aboutWindow', 'dockSafari'],
    '3': ['skillsWindow', 'dockTerminal'],
    '4': ['experienceWindow', 'dockNotes'],
    '5': ['contactWindow', 'dockMail'],
    '6': ['resumeWindow', 'dockPreview'],
  };

  if ((e.metaKey || e.ctrlKey) && MAP[e.key]) {
    e.preventDefault();
    openWindow(...MAP[e.key]);
  }
});

/* ═══════════════════════════
   BACKGROUND PARALLAX
═══════════════════════════ */
function initParallax() {
  document.addEventListener('mousemove', e => {
    if (isMobileView()) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    const orbs = document.querySelectorAll('.orb');

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 8;
      orb.style.transform = `translate(${nx * factor}px, ${ny * factor}px)`;
    });
  });
}

/* ═══════════════════════════
   DESKTOP FOLDERS
═══════════════════════════ */
function initFolders() {
  const desktop = document.getElementById('desktop');
  const folders = document.querySelectorAll('.folder-item');
  let folderDrag = null;

  const GAP = 6;
  const ITEM_H = 90;

  function positionFolders() {
    if (isMobileView()) return;
    folders.forEach((f, i) => {
      f.style.left = '16px';
      f.style.top = (12 + i * (ITEM_H + GAP)) + 'px';
    });
  }

  positionFolders();

  folders.forEach(folder => {
    folder.addEventListener('mousedown', e => {
      if (isMobileView()) return;
      if (e.button !== 0) return;
      e.stopPropagation();

      const desk = desktop.getBoundingClientRect();
      const fRect = folder.getBoundingClientRect();

      folderDrag = {
        el: folder,
        mx: e.clientX,
        my: e.clientY,
        ox: fRect.left - desk.left,
        oy: fRect.top - desk.top,
        moved: false,
      };
    });

    folder.addEventListener('click', e => {
      if (folder._dragged) {
        folder._dragged = false;
        return;
      }

      e.stopPropagation();
      folders.forEach(f => f.classList.remove('selected'));
      folder.classList.add('selected');
    });

    folder.addEventListener('dblclick', e => {
      if (folder._dragged) return;
      e.stopPropagation();
      const winId = folder.dataset.window;
      const dockId = folder.dataset.dock || null;
      folder.classList.add('opening');
      folder.addEventListener('animationend', () => folder.classList.remove('opening'), { once: true });
      openWindow(winId, dockId);
      showToast(`Opening ${folder.querySelector('.folder-label').textContent}…`, 1800);
    });

    folder.addEventListener('keydown', e => {
      if (e.key === 'Enter') folder.dispatchEvent(new MouseEvent('dblclick'));
      if (e.key === ' ') {
        e.preventDefault();
        folder.dispatchEvent(new MouseEvent('click'));
      }
    });
  });

  document.addEventListener('mousemove', e => {
    if (!folderDrag || isMobileView()) return;

    const dx = e.clientX - folderDrag.mx;
    const dy = e.clientY - folderDrag.my;

    if (!folderDrag.moved && Math.hypot(dx, dy) < 5) return;

    if (!folderDrag.moved) {
      folderDrag.moved = true;
      folderDrag.el.classList.add('folder-dragging');
    }

    const desk = desktop.getBoundingClientRect();
    const fw = folderDrag.el.offsetWidth;
    const fh = folderDrag.el.offsetHeight;

    const nl = Math.max(0, Math.min(desk.width - fw, folderDrag.ox + dx));
    const nt = Math.max(0, Math.min(desk.height - fh - 10, folderDrag.oy + dy));

    folderDrag.el.style.left = nl + 'px';
    folderDrag.el.style.top = nt + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!folderDrag) return;
    folderDrag.el.classList.remove('folder-dragging');
    if (folderDrag.moved) {
      folderDrag.el._dragged = true;
      setTimeout(() => { folderDrag.el._dragged = false; }, 250);
    }
    folderDrag = null;
  });

  desktop?.addEventListener('click', () => {
    folders.forEach(f => f.classList.remove('selected'));
  });

  window.addEventListener('resize', () => {
    if (isMobileView()) {
      folders.forEach(f => {
        f.style.left = '';
        f.style.top = '';
      });
    } else {
      positionFolders();
    }
  });
}

/* ═══════════════════════════
   DRAGGABLE WINDOWS
═══════════════════════════ */
function initDraggableWindows() {
  const desktop = document.getElementById('desktop');
  let winDrag = null;

  document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => {
      if (parseInt(win.style.zIndex || 0) < _winZ) bringToFront(win);
    }, true);

    const chrome = win.querySelector('.win-chrome');
    if (!chrome) return;

    chrome.addEventListener('mousedown', e => {
      if (isMobileView()) return;
      if (e.button !== 0) return;
      if (e.target.closest('.traffic-lights')) return;
      e.preventDefault();

      bringToFront(win);

      if (!win.classList.contains('win-positioned')) {
        const dr = desktop.getBoundingClientRect();
        const wr = win.getBoundingClientRect();
        win.style.left = (wr.left - dr.left) + 'px';
        win.style.top = (wr.top - dr.top) + 'px';
        win.style.translate = 'none';
        win.style.transform = 'none';
        win.style.animation = 'none';
        win.classList.add('win-positioned');
      }

      const dr = desktop.getBoundingClientRect();
      const wr = win.getBoundingClientRect();

      winDrag = {
        win,
        mx: e.clientX,
        my: e.clientY,
        ox: wr.left - dr.left,
        oy: wr.top - dr.top,
      };
    });
  });

  document.addEventListener('mousemove', e => {
    if (!winDrag || isMobileView()) return;

    const { win, mx, my, ox, oy } = winDrag;
    const dr = desktop.getBoundingClientRect();
    const dx = e.clientX - mx;
    const dy = e.clientY - my;
    const CHROME_H = 44;
    const ww = win.offsetWidth;

    const nl = Math.max(-(ww - 120), Math.min(dr.width - 120, ox + dx));
    const nt = Math.max(0, Math.min(dr.height - CHROME_H, oy + dy));

    win.classList.add('win-dragging');
    win.style.left = nl + 'px';
    win.style.top = nt + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!winDrag) return;
    winDrag.win.classList.remove('win-dragging');
    winDrag = null;
  });

  window.addEventListener('resize', () => {
    if (!isMobileView()) return;
    document.querySelectorAll('.window').forEach(resetWindowPosition);
  });
}

/* ═══════════════════════════
   CLOCK WIDGET
═══════════════════════════ */
function initClockWidget() {
  const canvas = document.getElementById('clockCanvas');
  const dateEl = document.getElementById('widgetDate');
  if (!canvas) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const SIZE = 160;
  canvas.width = SIZE * dpr;
  canvas.height = SIZE * dpr;
  canvas.style.width = SIZE + 'px';
  canvas.style.height = SIZE + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const CX = SIZE / 2, CY = SIZE / 2;
  const R = SIZE / 2 - 4;

  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function hand(angle, length, back, width, color, shadow) {
    ctx.save();
    if (shadow) {
      ctx.shadowColor = 'rgba(0,0,0,.18)';
      ctx.shadowBlur = 4;
    }
    ctx.beginPath();
    ctx.moveTo(CX - Math.cos(angle) * back, CY - Math.sin(angle) * back);
    ctx.lineTo(CX + Math.cos(angle) * length, CY + Math.sin(angle) * length);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    const now = new Date();
    const H = now.getHours() % 12;
    const M = now.getMinutes();
    const S = now.getSeconds();
    const MS = now.getMilliseconds();

    if (dateEl) {
      dateEl.textContent = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;
    }

    ctx.clearRect(0, 0, SIZE, SIZE);

    ctx.save();
    roundedRect(2, 2, SIZE - 4, SIZE - 4, 28);
    ctx.shadowColor = 'rgba(0,0,0,.22)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 2;
    const bg = ctx.createRadialGradient(CX, CY - 12, 0, CX, CY, R + 6);
    bg.addColorStop(0, '#ffffff');
    bg.addColorStop(1, '#e8e8ec');
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.restore();

    ctx.save();
    roundedRect(2, 2, SIZE - 4, SIZE - 4, 28);
    ctx.clip();

    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
      const major = i % 5 === 0;
      const outerR = R - 2;
      const innerR = major ? outerR - 9 : outerR - 5;
      ctx.beginPath();
      ctx.moveTo(CX + Math.cos(a) * innerR, CY + Math.sin(a) * innerR);
      ctx.lineTo(CX + Math.cos(a) * outerR, CY + Math.sin(a) * outerR);
      ctx.strokeStyle = major ? 'rgba(50,50,58,.82)' : 'rgba(160,160,170,.55)';
      ctx.lineWidth = major ? 2.4 : 1.1;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    const numR = R - 20;
    const fSize = Math.round(SIZE * 0.115);
    ctx.font = `600 ${fSize}px -apple-system, "SF Pro Rounded", Inter, sans-serif`;
    ctx.fillStyle = 'rgba(44,44,52,.88)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    [
      { n: '12', a: -Math.PI / 2 },
      { n: '3', a: 0 },
      { n: '6', a: Math.PI / 2 },
      { n: '9', a: Math.PI },
    ].forEach(({ n, a }) => {
      ctx.fillText(n, CX + Math.cos(a) * numR, CY + Math.sin(a) * numR);
    });

    const secA = ((S + MS / 1000) / 60) * Math.PI * 2 - Math.PI / 2;
    const minA = ((M + S / 60) / 60) * Math.PI * 2 - Math.PI / 2;
    const hourA = ((H + M / 60) / 12) * Math.PI * 2 - Math.PI / 2;

    hand(hourA, R * 0.50, R * 0.12, 5, 'rgba(28,28,32,.95)', true);
    hand(minA, R * 0.72, R * 0.14, 3.5, 'rgba(28,28,32,.90)', true);
    hand(secA, R * 0.80, R * 0.20, 1.6, '#ff9500', false);

    ctx.beginPath();
    ctx.arc(CX, CY, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ff9500';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(CX, CY, 2.8, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    ctx.restore();
  }

  (function loop() {
    draw();
    requestAnimationFrame(loop);
  })();
}

/* ═══════════════════════════
   QUOTE WIDGET
═══════════════════════════ */
const DEV_QUOTES = [
  { text: "It works on my machine.", author: "Every Developer, Ever" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "It's not a bug — it's an undocumented feature.", author: "Anonymous" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Any fool can write code a computer can understand. Good programmers write code humans can understand.", author: "Martin Fowler" },
  { text: "There are only two hard things in CS: cache invalidation and naming things.", author: "Phil Karlton" },
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
];

function initQuoteWidget() {
  const textEl = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  const widget = document.getElementById('quoteWidget');
  if (!textEl || !widget || !authorEl) return;

  let current = Math.floor(Math.random() * DEV_QUOTES.length);

  function showQuote(q, animate) {
    if (animate) {
      textEl.classList.add('fade-out');
      setTimeout(() => {
        textEl.textContent = q.text;
        authorEl.textContent = `— ${q.author}`;
        textEl.classList.remove('fade-out');
      }, 280);
    } else {
      textEl.textContent = q.text;
      authorEl.textContent = `— ${q.author}`;
    }
  }

  showQuote(DEV_QUOTES[current], false);

  widget.addEventListener('click', () => {
    current = (current + 1) % DEV_QUOTES.length;
    showQuote(DEV_QUOTES[current], true);
  });

  widget.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      widget.click();
    }
  });

  setInterval(() => {
    current = (current + 1) % DEV_QUOTES.length;
    showQuote(DEV_QUOTES[current], true);
  }, 18000);
}

/* ═══════════════════════════
   ARCADE
═══════════════════════════ */
function initPlatformerGame() {
  const platScore = document.getElementById('platScore');
  const overlayStart = document.getElementById('platStartScreen');
  const overlayOver = document.getElementById('platGameOver');
  const platEndTitle = document.getElementById('platEndTitle');
  const platEndEmoji = document.getElementById('platEndEmoji');
  const container = document.getElementById('kaboomContainer');
  const platGameOverSub = document.getElementById('platGameOverSub');
  const progressBar = document.getElementById('platProgressBar');

  if (!container || !window.kaboom) return;

  ['platStartBtn', 'platReset', 'platPlayAgain', 'platViewProjects'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const clone = btn.cloneNode(true);
    btn.parentNode.replaceChild(clone, btn);
  });

  const domStartBtn = document.getElementById('platStartBtn');
  const domResetBtn = document.getElementById('platReset');
  const domPlayAgain = document.getElementById('platPlayAgain');
  const domViewProj = document.getElementById('platViewProjects');

  let collectedStacks = [];
  let currentScore = 0;
  if (platScore) platScore.textContent = currentScore;

  function endGame(win, score) {
    if (platEndTitle) platEndTitle.textContent = win ? "Run Complete!" : "Mission Failed";
    if (platEndEmoji) platEndEmoji.textContent = "";
    if (platGameOverSub) platGameOverSub.textContent = `Progress: ${score} of 4 technologies unlocked`;
    if (progressBar) progressBar.style.width = (score / 4 * 100) + '%';

    const iconContainer = document.getElementById('platTechIcons');
    if (iconContainer) {
      iconContainer.querySelectorAll('.tech-icon-mini').forEach(icon => {
        const tech = icon.dataset.tech;
        if (collectedStacks.includes(tech)) icon.classList.add('active');
        else icon.classList.remove('active');
      });
    }

    overlayOver?.classList.add('visible');
  }

  async function startKaboom() {
    overlayStart?.classList.remove('visible');
    overlayOver?.classList.remove('visible');
    collectedStacks = [];
    currentScore = 0;
    if (platScore) platScore.textContent = currentScore;

    if (kaboomInst) kaboomInst.quit();
    const oldCanvas = container.querySelector('canvas');
    if (oldCanvas) oldCanvas.remove();

    kaboomInst = kaboom({
      root: container,
      width: 720,
      height: 400,
      background: [0, 0, 0, 0], // Transparent for portfolio backdrop
      letterbox: true,
      global: false
    });

    const k = kaboomInst;

    await k.loadSprite("player", "assets/player_sheet.png", {
      sliceX: 4,
      sliceY: 1,
      anims: {
        idle: 0,
        run: { from: 1, to: 2, loop: true, speed: 8 },
        jump: 3
      }
    });

    await k.loadSprite("bg", "assets/bg_sprite.png");
    await k.loadSprite("tiles", "assets/tiles_sheet.png", { sliceX: 2, sliceY: 1 });
    await k.loadSprite("items", "assets/items_sheet.png", {
      sliceX: 4,
      sliceY: 4,
      anims: {
        bounceJava: { from: 0, to: 3, loop: true, speed: 6 },
        bounceSpring: { from: 4, to: 7, loop: true, speed: 6 },
        bounceApi: { from: 8, to: 11, loop: true, speed: 6 },
        bounceDb: { from: 12, to: 15, loop: true, speed: 6 }
      }
    });

    k.scene("game", () => {
      k.setGravity(2400);

      k.add([
        k.sprite("bg", { width: 720, height: 400 }),
        k.pos(0, 0),
        k.fixed(),
        k.z(-1),
        k.opacity(0.4)
      ]);

      let score = 0;
      if (platScore) platScore.textContent = score;

      const player = k.add([
        k.sprite("player", { anim: "idle" }),
        k.area(),
        k.body(),
        k.pos(40, 100),
        "player"
      ]);

      const SPEED = 250;
      const JUMP_FORCE = 800;

      function goLeft() {
        player.move(-SPEED, 0);
        player.flipX = true;
        if (player.isGrounded() && player.curAnim() !== "run") player.play("run");
      }

      function goRight() {
        player.move(SPEED, 0);
        player.flipX = false;
        if (player.isGrounded() && player.curAnim() !== "run") player.play("run");
      }

      k.onKeyDown("left", goLeft);
      k.onKeyDown("a", goLeft);
      k.onKeyDown("right", goRight);
      k.onKeyDown("d", goRight);

      k.onKeyRelease(["left", "right", "a", "d"], () => {
        if (player.isGrounded() && !k.isKeyDown("left") && !k.isKeyDown("right") && !k.isKeyDown("a") && !k.isKeyDown("d")) {
          player.play("idle");
        }
      });

      function doJump() {
        if (player.isGrounded()) {
          player.jump(JUMP_FORCE);
          player.play("jump");
        }
      }

      k.onKeyPress("space", doJump);
      k.onKeyPress("up", doJump);
      k.onKeyPress("w", doJump);

      player.onGround(() => {
        if (!k.isKeyDown("left") && !k.isKeyDown("right") && !k.isKeyDown("a") && !k.isKeyDown("d")) player.play("idle");
        else player.play("run");
      });

      const levelData = [
        "                                           ",
        "                                           ",
        "                                           ",
        "   0                                       ",
        "  ===               1                      ",
        "                   ===                     ",
        "             ==                            ",
        "      ---                         3        ",
        "                  ---            ===       ",
        "          ===              2               ",
        "                          ===             F",
        "================      ====================="
      ];

      const levelConf = {
        tileWidth: 32,
        tileHeight: 32,
        tiles: {
          "=": () => [k.sprite("tiles", { frame: 0 }), k.area(), k.body({ isStatic: true })],
          "-": () => [k.sprite("tiles", { frame: 1 }), k.area(), k.body({ isStatic: true })],
          "0": () => [k.sprite("items", { anim: "bounceJava" }), k.area(), k.anchor("center"), "stack", { name: "Java" }],
          "1": () => [k.sprite("items", { anim: "bounceSpring" }), k.area(), k.anchor("center"), "stack", { name: "Spring Boot" }],
          "2": () => [k.sprite("items", { anim: "bounceApi" }), k.area(), k.anchor("center"), "stack", { name: "API" }],
          "3": () => [k.sprite("items", { anim: "bounceDb" }), k.area(), k.anchor("center"), "stack", { name: "Database" }],
          "F": () => [k.text("🏁", { size: 36 }), k.area(), k.anchor("center"), "finish"],
        }
      };

      k.addLevel(levelData, levelConf);

      player.onCollide("stack", item => {
        k.destroy(item);
        k.add([
          k.text("+ " + item.name, { size: 16 }),
          k.pos(item.pos.x, item.pos.y - 20),
          k.move(k.UP, 80),
          k.color(255, 220, 100),
          k.lifespan(0.8, { fade: 0.1 })
        ]);
        score++;
        collectedStacks.push(item.name);
        if (platScore) platScore.textContent = score;
      });

      player.onCollide("finish", () => {
        endGame(true, score);
        k.scene("pause", () => { });
        k.go("pause");
      });

      player.onUpdate(() => {
        k.camPos(Math.max(360, player.pos.x), 200);
        if (player.pos.y > 600) {
          endGame(false, score);
          k.scene("pause", () => { });
          k.go("pause");
        }
      });
    });

    k.go("game");
  }

  domStartBtn?.addEventListener('click', startKaboom);
  domResetBtn?.addEventListener('click', startKaboom);
  domPlayAgain?.addEventListener('click', startKaboom);

  domViewProj?.addEventListener('click', () => {
    closeWindow('arcadeWindow');
    openWindow('projectsWindow', 'dockFinder');
  });

  overlayStart?.classList.add('visible');
  overlayOver?.classList.remove('visible');
  if (platScore) platScore.textContent = '0';
}

/* ═══════════════════════════
   INIT
═══════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initDockMagnification();
  initParallax();
  initFolders();
  initDraggableWindows();
  initClockWidget();
  initQuoteWidget();
});