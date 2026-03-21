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
let _winZ          = 120; // z-index counter for window stacking


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
/* dock → window id map (for closeWindow pip sync) */
const DOCK_MAP = {
  projectsWindow:   'dockFinder',
  aboutWindow:      'dockSafari',
  skillsWindow:     'dockTerminal',
  experienceWindow: 'dockNotes',
  contactWindow:    'dockMail',
  resumeWindow:     'dockPreview',
  arcadeWindow:     'dockArcade',
};

function bringToFront(winEl) {
  _winZ++;
  winEl.style.zIndex = _winZ;
}

function openWindow(winId, dockId) {
  const winEl  = document.getElementById(winId);
  const dockEl = document.getElementById(dockId);
  if (!winEl) return;

  // Toggle off if already visible
  if (winEl.classList.contains('active')) {
    winEl.classList.remove('active');
    dockEl?.classList.remove('running');
    return;
  }

  // Hide welcome
  document.getElementById('welcomeWindow')?.classList.remove('active');

  // Open (leave other windows open — multi-window)
  winEl.classList.add('active');
  dockEl?.classList.add('running');
  activeWindowId = winId;
  activeDockId   = dockId;
  bringToFront(winEl);

  // Section inits
  if (winId === 'projectsWindow')   renderProjects();
  if (winId === 'experienceWindow') renderExperience();
  if (winId === 'contactWindow')    renderContacts();
  if (winId === 'skillsWindow' && !terminalDone) setTimeout(animateTerminal, 180);
  if (winId === 'arcadeWindow') setTimeout(initBugGame, 80);
}

function closeWindow(winId) {
  document.getElementById(winId)?.classList.remove('active');
  const dId = DOCK_MAP[winId] || activeDockId;
  document.getElementById(dId)?.classList.remove('running');
  if (activeWindowId === winId) activeWindowId = activeDockId = null;
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
   DESKTOP FOLDERS (with drag)
═══════════════════════════ */
function initFolders() {
  const desktop   = document.getElementById('desktop');
  const folders   = document.querySelectorAll('.folder-item');
  let   folderDrag = null;
  let   lastClicked = null;

  // ── Position folders (match old flex column layout) ──
  const GAP = 6, ITEM_H = 90;
  folders.forEach((f, i) => {
    f.style.left = '16px';
    f.style.top  = (12 + i * (ITEM_H + GAP)) + 'px';
  });

  folders.forEach(folder => {
    // ── Mousedown: start potential drag ──
    folder.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      e.stopPropagation();
      const desk  = desktop.getBoundingClientRect();
      const fRect = folder.getBoundingClientRect();
      folderDrag = {
        el: folder,
        mx: e.clientX, my: e.clientY,
        ox: fRect.left - desk.left,
        oy: fRect.top  - desk.top,
        moved: false,
      };
    });

    // ── Click: select ──
    folder.addEventListener('click', e => {
      if (folder._dragged) { folder._dragged = false; return; }
      e.stopPropagation();
      folders.forEach(f => f.classList.remove('selected'));
      folder.classList.add('selected');
    });

    // ── Dblclick: open window ──
    folder.addEventListener('dblclick', e => {
      if (folder._dragged) return;
      e.stopPropagation();
      const winId  = folder.dataset.window;
      const dockId = folder.dataset.dock || null;
      folder.classList.add('opening');
      folder.addEventListener('animationend', () => folder.classList.remove('opening'), { once: true });
      openWindow(winId, dockId);
      showToast(`📂 Opening ${folder.querySelector('.folder-label').textContent}…`, 1800);
    });

    // ── Keyboard ──
    folder.addEventListener('keydown', e => {
      if (e.key === 'Enter') folder.dispatchEvent(new MouseEvent('dblclick'));
      else if (e.key === ' ') { e.preventDefault(); folder.dispatchEvent(new MouseEvent('click')); }
    });
  });

  // ── Global folder mousemove ──
  document.addEventListener('mousemove', e => {
    if (!folderDrag) return;
    const dx = e.clientX - folderDrag.mx;
    const dy = e.clientY - folderDrag.my;
    if (!folderDrag.moved && Math.hypot(dx, dy) < 5) return;
    if (!folderDrag.moved) {
      folderDrag.moved = true;
      folderDrag.el.classList.add('folder-dragging');
    }
    const desk = desktop.getBoundingClientRect();
    const fw   = folderDrag.el.offsetWidth;
    const fh   = folderDrag.el.offsetHeight;
    const nl   = Math.max(0, Math.min(desk.width  - fw,      folderDrag.ox + dx));
    const nt   = Math.max(0, Math.min(desk.height - fh - 10, folderDrag.ox !== folderDrag.ox ? 0 : folderDrag.oy + dy));
    folderDrag.el.style.left = nl + 'px';
    folderDrag.el.style.top  = (Math.max(0, Math.min(desk.height - fh - 10, folderDrag.oy + dy))) + 'px';
  });

  // ── Global folder mouseup ──
  document.addEventListener('mouseup', () => {
    if (!folderDrag) return;
    folderDrag.el.classList.remove('folder-dragging');
    if (folderDrag.moved) {
      folderDrag.el._dragged = true;
      setTimeout(() => { folderDrag.el._dragged = false; }, 250);
    }
    folderDrag = null;
  });

  // ── Desktop click deselects ──
  desktop?.addEventListener('click', () => {
    folders.forEach(f => f.classList.remove('selected'));
  });
}

