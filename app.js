/* ═══════════════════════════
   DATA
═══════════════════════════ */
const PROJECTS = [
  { icon:'🌐', title:'FullStack Task Manager', desc:'Real-time task management with kanban board, user auth, and live collaboration.', stack:['React','Node.js','MongoDB','JWT'], cat:'web', github:'#', demo:'#' },
  { icon:'⚡', title:'Spring Boot REST API', desc:'Production-ready API — JWT auth, role-based access, PostgreSQL, Docker-ready.', stack:['Java','Spring Boot','PostgreSQL','Docker'], cat:'backend', github:'#', demo:'#' },
  { icon:'🎮', title:'2D Developer Portfolio', desc:'Interactive portfolio as a 2D Kaboom.js game with explorable areas.', stack:['JavaScript','Kaboom.js','Vite'], cat:'web', github:'#', demo:'#' },
  { icon:'🔒', title:'Auth Microservice', desc:'Standalone auth service — OAuth2, refresh tokens, rate limiting, Redis.', stack:['Spring Boot','Redis','JWT','Docker'], cat:'backend', github:'#', demo:'#' },
  { icon:'📊', title:'Analytics Dashboard', desc:'Live charts, date filters, CSV export, WebSocket real-time updates.', stack:['React','Chart.js','Node.js','WS'], cat:'web', github:'#', demo:'#' },
  { icon:'🛠️', title:'CLI Dev Scaffolder', desc:'CLI tool that scaffolds full-stack projects with custom templates + git init.', stack:['Node.js','Commander.js','Inquirer'], cat:'tool', github:'#', demo:'#' },
];

const EXPERIENCE = [
  { role:'Full-Stack Developer Intern', org:'Tech Company · Internship', date:'2025 – Present', desc:'Built and maintained full-stack features with React + Node.js. Improved API response times 40% via Redis caching and query optimization.' },
  { role:'Open Source Contributor', org:'GitHub · Self-Directed', date:'2024 – Present', desc:'Active contributor across REST API utilities, dev tools, and React libraries. Consistent daily commit streak with meaningful contributions.' },
  { role:'Bachelor of Computer Science', org:'University · CS Major', date:'2023 – 2027', desc:'Core focus on software engineering, data structures, algorithms, and networking. Building production projects alongside coursework.' },
  { role:'Self-Directed Learning', org:'Java · Spring Boot · System Design', date:'2024 – Present', desc:'Deep-diving into Spring Boot ecosystem, microservices architecture patterns, system design, and distributed systems fundamentals.' },
];

const CONTACTS = [
  { icon:'📧', label:'Email', value:'om@example.com', href:'mailto:om@example.com', bg:'rgba(59,130,246,.15)' },
  { icon:'💼', label:'LinkedIn', value:'linkedin.com/in/omgawde', href:'https://linkedin.com/in/omgawde', bg:'rgba(0,119,181,.15)' },
  { icon:'🐙', label:'GitHub', value:'github.com/omgawde', href:'https://github.com/omgawde', bg:'rgba(255,255,255,.07)' },
];

const SKILLS = [
  { cat:'Languages',             items:['Java','JavaScript / TypeScript','Python','SQL','HTML & CSS'] },
  { cat:'Frameworks & Libraries',items:['Spring Boot','React','Node.js','Express.js'] },
  { cat:'Backend & APIs',        items:['REST APIs','JWT Auth','Redis','WebSockets','Microservices'] },
  { cat:'Databases',             items:['PostgreSQL','MongoDB','MySQL'] },
  { cat:'Tools & DevOps',        items:['Git & GitHub','Docker','Linux / Bash','Vite'] },
  { cat:'Currently Learning',    items:['Spring Boot (Advanced)','System Design','Networking Fundamentals','Cloud Infrastructure'] },
];

/* ═══════════════════════════
   STATE
═══════════════════════════ */
let activeWindowId = null;
let activeDockId   = null;
let terminalDone   = false;

