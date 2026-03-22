/* ═══════════════════════════
   BOOT SCREEN INIT
═══════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const bootScreen = document.getElementById("bootScreen");
  const bootProgressBar = document.getElementById("bootProgressBar");

  if (bootScreen && bootProgressBar) {
    document.body.style.overflow = "hidden";
    
    // Animate progress bar
    setTimeout(() => {
      bootProgressBar.style.width = "100%";
    }, 100);

    // After animation completes, fade out
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
  { cat:'Languages',             items:['Java','PHP','Octave'] },
  { cat:'Frameworks & Libraries',items:['Spring','Hibernate','React','React Native','Streamlit'] },
  { cat:'Databases',             items:['Postgres','MySQL','SQLite','Supabase'] },
  { cat:'DevOps & Cloud',        items:['Git','GitHub','GitLab','GitHub Actions','Docker','AWS','Azure','Vercel','Netlify'] },
  { cat:'Tools & Environments',  items:['Windows Terminal','Bash Script','Apache Maven','Apache Tomcat','Vite','Postman'] },
  { cat:'Design',                items:['Figma','Canva','Adobe Illustrator'] },
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
  if (winId === 'arcadeWindow') setTimeout(initPlatformerGame, 80);
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

  // Welcome window auto-open disabled successfully
  /*
  setTimeout(() => {
    document.getElementById('welcomeWindow')?.classList.add('active');
  }, 150);
  */
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

/* ═══════════════════════════
   ARCADE: PLATFORMER (Kaboom)
═══════════════════════════ */
let kaboomInst = null;
let currentScore = 0;

