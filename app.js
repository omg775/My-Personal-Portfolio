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
    demo: '#'
  },
  {
    icon: '⚡',
    title: 'Clarity AI',
    desc: 'Chrome extension that summarizes notes, extracts key insights, and suggests related topics using AI, with a Spring Boot backend for fast processing.',
    stack: ['Java', 'Spring Boot', 'Gemini API', 'Chrome Extension', 'JavaScript'],
    cat: 'tool',
    github: 'https://github.com/omg775/ClarityAI',
    demo: '#'
  },
  {
    icon: '🧩',
    title: 'Real-time Collaborative Whiteboard',
    desc: 'Distributed whiteboard system showcasing multiple architectures including RPC, RMI, P2P, and WebSockets for real-time collaboration.',
    stack: ['Java', 'Node.js', 'Socket.io', 'TCP/UDP', 'AWS'],
    cat: 'backend',
    github: 'https://github.com/omg775/Real-time-Collaborative-Whiteboard',
    demo: '#'
  },
  {
    icon: '🖥️',
    title: 'My Personal Portfolio',
    desc: 'Interactive macOS-style portfolio with draggable windows, desktop UI, widgets, and a mini-game for an engaging user experience.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    cat: 'frontend',
    github: 'https://github.com/omg775/My-Personal-Portfolio',
    demo: '#'
  },
  {
    icon: '📅',
    title: 'Exam Scheduler',
    desc: 'Full-stack exam scheduling system with a Spring Boot API, PostgreSQL database, and React frontend for managing and visualizing exam data.',
    stack: ['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'Heroku', 'Vercel'],
    cat: 'fullstack',
    github: 'https://github.com/omg775',
    demo: '#'
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
      background: [26, 26, 26],
      letterbox: true,
      global: false
    });

    const k = kaboomInst;

    await k.loadSprite("player", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAgCAYAAADaInAlAAABRUlEQVR4nO2aQQrCMBBFjYgHij2IVxAEwRO4cG9PIAgFr9BziORAbupCW100nZAmJOH/twpNm9/FIzMpVQuSNaet7uauUbdG2eaWcxcnZbOSbohtIPPTwh0AHHEHIGVQt2YYn7ba+TkKkDl9+eiet8lSVLeHYXw5f8aqOoilJ5gAvgYyPy3OzYlkoKp+BnbPW38tWPPD/Ol8yzuJ+WwCwQlWAnrrU4Ge7wubwMzR19d36797P2uOa2spoACFsHnsoqwrChDbQOanxXkHiGUg89PCUwA4FAAcCgAOBQCHx8DM0eZonTP66nbfxPoUoGD+j5d6v/f6ccVZgDHDJAP/5+eCnh8LUYDesjHDJANDfABBz48Nm0BwKAA4FAAcCgAOBQCnmO8ATdNk3VHHej/XdX3zuQOAQwHAoQDgOPcAUo3JvUaTcd6CJKUMrS6cwgAAAABJRU5ErkJggg==", {
      sliceX: 4,
      sliceY: 1,
      anims: {
        idle: 0,
        run: { from: 1, to: 2, loop: true, speed: 8 },
        jump: 3
      }
    });

    await k.loadSprite("bg", "data:image/png;base64,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");
    await k.loadSprite("tiles", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAvklEQVR4nO2YoRGDMBhGA4epZgNMfWaKaTxT4DMMQ8TXsAECVdkqJDk4KC93+d4A/O/ehSRQdUP3NSBTP1Xk/JocngMKQAvQKAAtQKMAtABN8QGa17igAj06XStAARpaIISAfotoBdACK9baW+fFGI0xBwK858/uhz/bx3EjiOJfAQWgBWgUgBag2X0K/HtnX4+lu8nmHrDFFWFSdww8gPc++VvcOXf6qpyaUfweoAC0AI0C0AI0CkAL0BQf4AcRbBnu4KfCpgAAAABJRU5ErkJggg==", { sliceX: 2, sliceY: 1 });
    await k.loadSprite("items", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFRElEQVR4nO2csXHrMAyGoXfvLnNkhwyQJl32SCoP4yrZI12aDJAdMkcqvca0aYukST7C5A/+X6U72kdAAAiIErEIyWZd19Vd/77fb8bvXn6O18uyLLeR6v+AEHIEnPFDhr/EOQKCEwwvYAw/Gh1aN7zE+A5tJ2il/9824tyOkOKXYwiRV0tr/aFuVI8cHIt+f66YTK1XAQ39YVaAnGXYjd29/Mi6rqullUBL/z+tBNSkNAe736WWSyQ09YdwAKJHdQq4VRVem4N/3+9NpAJt/YsdYLYqfFmWZV3X9e7lZ3ODU6DsBRQ5QG4Vih51M5FdA/hLUcz7/TErBZjIKYpDy24IlOgXyXSA2atwkXMniDmCP4ZgfJHMjaDeW6G95w/JkkJrTg39r9YAs1fhlzhdbvkuQhOIfYARc/ASQHMuER39YbaC/ccxETvv43PR0h/GAURON0EkHQ3WjO/Q0B/KAUTs5eBSWusP8RRA9IAoAokeWQ4wYhVO2lBkIItfxc5OsZF67IQRPaoNNWsVTgghhBBCCDys2iux8hQEJ3BvrO2DwAg6Ar7xdx+Pm/H989fxGsUJIIQcAWf8kOEvcY6A4ATDCxijR3+AHOM7tJ2A/QESYwiRVwv7Axy4VQ6ORb8/V0ym1quAhv4wK0DOMuzG9s9f5j5H19If4oug0hzsfmflZJKm/hAOQPSA6Q9QmoN3H48mUoG2/uwPcAX3Lf7++Wtzg1Og7AVU9wdIVaHoUTcTxf0Bdh+PUe/3x6wUYCKnKA4tuyFQol+ksD/ArFW4yLkTxBzBH0MwvkjhyaBeW6G95w/JkkJrTg39s/sDzFqFX2LtbCLEPsCIObhHfwAN/WG2gv3HMRE77+Nz0dIfxgFEzs/Hp6LBmvEdGvpDOYCIvRxcStf+ACNU4aQtEEUg0aOoP8BIVThpQ3V/gNmqcKuwP8DksD8AIYQQQgghs8GqvRIrT0FwAvfG2j4IjKAj4Bt/+QyMP52uUZwAQsgROJ55CBh+89uDIyA4wfACxujRHyDH+Mf/KDsB+wMkxhAirxb2Bzhwqxwci35/rphMrVcBDf1hVoCcZdiNrU/2jqdp6Q/xRVBpDj7eCCMnkzT1h3AAogdMf4DSHLx82kgF2vqzP8AV3Lf469P2BqdA2Quo7g+QqkLRo24mivsDLJ9x7/fHrBRgIt5hjMCyGwIl+kUK+wPMWoWLnDtBzBH8MQTjixSeDOq1Fdp7/pAsKbTm1NA/uz/ArFX4JdbOJkLsA4yYg3v0B9DQH2Yr2H8cE7HzPj4XLf1hHEDk/Hx8KhqsGd+hoT+UA4jYy8GldO0PMEIVTtoCUQQSPYr6A4xUhZM2VPcHmK0Ktwr7A0wO+wMQQgghhBAyG6zaK7HyFAQncG+s7YPACDoCvvEfXveb8e+33fEaxQkghBwBZ/yQ4S9xjoDgBMMLGKNHf4Ac4zu0nYD9ARJjCJFXC/sDHLhVDo5Fvz9XTKbWq4CG/jArQM4y7Ma+33bmPkfX0h/ii6DSHOx+Z+Vkkqb+EA5A9IDpD1Cagx9e9yZSgbb+7A9wBfct/vfbbnODU6DsBVT3B0hVoehRNxPF/QEeXvdR7/fHrBRgIqcoDi27IVCiX6SwP8CsVbjIuRPEHMEfQzC+SOHJoF5bob3nD8mSQmtODf2z+wPMWoVfYu1sIsQ+wIg5uEd/AA39YbaC/ccxETvv43PR0h/GAUTOz8onosGa8R0a+kM5gIi9HFxK1/4AI1ThpC0QRSDRo6g/wEhVOGlDdX+A2apwq7A/wOSwPwAhhBBCCCGEEDIP/wDCugefa5645AAAAABJRU5ErkJggg==", {
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

      k.add([k.sprite("bg", { width: 720, height: 400 }), k.pos(0, 0), k.fixed(), k.z(-1)]);

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