/* ═══════════════════════════
   DRAGGABLE WINDOWS
═══════════════════════════ */
function initDraggableWindows() {
  const desktop = document.getElementById('desktop');
  let   winDrag  = null;

  document.querySelectorAll('.window').forEach(win => {
    // Clicking any part of win brings it to front
    win.addEventListener('mousedown', () => bringToFront(win), true);

    const chrome = win.querySelector('.win-chrome');
    if (!chrome) return;

    chrome.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      if (e.target.closest('.traffic-lights')) return; // don't drag from buttons
      e.preventDefault();

      bringToFront(win);

      // If window hasn't been manually positioned yet, compute real px coords
      if (!win.classList.contains('win-positioned')) {
        const dr = desktop.getBoundingClientRect();
        const wr = win.getBoundingClientRect();
        win.style.left      = (wr.left - dr.left) + 'px';
        win.style.top       = (wr.top  - dr.top)  + 'px';
        win.style.translate = 'none';
        win.style.transform = 'none';
        win.style.animation = 'none';
        win.classList.add('win-positioned');
      }

      const dr = desktop.getBoundingClientRect();
      const wr = win.getBoundingClientRect();
      winDrag = {
        win,
        mx: e.clientX, my: e.clientY,
        ox: wr.left - dr.left,
        oy: wr.top  - dr.top,
      };
    });
  });

  document.addEventListener('mousemove', e => {
    if (!winDrag) return;
    const { win, mx, my, ox, oy } = winDrag;
    const dr = desktop.getBoundingClientRect();
    const dx = e.clientX - mx;
    const dy = e.clientY - my;
    const CHROME_H = 44;
    const ww = win.offsetWidth;
    // clamp: always keep title bar reachable
    const nl = Math.max(-(ww - 120), Math.min(dr.width  - 120, ox + dx));
    const nt = Math.max(0,           Math.min(dr.height - CHROME_H, oy + dy));
    win.classList.add('win-dragging');
    win.style.left = nl + 'px';
    win.style.top  = nt + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!winDrag) return;
    winDrag.win.classList.remove('win-dragging');
    winDrag = null;
  });
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

  setTimeout(() => {
    document.getElementById('welcomeWindow')?.classList.add('active');
  }, 150);
});