function initPlatformerGame() {
  const platScore = document.getElementById('platScore');
  const overlayStart = document.getElementById('platStartScreen');
  const overlayOver = document.getElementById('platGameOver');
  const platScoreMsg = document.getElementById('platScoreMsg');
  const platEndTitle = document.getElementById('platEndTitle');
  const platEndEmoji = document.getElementById('platEndEmoji');
  const container = document.getElementById('kaboomContainer');

  // Bind buttons (remove old listeners by cloning)
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

  function endGame(win, score) {
    if (platScoreMsg) platScoreMsg.textContent = score;
    if (platEndTitle) platEndTitle.textContent = win ? "Level Complete!" : "Game Over";
    if (platEndEmoji) platEndEmoji.textContent = win ? "🏆" : "💥";
    overlayOver?.classList.add('visible');
  }

  async function startKaboom() {
    overlayStart.classList.remove('visible');
    overlayOver.classList.remove('visible');
    currentScore = 0;
    if (platScore) platScore.textContent = currentScore;
    
    // Clean up previous canvas if any
    if (kaboomInst) {
        kaboomInst.quit();
    }
    const canvas = container.querySelector('canvas');
    if (canvas) canvas.remove();
  
    kaboomInst = kaboom({
      root: container,
      width: 720,
      height: 400,
      background: [26, 26, 26],
      letterbox: true,
      global: false
    });

      // Load sprites from The Spriters Resource
      await kaboomInst.loadSprite("player", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAgCAYAAADaInAlAAABRUlEQVR4nO2aQQrCMBBFjYgHij2IVxAEwRO4cG9PIAgFr9BziORAbupCW100nZAmJOH/twpNm9/FIzMpVQuSNaet7uauUbdG2eaWcxcnZbOSbohtIPPTwh0AHHEHIGVQt2YYn7ba+TkKkDl9+eiet8lSVLeHYXw5f8aqOoilJ5gAvgYyPy3OzYlkoKp+BnbPW38tWPPD/Ol8yzuJ+WwCwQlWAnrrU4Ge7wubwMzR19d36797P2uOa2spoACFsHnsoqwrChDbQOanxXkHiGUg89PCUwA4FAAcCgAOBQCHx8DM0eZonTP66nbfxPoUoGD+j5d6v/f6ccVZgDHDJAP/5+eCnh8LUYDesjHDJANDfABBz48Nm0BwKAA4FAAcCgAOBQCnmO8ATdNk3VHHej/XdX3zuQOAQwHAoQDgOPcAUo3JvUaTcd6CJKUMrS6cwgAAAABJRU5ErkJggg==", {
        sliceX: 4, sliceY: 1,
        anims: {
          idle: 0,
          run: { from: 1, to: 2, loop: true, speed: 8 },
          jump: 3
        }
      });
      await kaboomInst.loadSprite("bg", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAAGQCAYAAACH51dtAAAWAklEQVR4nO3dW48l11kG4G1n4tixnQQpu6d35w/Q4+nhDyAQF4hISKBcAjcoQRiLKAZyssIhOASUBAtiKyKxcBKEILa4wCIoKBApEQcl4pI+/oLs4xVnxEHNxXgy3T3dvffau6q+tVY9z90k7q6vVq1a9e6vV1c/tLNz53QAAAAZ++53/+mL73rXD7wvuo7BYDB4aDTaE6ABAN4wHu9/aGfnzgvRdZAvARoAABI8HF0AAACURIAGoCjj8f5Xo2sA+s0WDgAASKADDQDBxuP9l6NrAFanAw0AAAl0oAEAIEFvAvR4vP/z0TX02Xi8/1p0DQAATbCFAwAIMx7vv7yzc+fp6DogRW860FCy8Xj/b6NrAGiD8EyJBGgowM7OnR+OriFX4/H+V6JrAKBfBGigaDs7d3469WvG4/1n26iFfIzH+y9G1wDUyx5oADYyHu8/u7NzR2AFekOABgCABLZwADTAX5ID6A8daAAASKADTZXG4/1fjK4BAKiTDjQAACQosgM9Hu//UXQNAAD0U5EBemfnzs9G19BH3p0LAFBogCaG97wCQLvG4/3PBh33byKOWyp7oAEAIIEONAAAJBCgASo3Hu+/FF0DQE1s4QAAgAQ60ECo8Xj/D6NrAIAUOtAAAJBABxoAABII0AAAkECABgCABAI0AAAkEKABKjIe738jugaA2nkLBwAAJNCBBgCABAI0vTce778SXQP02Xi8//QK/82rXdQCsApbOAAAIIEONAAAJBCgAQAggQBNEcbj/b+KrgEAYDAYDB7a3r5tDzQAjZlMDp4bjfY+FV0H3ZhMDj46Gu19OroO6JIADYEmk4MXR6O9Z6PrAABWJ0ADAEACe6ABACCBAA0AbGQyOXguugboki0cAACQQAcaAAASCNAAAJBAgAaATE0mB/8YXQPwIHugAQAggQ40AACDyeTgr6NrKIUAzfdMJgd/HF0DABBjNNr7segaSmELBwAAJNCBBrIzmRx8LboGALiKAJ0Re4/grtFo78ejawCAq9jCAQAACXSgAQAgQZUBejI5+K3oGgDWMZkcfCW6BgCuZwsHAAAkqLIDDQAAbRGg6dRkcvBqdA0AAJsQoOnUaLT3U9E1AACrm0wOXomuITf2QAMAQAIdaMjcZHLwwegaAID7dKABACBBUgd6Mjn4WluFAABACXSgAQAggT3QAACQQIAGAMjQZHLwpegauJwADYWbTA4+G10DAM0bjfbeG10DlxOgIUOTycHvrvrfjkZ7v9RiKZ2aTA6+EV0DACwjQEOGRqO9D0fXMJkc/EHXxxyN9n6062MClGQyOfhmdA14CwcAACTRgQYAgAQCNAAAJDgXoCeTg29HFQIAACWwBxoAABLYwgEAVGsyOXg5ugbqI0ADANUajfaePvvvyeTg01G1UA8BGgAINZkcvNrVsUajvY92dSzq9dDNm0/ZAw1rmE4PP7K9ffsz0XUAAN0SoAEAIIEtHAAAkECABgCABAI0ABBmOj18IeCYf9/1MamLPdAAAJBABxoAABII0AAAkECABgCABAI0AAAkEKCBqkynhy9G1wBA3QRooCrb27efja4BoDTT6eE3o2soidfYAQBAAh1oAABI0PsAPZ0efia6BgAAytH7AL29ffsj0TUA9N10eviB6BoAVtX7AM150+nhX0bXAPTP9vbtl6JroDzT6eHz0TXQT36JEIBQ0+nhL29v3/796DoAViVAAwBAAls4AAAggQANAAAJBGiKMZ0ePhNdAwCAPdAAAJBABxoAABII0AAAkECABgCuNZ0efiG6BsiJPdAAAJBABxoAABII0AAADZhOD78YXQPdaCRAT6eHf97E98nBdHr44egaAIDybG/ffl90DXTDHmgAAEhgCwcAACQQoAEAIIEADQAACQRoAABIIEBDQabTw29H1wAAfectHAAAkEAHGs6YTg+/EF0DAJA3HWgAAEigAw0AAAlunJ5qQAMAwKp0oAEAIIEADQD0zmx29FJ0DZRLgAYga7PZ0Seia6A+N28+9YHoGijXQ1tbt2yCBgCAFelAAwBAAgEa2NhsdvQL0TUAQFds4QAAgAQ60AAADZvNjn47ugbaowMNAAAJdKABACCBAA0AAAkEaAAASCBAN2g2O/p8dA1dmc2OPhJdAwBABL9ECAAACXSggVCz2dGfRdcAACl0oAEAIIEONAAAD5jNjr4VXUOudKABACCBDjQAACQQoAGAMLPZ0V9E1wCpsgrQs9nRl6NrgLNms6Pfi64BoGY3bz71k9E1QCp7oAEAIEFWHWgAgFSz2dHr0TXQLwI0ANCp2ezog01+v5s3n3pPk98PlrGFAwAAEuhAAwBAAgEaAAASCNAAAJBAgAaAC2azo1+NrgHIl18iBACABDrQAACQQIAGAIAEAjSde+LRN0WXAACwNgEaAABWMJsdvTYY+CVCAjzx6JsG//Zf/xddBgDAWnSg6dS97RtNbuOYzY4+19g3AwBYQoCmeDdvPvX+6BpgVbPZ0fPRNQCwGQEayN5sdvTV6BqacvPmUx+PrgGAzdgDTafObt2wDxoAKNGN01P5mW48+diNc/9+4tE3Df71P/83qBoAgHRPPnbDFg4AoF7z+fHXo2ugPr0O0PP58ZeiawAA2rO1devd0TVQn14H6K2tW++NroEyzOfHvxJdwzrm8+PXomuo3Xx+/CfRNdCM+fz49egagDI8NBzu2gRN6y7ufz7LPmgAoAT38kyvO9AAAJAqKUDP58e/3lYhrGY+P/5WdA0AAH1mCwedsIUDAChdNls45vPjj0XXAAAA1znbDAwP0Ftbt34nuoZazOfHvxldw2Wu6z6v8v8DAOTEFg5at0pAto0DAMhZVh1oAAAoiQANwGAwGAzm8+MvR9cAfTWfH38yugaudvGn6bZw0KqU/c22cQAAObqYZ3SgAQAggQANAAAJBGgAALjCZdtRBWhak/p+Z++DBgBKIEC/YT4/fj26BgAA8idAv2Fr69Z7omtINZ8fPxNdAwBA33iNHa1ZZ0uGV9kBALm4KsvoQANkZD4//k50DQBcTweaVmzyC4G60ABADnSggc55swoANRKgAQDgguuaQAI00Ip7C48uNAC1EaBp3KaBSeACAHImQAMAQAIBGgAumM+PPxZdAxBn2U/DvcaOxjWxBcOr7Mp22RxwTQEoxbIsowNNo5rav2wfNDUyrwHqIEDDBfP58SvRNQAA+RKge0T3azVbW7d+LrqGGpl/AJRgleeVAA2ZKy14llZvV7wXG6AeAnQDSnggengDADRDgKYxTYdzYd8HHwDIkQC9IQEH7lt2H7hPAFgm8lmx6rEF6B64OBmEGC6az49fjq6hZu5BgLoI0MBga+vW09E1AEApP9kXoGlEWxM99xuoTbV2LWs5D4AcWFNj3Dg99Ze81/W2t7753L+ffOzG4F/+43+CqklT0nUvqda25TwWF++H6+R8Hl0xBkBTal1Puj6vlOeYDnTlrpoMKZMEWJ97EKA+AjQA11osTj4eXcM9PnjAfffuh1rui4vnkfN5CdBr0lW6r+1zNqbL//doqXXleh5cbjjcfT66hmUWi5MPRdcA9IcAXbFlIUWIAUp02do1HO6+EFAKUInUTCRAAwTxITaN8YJ6lfaTVwF6DTq7UJbF4uQfIo5rLQDaUtJ+4RoJ0JVa9Uba9Ibr6obt08JQ2ge0devp8jyGw90f7OxgAFRPgAagOLl9kATKtc56IkADkD2BGepV2k9eBwMBOllXWyOgD2q+T6wVQFtK+4W7GgnQFfJO3nKVFrpyqQMAuiRAs7auw5OwBpzV5JqwWJw809g3A1YW3Tha9/sK0Al0dgG618VaOhzufr71gwDVEKArU8IrxWhG9DVr6vjR59FGDX39sL1YnPxGdA1crZZ5xvVc524I0AVaLE4+F10DzbPoUbrhcPcT0TVA7Wp6VpTcbBCgV5RTZ3c43H1/4980UdQkzunmoQ735pS5VSbXbTXmOTxok/tBgK5IKX9VEC4y97iKuQHkaGmAXixO/q6LQoB0fhJQD2MKUI6lAXo43P2hLgqBPhOeYlwc9yaug2sJtCX6lW9Nymlr7Dps4VhBCVsjunwjQvTkjT4+kBdrwvXa+KAIpdv0PhCggSS5vcyeepkTQK4EaChcn0PGYnHy1XW/9qpxixzPPl9LoDuLxcnXI49fwk/2lxGgl6jpj0WQJ3NjfcPh7k9E13CWawm0pcl3Jg+Hu+/etJ6+E6ArEP1X1KAp5h7rMncul+NPWiBaE/NfgCZJLotuLnX0TS3jvuw8ajnPkrkGQM4E6Gvo7FIKcwuAEtSyNVaALpw3IpTNOHOROQE0xXrSHgEayErbC35bf4jAgypeSe/c74KtSvVwrZrT1FgK0Kwstxs4t3qWWSxOnouuYROljTfN62oOmGtQp5q2xgrQVyhha0QunTpWMxzufursv2taSACgTwRoIDu5fICN+lCS44ehezXlWFtXjAElWne+LhYnv9ZwKVURoIGlBIbrGZ98uBZ3tbXXn+5FXaPhcPeTIQduUZNjKUBfwtaIB+Vac651AetxT0OdcvnJYlME6EL5ZZ6y1baQlGDdsTGmD46BMQH6ToAGstT3kNb388+NDxHAWQI0cC1B4XrGJz99vyal/LLsZRaLk29F15CTWv5qXw5bY5uuQYC+oIStEV3fCNE3HmlcrwdtOiZ9HtOrzr2NMenzOHPXcLj7I9E1wCoEaIpX2kO3tHojGSsAciRAA1cSYO8zFv3VZRee7i0WJ38aXQPluXF6ehpdQzbe/vgjnR7vbW998+Cf//2/k76m6xpLYR6fV9N4bHouTd4zXY/rOmtEk5aNXXR91+mqttzutXXne87Xsm3vfOf3/0x0DV2IusZd5Zbrzq+NGnSgoUI+aHXDODfHWMJ57om8CdBUoZSFppQ6c5LTmOVUCwBxBOg3RD0YU47r4U2XaphvNZxDlFXHrvYxXnZ+OZ3/prXkdC7Uoes51eXxBGiAjAk16zN2cF4f74m2zlmAhkrVtFDmdC73asmpptIZSzjPPZE/AZpq5L7g5F5fbYz3+lLHzlgDF5WwNXYTAvQgfvFf5fjRNdIv5huUtQ+8qRpyOBcogQANkKjmX4ypjbGD8/p0T7R5rgI0VKymhdIba7qx7th1/XUAkXofoHNZvK+rI5caWV9J17CkWgFqU8MaHH0OXRy/9wGaukTftEAdSvpFyqaPbR2F5QRooCq1Pvy7OK9a/xBHrnUB7Wn7vu91gM5tUb2sntxqpDw1zaGazgXXE6K0ee/15b7udYCGLpS0mJRUK0BtrMHlEKCpjgWov1z79XmP8OYizr2tY/b5OsIqBGjogZoehjWdC93xGkSgSb0N0LkukGfryrVG6mS+5a+ma1TTuUCJ2rgH+3Rf9zZAQxf6tJhEM9br8xo0iOe+KYsATZUsRECELteeto9lHYWr9TJA574ovP3xR7KvkfLUNKdqOhe6s8q8MbdgPX27d3oZoIHzSl/4Sq8/RSnbLa77vn26XpAz9+L6BGhoiYUJAOqUbYD2bkvgOu5lclXCn13P7ThdHys3fT73UmUboGFTmy5INS5ozomz+vhLaLaW0ARz5bw+jkeWAfrehejjBaEOJc3dkmrlrpKvWcm10x7P/TjGfD1ZBmiIZjEH4DKeDwwGGQboixOyyQlqskNd3NPrq3EPbU7aPO+ux7Sv17ArpY9v6fWvK7sADU1a58Zu80NcDvy5ePrusnnvXohT0ppbUq20K6sAfdVENEEpiflKF0qcZyXWDHCZrAJ0myzcrMKHOPrAFoByRY2la1i3da9vn+dFbwI0ANxT07uaS1ZS06KNWnM8T1aTTYBeNolMMtZl7jzo7Y8/YlzgDe4FIFU2AbpNFkdW0cSHOHMNLufe4CKNM0qWRYBe9SZxMwHc18RbZihH9LWLPn6kPoT91HOo4Zw3kUWAhmg+xEH/2AcNrCs8QPvEA0AUz5QYJTUt2qo1h3NjfeEBum0mKIPB9fOgqUXPXCN35ijQBGtJoQHahQO4y3rYD7lc51zqoB2u7+pCA7QLRTQvjwfaZr04r6StDiXVSrdunJ6eRtewllXqfscTb+mgEkrR9Fwv9d6hPtbD/NW0XkScS0njV/r9WNJYRwrrQG86eXKefOSpzTljPgIwGNT/PKj9/FZV5B5oaIIPcdTCXKxbbtd3k3rW/dqIMcht3LvS1/NOFRKgm7o4LjLActbKeK4B1KXaDrTFiuv4EAfAVdr8CWXJz42Sa29a8QHaxSRFG/PFHARYzrY5atJ5gHYDEM0cpEZXzWvzvWy5Xr9c64KuFN+BvowbGwBYhy1+ZdfelU4DdFsXxIUGIHd9flYJpeUz9udV2YEGwAMPol28B92T9egsQLc9ae59f5MTgBrk/jxbtb6mz8MfxSIHOtAAlfDwB5pydj2xtjyoqgDtAgPcZT3Mk+uSL7+nRYpOArTJAwD9I5TeV2LNXK2qDjQA1KCUsFVKndGMU31utH0AkwagO9ZcSOe+uZxxuZoONAB0qC+hpKu3b0GEVgO0yQ0AaUp7dpZWLzRBBxoA6C0fAFiHAA0ANKqrUCr8EqW1AG1SA8DlPCPz4DqwLh1oAMhEqYGu1LphXa0EaDcSAPRT1xlA5iCCDjQA0DuCN5sQoAEggAAH5Wo8QFsQACBd6c/PdzzxlrBzKH3sKI8ONADQKwI3m2o0QJuQAEAEGYQu6UADQBChr3vGnCY0FqBNSABYj2colEUHGgCogg8idEWABgB6QcCmKY0EaBMSANbjGQrl0YEGAKpx1QcSH1Ro0sYB2oQEAKBPdKABACDBRgFa9xkAyM3FfCKv0DQdaAAASCBAAwBAgrUDtB+HAAC5updT5BXacOP09DS6BgCAxsk4tGWtDvT3Pflo03UAADRKXqEt9kADAECC5ADt0xwAAH2mAw0AAAkEaAAASJAUoG3fAACg73SgAQAgwcoBWvcZAAB0oAEAIMlKAVr3GQAA7tKBBgCABAI0AAAkWBqgbd8AAID7dKABACDBtQFa9xkAAM7TgQYAgARXBmjdZwAAeJAONAAAJBCgAQAgwaUB2vYNAAC4nA40AAAkeCBA6z4DAMDVdKABACDBuQCt+wwAANfTgQYAgAQCNAAAJPhegLZ9AwAAltOBBgCABA8PBrrPAACwKh1oAABI8LDuMwAArE4HGgAAEgjQAACQQIAGAIAEAjQAACQQoAEAIIEADQAACQRoAABIIEADAEACARoAABII0AAAkECABgCABAI0AAAkEKABACCBAA0AAAkEaAAASCBAAwBAAgEaAAASCNAAAJBAgAYAgAQCNAAAJBCgAQAggQANAAAJBGgAAEggQAMAQAIBGgAAEgjQAACQQIAGAIAEAjQAACQQoAEAIIEADQAACQRoAABIIEADAEACARoAABII0AAAkECABgCABAI0AAAkEKABACCBAA0AAAkEaAAASCBAAwBAAgEaAAASCNAAAJBAgAYAgAQCNAAAJBCgAQAggQANAAAJBGgAAEjw/3Qh0HxCi+NiAAAAAElFTkSuQmCC");
      await kaboomInst.loadSprite("tiles", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAvklEQVR4nO2YoRGDMBhGA4epZgNMfWaKaTxT4DMMQ8TXsAECVdkqJDk4KC93+d4A/O/ehSRQdUP3NSBTP1Xk/JocngMKQAvQKAAtQKMAtABN8QGa17igAj06XStAARpaIISAfotoBdACK9baW+fFGI0xBwK858/uhz/bx3EjiOJfAQWgBWgUgBag2X0K/HtnX4+lu8nmHrDFFWFSdww8gPc++VvcOXf6qpyaUfweoAC0AI0C0AI0CkAL0BQf4AcRbBnu4KfCpgAAAABJRU5ErkJggg==", { sliceX: 2, sliceY: 1 });
      await kaboomInst.loadSprite("items", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFRElEQVR4nO2csXHrMAyGoXfvLnNkhwyQJl32SCoP4yrZI12aDJAdMkcqvca0aYukST7C5A/+X6U72kdAAAiIErEIyWZd19Vd/77fb8bvXn6O18uyLLeR6v+AEHIEnPFDhr/EOQKCEwwvYAw/Gh1aN7zE+A5tJ2il/9824tyOkOKXYwiRV0tr/aFuVI8cHIt+f66YTK1XAQ39YVaAnGXYjd29/Mi6rqullUBL/z+tBNSkNAe736WWSyQ09YdwAKJHdQq4VRVem4N/3+9NpAJt/YsdYLYqfFmWZV3X9e7lZ3ODU6DsBRQ5QG4Vih51M5FdA/hLUcz7/TErBZjIKYpDy24IlOgXyXSA2atwkXMniDmCP4ZgfJHMjaDeW6G95w/JkkJrTg39r9YAs1fhlzhdbvkuQhOIfYARc/ASQHMuER39YbaC/ccxETvv43PR0h/GAURON0EkHQ3WjO/Q0B/KAUTs5eBSWusP8RRA9IAoAokeWQ4wYhVO2lBkIItfxc5OsZF67IQRPaoNNWsVTgghhBBCCDys2iux8hQEJ3BvrO2DwAg6Ar7xdx+Pm/H989fxGsUJIIQcAWf8kOEvcY6A4ATDCxijR3+AHOM7tJ2A/QESYwiRVwv7Axy4VQ6ORb8/V0ym1quAhv4wK0DOMuzG9s9f5j5H19If4oug0hzsfmflZJKm/hAOQPSA6Q9QmoN3H48mUoG2/uwPcAX3Lf7++Wtzg1Og7AVU9wdIVaHoUTcTxf0Bdh+PUe/3x6wUYCKnKA4tuyFQol+ksD/ArFW4yLkTxBzBH0MwvkjhyaBeW6G95w/JkkJrTg39s/sDzFqFX2LtbCLEPsCIObhHfwAN/WG2gv3HMRE77+Nz0dIfxgFEzs/Hp6LBmvEdGvpDOYCIvRxcStf+ACNU4aQtEEUg0aOoP8BIVThpQ3V/gNmqcKuwP8DksD8AIYQQQgghs8GqvRIrT0FwAvfG2j4IjKAj4Bt/+QyMP52uUZwAQsgROJ55CBh+89uDIyA4wfACxujRHyDH+Mf/KDsB+wMkxhAirxb2Bzhwqxwci35/rphMrVcBDf1hVoCcZdiNrU/2jqdp6Q/xRVBpDj7eCCMnkzT1h3AAogdMf4DSHLx82kgF2vqzP8AV3Lf469P2BqdA2Quo7g+QqkLRo24mivsDLJ9x7/fHrBRgIt5hjMCyGwIl+kUK+wPMWoWLnDtBzBH8MQTjixSeDOq1Fdp7/pAsKbTm1NA/uz/ArFX4JdbOJkLsA4yYg3v0B9DQH2Yr2H8cE7HzPj4XLf1hHEDk/Hx8KhqsGd+hoT+UA4jYy8GldO0PMEIVTtoCUQQSPYr6A4xUhZM2VPcHmK0Ktwr7A0wO+wMQQgghhBAyG6zaK7HyFAQncG+s7YPACDoCvvEfXveb8e+33fEaxQkghBwBZ/yQ4S9xjoDgBMMLGKNHf4Ac4zu0nYD9ARJjCJFXC/sDHLhVDo5Fvz9XTKbWq4CG/jArQM4y7Ma+33bmPkfX0h/ii6DSHOx+Z+Vkkqb+EA5A9IDpD1Cagx9e9yZSgbb+7A9wBfct/vfbbnODU6DsBVT3B0hVoehRNxPF/QEeXvdR7/fHrBRgIqcoDi27IVCiX6SwP8CsVbjIuRPEHMEfQzC+SOHJoF5bob3nD8mSQmtODf2z+wPMWoVfYu1sIsQ+wIg5uEd/AA39YbaC/ccxETvv43PR0h/GAUTOz8enosGa8R0a+kM5gIi9HFxK1/4AI1ThpC0QRSDRo6g/wEhVOGlDdX+A2apwq7A/wOSwPwAhhBBCCCGEEDIP/wDCugefa5645AAAAABJRU5ErkJggg==", {
        sliceX: 4, sliceY: 4,
        anims: {
          bounceJava: {from:0,to:3,loop:true,speed:6},
          bounceSpring: {from:4,to:7,loop:true,speed:6},
          bounceApi: {from:8,to:11,loop:true,speed:6},
          bounceDb: {from:12,to:15,loop:true,speed:6}
        }
      });


    kaboomInst.scene("game", () => {
      const k = kaboomInst;
      k.setGravity(2400);

      k.add([
        k.sprite("bg", { width: 720, height: 400 }),
        k.pos(0, 0),
        k.fixed(),
        k.z(-1)
      ]);

      let score = 0;
      if (platScore) platScore.textContent = score;

      // Create player
      const player = k.add([
        k.sprite("player", { anim: "idle" }),
        k.area(),
        k.body(),
        k.pos(40, 100),
        "player"
      ]);

      const SPEED = 250;
      const JUMP_FORCE = 800;

      // Controls
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
        if (!k.isKeyDown("left") && !k.isKeyDown("right") && !k.isKeyDown("a") && !k.isKeyDown("d")) {
          player.play("idle");
        } else {
          player.play("run");
        }
      });

      // Level map layout (compact, < 1 min)
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
          "=": () => [ k.sprite("tiles", { frame: 0 }), k.area(), k.body({ isStatic: true }) ],
          "-": () => [ k.sprite("tiles", { frame: 1 }), k.area(), k.body({ isStatic: true }) ],
          "0": () => [ k.sprite("items", { anim: "bounceJava" }), k.area(), k.anchor("center"), "stack", { name: "Java" } ],
          "1": () => [ k.sprite("items", { anim: "bounceSpring" }), k.area(), k.anchor("center"), "stack", { name: "Spring Boot" } ],
          "2": () => [ k.sprite("items", { anim: "bounceApi" }), k.area(), k.anchor("center"), "stack", { name: "API" } ],
          "3": () => [ k.sprite("items", { anim: "bounceDb" }), k.area(), k.anchor("center"), "stack", { name: "Database" } ],
          "F": () => [ k.text("🏁", { size: 36 }), k.area(), k.anchor("center"), "finish" ],
        }
      };

      k.addLevel(levelData, levelConf);

      player.onCollide("stack", (item) => {
        k.destroy(item);
        k.add([
          k.text("+ " + item.name, { size: 16 }),
          k.pos(item.pos.x, item.pos.y - 20),
          k.move(k.UP, 80),
          k.color(255, 220, 100),
          k.lifespan(0.8, { fade: 0.1 })
        ]);
        score++;
        if (platScore) platScore.textContent = score;
      });

      player.onCollide("finish", () => {
        endGame(true, score);
        k.scene("pause", () => {}); // blank scene to stop gameplay updates
        k.go("pause");
      });

      player.onUpdate(() => {
        k.camPos(Math.max(360, player.pos.x), 200);
        
        // Fall off map
        if (player.pos.y > 600) {
          endGame(false, score);
          k.scene("pause", () => {});
          k.go("pause");
        }
      });
    });

    kaboomInst.go("game");
  }

  domStartBtn?.addEventListener('click', startKaboom);
  domResetBtn?.addEventListener('click', startKaboom);
  domPlayAgain?.addEventListener('click', startKaboom);

  domViewProj?.addEventListener('click', () => {
    closeWindow('arcadeWindow');
    openWindow('projectsWindow', 'dockFinder');
  });
  
  // Initialize UI state
  overlayStart?.classList.remove('visible');
  overlayOver?.classList.remove('visible');
  if (platScore) platScore.textContent = '0';
  startKaboom();
}