/* ═══════════════════════════
   CANVAS: STARS
═══════════════════════════ */
(function initStars() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * .6 + .1,
      speed: Math.random() * .3 + .1,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const a = s.a * (.6 + .4 * Math.sin(t * s.speed + s.phase));
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
  const now  = new Date();
  const h    = now.getHours(), m = now.getMinutes().toString().padStart(2,'0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12  = (h % 12) || 12;
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const mos  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const el   = document.getElementById('menuClock');
  if (el) el.textContent = `${days[now.getDay()]} ${mos[now.getMonth()]} ${now.getDate()}  ${h12}:${m} ${ampm}`;
}
tick();
setInterval(tick, 1000);

/* ═══════════════════════════
   WINDOW MANAGEMENT
═══════════════════════════ */
function openWindow(winId, dockId) {
  // close previous
  if (activeWindowId && activeWindowId !== winId) {
    document.getElementById(activeWindowId)?.classList.remove('active');
    document.getElementById(activeDockId)?.classList.remove('running');
  }

  // toggle if same
  if (activeWindowId === winId) {
    document.getElementById(winId)?.classList.remove('active');
    document.getElementById(dockId)?.classList.remove('running');
    activeWindowId = activeDockId = null;
    return;
  }

  // hide welcome
  document.getElementById('welcomeWindow')?.classList.remove('active');

  // show new
  document.getElementById(winId)?.classList.add('active');
  document.getElementById(dockId)?.classList.add('running');
  activeWindowId = winId;
  activeDockId   = dockId;

  // section inits
  if (winId === 'projectsWindow')  renderProjects();
  if (winId === 'experienceWindow') renderExperience();
  if (winId === 'contactWindow')   renderContacts();
  if (winId === 'skillsWindow' && !terminalDone) setTimeout(animateTerminal, 180);
}

function closeWindow(winId) {
  document.getElementById(winId)?.classList.remove('active');
  if (activeWindowId === winId) {
    document.getElementById(activeDockId)?.classList.remove('running');
    activeWindowId = activeDockId = null;
  }
}

function closeWelcome() {
  document.getElementById('welcomeWindow')?.classList.remove('active');
}

/* ═══════════════════════════
   RENDER: PROJECTS
═══════════════════════════ */
let projectsRendered = false;
function renderProjects() {
  if (projectsRendered) return;
  projectsRendered = true;
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  PROJECTS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.cat = p.cat;
    card.innerHTML = `
      <span class="pc-icon">${p.icon}</span>
      <div class="pc-title">${p.title}</div>
      <p class="pc-desc">${p.desc}</p>
      <div class="pc-stack">${p.stack.map(s => `<span class="stack-pill">${s}</span>`).join('')}</div>
      <div class="pc-links">
        <a class="pc-link gh" href="${p.github}" target="_blank" rel="noopener">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
        <a class="pc-link lv" href="${p.demo}" target="_blank" rel="noopener">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
          Live
        </a>
      </div>`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px)';
    grid.appendChild(card);
    setTimeout(() => {
      card.style.transition = 'opacity .35s ease, transform .35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 65);
  });

  // sidebar filter
  document.querySelectorAll('.sidebar-item[data-filter]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-item[data-filter]').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      const filter = el.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
      });
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
let expRendered = false;
function renderExperience() {
  if (expRendered) return;
  expRendered = true;
  const container = document.getElementById('expTimeline');
  if (!container) return;
  EXPERIENCE.forEach((e, i) => {
    const el = document.createElement('div');
    el.className = 'exp-item';
    el.innerHTML = `
      <div class="exp-row">
        <div class="exp-role">${e.role}</div>
        <div class="exp-date">${e.date}</div>
      </div>
      <div class="exp-org">${e.org}</div>
      <p class="exp-desc">${e.desc}</p>`;
    el.style.opacity = '0';
    el.style.transform = 'translateX(-12px)';
    container.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .35s ease, transform .35s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    }, i * 100);
  });
}