/* ═══════════════════════════
   WIDGET — ANALOG CLOCK
═══════════════════════════ */
function initClockWidget() {
  const canvas = document.getElementById('clockCanvas');
  const dateEl = document.getElementById('widgetDate');
  if (!canvas) return;

  // Hi-DPI support
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const SIZE = 160;
  canvas.width  = SIZE * dpr;
  canvas.height = SIZE * dpr;
  canvas.style.width  = SIZE + 'px';
  canvas.style.height = SIZE + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const CX = SIZE / 2, CY = SIZE / 2;
  const R  = SIZE / 2 - 4;

  const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Draw a rounded rect via path (broad compat)
  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y,     x + r, y);
    ctx.closePath();
  }

  function hand(angle, length, back, width, color, shadow) {
    ctx.save();
    if (shadow) { ctx.shadowColor = 'rgba(0,0,0,.18)'; ctx.shadowBlur = 4; }
    ctx.beginPath();
    ctx.moveTo(CX - Math.cos(angle) * back,   CY - Math.sin(angle) * back);
    ctx.lineTo(CX + Math.cos(angle) * length, CY + Math.sin(angle) * length);
    ctx.strokeStyle = color;
    ctx.lineWidth   = width;
    ctx.lineCap     = 'round';
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    const now = new Date();
    const H   = now.getHours() % 12;
    const M   = now.getMinutes();
    const S   = now.getSeconds();
    const MS  = now.getMilliseconds();

    // Date label
    if (dateEl) {
      dateEl.textContent = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;
    }

    ctx.clearRect(0, 0, SIZE, SIZE);

    // ── Face background ──
    ctx.save();
    roundedRect(2, 2, SIZE - 4, SIZE - 4, 28);
    // Outer bevel shadow
    ctx.shadowColor = 'rgba(0,0,0,.22)';
    ctx.shadowBlur  = 10;
    ctx.shadowOffsetY = 2;
    const bg = ctx.createRadialGradient(CX, CY - 12, 0, CX, CY, R + 6);
    bg.addColorStop(0, '#ffffff');
    bg.addColorStop(1, '#e8e8ec');
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.restore();

    // Clip everything inside the face
    ctx.save();
    roundedRect(2, 2, SIZE - 4, SIZE - 4, 28);
    ctx.clip();

    // ── Tick marks ──
    for (let i = 0; i < 60; i++) {
      const a       = (i / 60) * Math.PI * 2 - Math.PI / 2;
      const major   = i % 5 === 0;
      const outerR  = R - 2;
      const innerR  = major ? outerR - 9 : outerR - 5;
      ctx.beginPath();
      ctx.moveTo(CX + Math.cos(a) * innerR, CY + Math.sin(a) * innerR);
      ctx.lineTo(CX + Math.cos(a) * outerR, CY + Math.sin(a) * outerR);
      ctx.strokeStyle = major ? 'rgba(50,50,58,.82)' : 'rgba(160,160,170,.55)';
      ctx.lineWidth   = major ? 2.4 : 1.1;
      ctx.lineCap     = 'round';
      ctx.stroke();
    }

    // ── Hour numbers: 12 / 3 / 6 / 9 ──
    const numR  = R - 20;
    const fSize = Math.round(SIZE * 0.115);
    ctx.font         = `600 ${fSize}px -apple-system, "SF Pro Rounded", Inter, sans-serif`;
    ctx.fillStyle    = 'rgba(44,44,52,.88)';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    [
      { n:'12', a: -Math.PI / 2 },
      { n:'3',  a:  0            },
      { n:'6',  a:  Math.PI / 2  },
      { n:'9',  a:  Math.PI      },
    ].forEach(({ n, a }) => {
      ctx.fillText(n, CX + Math.cos(a) * numR, CY + Math.sin(a) * numR);
    });

    // ── Smooth angles ──
    const secA  = ((S + MS / 1000) / 60) * Math.PI * 2 - Math.PI / 2;
    const minA  = ((M + S   / 60)  / 60) * Math.PI * 2 - Math.PI / 2;
    const hourA = ((H + M   / 60)  / 12) * Math.PI * 2 - Math.PI / 2;

    // Hour hand  (short, thick, black)
    hand(hourA, R * 0.50, R * 0.12, 5,   'rgba(28,28,32,.95)', true);
    // Minute hand (long, medium, black)
    hand(minA,  R * 0.72, R * 0.14, 3.5, 'rgba(28,28,32,.90)', true);
    // Second hand (orange, thin)
    hand(secA,  R * 0.80, R * 0.20, 1.6, '#ff9500', false);

    // ── Center cap ──
    // Orange ring
    ctx.beginPath();
    ctx.arc(CX, CY, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ff9500';
    ctx.fill();
    // White dot
    ctx.beginPath();
    ctx.arc(CX, CY, 2.8, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    ctx.restore(); // end clip
  }

  // Animate every frame for smooth second hand sweep
  (function loop() { draw(); requestAnimationFrame(loop); })();
}


/* ═══════════════════════════
   WIDGET — DEV QUOTES
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
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "99 little bugs in the code. Take one down, patch it around… 127 little bugs in the code.", author: "Anonymous" },
  { text: "Without requirements or design, programming is the art of adding bugs to an empty text file.", author: "Louis Srygley" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Debugging is twice as hard as writing the code. If you write it as cleverly as possible, you're not smart enough to debug it.", author: "Brian Kernighan" },
  { text: "Every great developer you know got there by solving problems they were unqualified to solve — until they did it.", author: "Patrick McKenzie" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "A ship in port is safe, but that's not what ships are built for.", author: "Grace Hopper" },
];

function initQuoteWidget() {
  const textEl   = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  const widget   = document.getElementById('quoteWidget');
  if (!textEl || !widget) return;

  let current = Math.floor(Math.random() * DEV_QUOTES.length);

  function showQuote(q, animate) {
    if (animate) {
      textEl.classList.add('fade-out');
      setTimeout(() => {
        textEl.textContent   = q.text;
        authorEl.textContent = `— ${q.author}`;
        textEl.classList.remove('fade-out');
      }, 280);
    } else {
      textEl.textContent   = q.text;
      authorEl.textContent = `— ${q.author}`;
    }
  }

  showQuote(DEV_QUOTES[current], false);

  widget.addEventListener('click', () => {
    current = (current + 1) % DEV_QUOTES.length;
    showQuote(DEV_QUOTES[current], true);
  });
  widget.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); widget.click(); }
  });

  // Auto-rotate every 18s
  setInterval(() => {
    current = (current + 1) % DEV_QUOTES.length;
    showQuote(DEV_QUOTES[current], true);
  }, 18000);
}

/* ═══════════════════════════
   ARCADE: CATCH THE BUG
═══════════════════════════ */
const BUG_EMOJIS = ['🐛','🦟','🪲','🐞','🦗','🪳'];
let bugGame = {
  score:0, bugs:[], spawnInterval:null,
  animFrame:null, gameArea:null, gameRunning:false,
  timerInterval:null, timeLeft:60,
};

function initBugGame() {
  const gameArea = document.getElementById('bugGameArea');
  const scoreEl  = document.getElementById('bugScore');
  const timerEl  = document.getElementById('bugTimer');
  const resetBtn = document.getElementById('bugReset');
  const overlay  = document.getElementById('bugGameOver');
  const scoreMsg = document.getElementById('bugScoreMsg');
  const viewBtn  = document.getElementById('bugViewProjects');
  const againBtn = document.getElementById('bugPlayAgain');
  if (!gameArea || !scoreEl) return;

  // Kill previous run
  bugGame.gameRunning = false;
  cancelAnimationFrame(bugGame.animFrame);
  clearInterval(bugGame.spawnInterval);
  clearInterval(bugGame.timerInterval);
  gameArea.querySelectorAll('.game-bug').forEach(b => b.remove());
  overlay?.classList.remove('visible');

  bugGame = { score:0, bugs:[], spawnInterval:null, animFrame:null, gameArea, gameRunning:true, timerInterval:null, timeLeft:60 };

  function updateScore() { if (scoreEl) scoreEl.textContent = bugGame.score; }
  function updateTimer()  {
    if (!timerEl) return;
    timerEl.textContent = `${bugGame.timeLeft}s`;
    timerEl.style.color = bugGame.timeLeft <= 10 ? '#f87171' : '';
  }

  function spawnBug() {
    if (!bugGame.gameRunning || bugGame.bugs.length >= 9) return;
    const W = gameArea.offsetWidth || 600;
    const H = gameArea.offsetHeight || 400;
    const SIZE = 34;
    const bug  = document.createElement('div');
    bug.className   = 'game-bug';
    bug.textContent = BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)];

    const angle = Math.random() * Math.PI * 2;
    const speed = 0.9 + Math.random() * 1.5;
    const bugObj = {
      el:bug, SIZE,
      x: Math.random() * (W - SIZE),
      y: Math.random() * (H - SIZE),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    };
    bug.style.left = bugObj.x + 'px';
    bug.style.top  = bugObj.y + 'px';

    bug.addEventListener('click', e => {
      e.stopPropagation();
      if (!bugGame.gameRunning || bug.classList.contains('bug-caught')) return;
      bug.classList.add('bug-caught');
      bugGame.score++;
      updateScore();
      const idx = bugGame.bugs.indexOf(bugObj);
      if (idx > -1) bugGame.bugs.splice(idx, 1);
      setTimeout(() => bug.remove(), 320);
    });

    gameArea.appendChild(bug);
    bugGame.bugs.push(bugObj);
  }

  function gameLoop() {
    if (!bugGame.gameRunning) return;
    const W = gameArea.offsetWidth || 600;
    const H = gameArea.offsetHeight || 400;
    bugGame.bugs.forEach(b => {
      b.x += b.vx; b.y += b.vy;
      if (b.x < 0)          { b.vx =  Math.abs(b.vx); b.x = 0; }
      if (b.x > W - b.SIZE) { b.vx = -Math.abs(b.vx); b.x = W - b.SIZE; }
      if (b.y < 0)          { b.vy =  Math.abs(b.vy); b.y = 0; }
      if (b.y > H - b.SIZE) { b.vy = -Math.abs(b.vy); b.y = H - b.SIZE; }
      b.el.style.left = b.x + 'px';
      b.el.style.top  = b.y + 'px';
    });
    bugGame.animFrame = requestAnimationFrame(gameLoop);
  }

  function endGame() {
    bugGame.gameRunning = false;
    cancelAnimationFrame(bugGame.animFrame);
    clearInterval(bugGame.spawnInterval);
    clearInterval(bugGame.timerInterval);
    if (scoreMsg) scoreMsg.textContent = bugGame.score;
    overlay?.classList.add('visible');
  }

  function resetGame() {
    overlay?.classList.remove('visible');
    gameArea.querySelectorAll('.game-bug').forEach(b => b.remove());
    bugGame.gameRunning = false;
    cancelAnimationFrame(bugGame.animFrame);
    clearInterval(bugGame.spawnInterval);
    clearInterval(bugGame.timerInterval);
    bugGame.score = 0; bugGame.bugs = []; bugGame.timeLeft = 60;
    if (timerEl) timerEl.style.color = '';
    updateScore(); updateTimer();
    start();
  }

  function start() {
    bugGame.gameRunning = true;
    for (let i = 0; i < 4; i++) setTimeout(spawnBug, i * 280);
    bugGame.spawnInterval = setInterval(spawnBug, 2000);
    gameLoop();
    bugGame.timerInterval = setInterval(() => {
      bugGame.timeLeft--;
      updateTimer();
      if (bugGame.timeLeft <= 0 && bugGame.gameRunning) endGame();
    }, 1000);
  }

  // Bind buttons (remove old listeners by cloning)
  [resetBtn, againBtn, viewBtn].forEach(btn => {
    if (!btn) return;
    const clone = btn.cloneNode(true);
    btn.parentNode.replaceChild(clone, btn);
  });

  document.getElementById('bugReset')?.addEventListener('click', resetGame);
  document.getElementById('bugPlayAgain')?.addEventListener('click', resetGame);
  document.getElementById('bugViewProjects')?.addEventListener('click', () => {
    closeWindow('arcadeWindow');
    openWindow('projectsWindow', 'dockFinder');
  });

  updateScore(); updateTimer();
  start();
}