/* ═══════════════════════════
   RENDER: CONTACTS
═══════════════════════════ */
let contactsRendered = false;
function renderContacts() {
  if (contactsRendered) return;
  contactsRendered = true;
  const container = document.getElementById('mailLinks');
  if (!container) return;
  CONTACTS.forEach(c => {
    const a = document.createElement('a');
    a.className = 'mail-link-item';
    a.href = c.href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `
      <div class="mli-icon" style="background:${c.bg}">${c.icon}</div>
      <div class="mli-info"><strong>${c.label}</strong><span>${c.value}</span></div>
      <span class="mli-arr">›</span>`;
    container.appendChild(a);
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
  addLine('tsuc', '✓ Resolved 34 skills across 6 categories');
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

function sendMail() {
  const email   = document.getElementById('contactEmail')?.value.trim();
  const subject = document.getElementById('contactSubject')?.value.trim();
  const message = document.getElementById('contactMessage')?.value.trim();
  if (!email || !subject || !message) { showToast('⚠️ Please fill in all fields.'); return; }
  window.location.href = `mailto:om@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
  showToast('✉️ Opening your mail app…');
}

function downloadResume() {
  showToast('📄 Resume download coming soon!');
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
  const dock  = document.getElementById('dock');
  const items = dock?.querySelectorAll('.dock-item');
  if (!dock || !items) return;

  dock.addEventListener('mousemove', e => {
    const mx = e.clientX;
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const dist = Math.abs(mx - cx);
      const max  = 130;
      if (dist < max) {
        const t = 1 - dist / max;
        const scale = 1 + t * 0.45;
        const lift  = t * 18;
        item.style.transform = `translateY(-${lift}px) scale(${scale})`;
      } else {
        item.style.transform = '';
      }
    });
  });

  dock.addEventListener('mouseleave', () => {
    items.forEach(item => { item.style.transform = ''; });
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
    '1': ['projectsWindow',  'dockFinder'],
    '2': ['aboutWindow',     'dockSafari'],
    '3': ['skillsWindow',    'dockTerminal'],
    '4': ['experienceWindow','dockNotes'],
    '5': ['contactWindow',   'dockMail'],
    '6': ['resumeWindow',    'dockPreview'],
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
    const nx = (e.clientX / window.innerWidth  - .5) * 2;
    const ny = (e.clientY / window.innerHeight - .5) * 2;
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
  const folders = document.querySelectorAll('.folder-item');
  let selectedFolder = null;
  const clickTimers = {};

  folders.forEach(folder => {
    // single click = highlight
    folder.addEventListener('click', e => {
      const id = folder.id;

      // deselect all others
      folders.forEach(f => f.classList.remove('selected'));

      if (selectedFolder === id) {
        // second click — will be caught by dblclick; just keep selected
        folder.classList.add('selected');
      } else {
        selectedFolder = id;
        folder.classList.add('selected');
      }

      // deselect when clicking elsewhere
      e.stopPropagation();
    });

    // double click = open window with bounce
    folder.addEventListener('dblclick', e => {
      e.stopPropagation();
      const winId  = folder.dataset.window;
      const dockId = folder.dataset.dock || null;

      // bounce animation
      folder.classList.add('opening');
      folder.addEventListener('animationend', () => folder.classList.remove('opening'), { once: true });

      openWindow(winId, dockId);
      showToast(`📂 Opening ${folder.querySelector('.folder-label').textContent}…`, 1800);
    });

    // keyboard: Enter = open, Space = select
    folder.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        folder.dispatchEvent(new MouseEvent('dblclick'));
      } else if (e.key === ' ') {
        e.preventDefault();
        folder.dispatchEvent(new MouseEvent('click'));
      }
    });
  });

  // clicking desktop background deselects folders
  document.getElementById('desktop')?.addEventListener('click', () => {
    document.querySelectorAll('.folder-item').forEach(f => f.classList.remove('selected'));
    selectedFolder = null;
  });
}

/* ═══════════════════════════
   INIT
═══════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initDockMagnification();
  initParallax();
  initFolders();

  // Show welcome
  setTimeout(() => {
    document.getElementById('welcomeWindow')?.classList.add('active');
  }, 150);
});

