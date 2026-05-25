/* ============================================================
   ROXEN DYNAMICS — interactions
   ============================================================ */

// ── Nav scroll state ───────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu ────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Fade-up on scroll (Intersection Observer) ─────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Lead form ──────────────────────────────────────────────
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = leadForm.querySelector('.lead-submit');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#1a8a4a';
    btn.disabled = true;
    leadForm.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
  });
}

// ── Service tabs ───────────────────────────────────────────
document.querySelectorAll('.stab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = btn.dataset.tab;
    document.querySelectorAll('.stab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.stab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`.stab-panel[data-panel="${idx}"]`).classList.add('active');
  });
});

// ── Staggered children ─────────────────────────────────────
document.querySelectorAll('[data-stagger]').forEach(parent => {
  const children = parent.children;
  Array.from(children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});

// ── Hero arch milestone ─────────────────────────────────────
(function () {
  const archWrap = document.querySelector('.hero-arch-wrap');
  if (!archWrap) return;

  const heroEl    = document.getElementById('hero');
  const pathFill  = archWrap.querySelector('.arch-path-fill');
  const nodes     = Array.from(archWrap.querySelectorAll('.arch-node'));
  const hint      = archWrap.querySelector('.arch-hint');

  // Bezier t-positions for the 4 dots (matches path M 100 20 C 160 130, 160 350, 100 460)
  const T_POSITIONS = [0.15, 0.38, 0.62, 0.85];
  // ViewBox dimensions (must match SVG viewBox attribute)
  const VB_W = 200, VB_H = 480;

  let totalLen = 0;
  let activeIndex = -1;

  function positionNodes() {
    totalLen = pathFill.getTotalLength();
    pathFill.style.strokeDasharray  = totalLen;
    pathFill.style.strokeDashoffset = totalLen; // starts empty

    T_POSITIONS.forEach(function (t, i) {
      const pt   = pathFill.getPointAtLength(t * totalLen);
      const xPct = (pt.x / VB_W) * 100;
      const yPct = (pt.y / VB_H) * 100;
      nodes[i].style.left = xPct + '%';
      nodes[i].style.top  = yPct + '%';
    });
  }

  // Reduced-motion: skip interaction, show everything immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(function () {
      positionNodes();
      nodes.forEach(function (n) { n.classList.add('completed'); });
      nodes[nodes.length - 1].classList.add('active');
      pathFill.style.strokeDashoffset = 0;
    });
    return;
  }

  // Mobile: arch is hidden, no interaction needed
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Init after layout paint
  requestAnimationFrame(function () {
    requestAnimationFrame(positionNodes);
  });

  // ── Scroll-lock state
  let heroCompleted = false;
  let virtualY      = 0;
  const TOTAL_VIRTUAL = 1400;
  let touchStartY   = 0;

  function setArch(progress) {
    progress = Math.max(0, Math.min(1, progress));

    if (totalLen) {
      pathFill.style.strokeDashoffset = totalLen * (1 - progress);
    }

    // Each dot owns 25% of the progress range; activate when its midpoint is reached
    const raw = Math.floor(progress * 4);
    const next = Math.min(3, raw);

    if (next === activeIndex) return;
    activeIndex = next;

    nodes.forEach(function (node, i) {
      node.classList.remove('active', 'completed');
      if (i < activeIndex)      node.classList.add('completed');
      else if (i === activeIndex) node.classList.add('active');
    });
  }

  function tryAdvance(delta) {
    if (heroCompleted || isMobile()) return false;
    // Only intercept while page hasn't scrolled past hero
    if (window.scrollY > heroEl.offsetHeight * 0.35) return false;

    virtualY = Math.max(0, Math.min(TOTAL_VIRTUAL, virtualY + delta));
    setArch(virtualY / TOTAL_VIRTUAL);

    if (virtualY >= TOTAL_VIRTUAL) {
      markComplete();
    }
    return true;
  }

  function attachListeners() {
    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('keydown',    onKeyDown,    false);
  }

  function detachListeners() {
    window.removeEventListener('wheel',      onWheel,      false);
    window.removeEventListener('touchstart', onTouchStart, false);
    window.removeEventListener('touchmove',  onTouchMove,  false);
    window.removeEventListener('keydown',    onKeyDown,    false);
  }

  function markComplete() {
    heroCompleted = true;
    nodes.forEach(function (n) {
      n.classList.remove('active');
      n.classList.add('completed');
    });
    nodes[nodes.length - 1].classList.add('active');
    if (totalLen) pathFill.style.strokeDashoffset = 0;
    if (hint) hint.classList.add('hidden');
    detachListeners();
  }

  // Re-engage scroll-lock when user scrolls back to top of page
  window.addEventListener('scroll', function () {
    if (!heroCompleted || isMobile()) return;
    if (window.scrollY < 8) {
      heroCompleted = false;
      virtualY = TOTAL_VIRTUAL;
      if (hint) hint.classList.remove('hidden');
      attachListeners();
    }
  }, { passive: true });

  function onWheel(e) {
    if (!tryAdvance(e.deltaY)) return;
    e.preventDefault();
  }

  function onTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    const delta = (touchStartY - e.touches[0].clientY) * 1.6;
    touchStartY = e.touches[0].clientY;
    if (!tryAdvance(delta)) return;
    e.preventDefault();
  }

  function onKeyDown(e) {
    if (heroCompleted || isMobile()) return;
    if (window.scrollY > heroEl.offsetHeight * 0.35) return;
    const STEP = { ArrowDown: 120, ArrowUp: -120, PageDown: 400, PageUp: -400, ' ': 200, End: TOTAL_VIRTUAL }[e.key];
    if (STEP === undefined) return;
    e.preventDefault();
    tryAdvance(STEP);
  }

  attachListeners();

  // Show dot 0 as active on load
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      setArch(0);
    });
  });
})();

// ── Team expert switcher ───────────────────────────────────
(function () {
  var experts = [
    {
      name: 'Arsalan Karim',
      role: 'Principal Consultant',
      quote: 'Strategy without execution is hallucination.',
      linkedin: 'https://www.linkedin.com/in/arsalan-karim/',
      specialty: 'Enterprise Architecture',
      experience: '20+ Years',
      focus: 'Financial & Healthcare',
      methodology: 'SCAR Framework',
      credentials: 'EA · MBA · MHI',
      location: 'Toronto, ON',
      background: 'Arsalan Karim is a physician-turned-enterprise architect with over two decades of experience spanning healthcare systems, financial services, and digital transformation. As founder of Roxen Dynamics, he developed the SCAR Framework to help organizations align strategy, capabilities, architecture, and risk into cohesive, executable roadmaps.'
    },
    {
      name: 'Dr. Priya Mehta',
      role: 'Senior Advisor',
      quote: 'Healthcare systems transform when people do.',
      linkedin: 'https://www.linkedin.com/in/',
      specialty: 'Digital Health & Systems',
      experience: '15+ Years',
      focus: 'Healthcare & Life Sciences',
      methodology: 'TOGAF / HIMSS',
      credentials: 'MD · TOGAF 9',
      location: 'Toronto, ON',
      background: 'Dr. Priya Mehta brings 15 years of experience at the intersection of clinical medicine and health informatics. She has led digital health transformations for major hospital networks and government health agencies across Canada, with deep expertise in FHIR interoperability and patient-centred system design.'
    },
    {
      name: "James O'Brien",
      role: 'Technology Strategist',
      quote: 'Architecture is the skeleton of strategy.',
      linkedin: 'https://www.linkedin.com/in/',
      specialty: 'Cloud & Integration',
      experience: '18+ Years',
      focus: 'Technology & FinTech',
      methodology: 'Domain-Driven Design',
      credentials: 'AWS · Azure Certified',
      location: 'Toronto, ON',
      background: "James O'Brien is a cloud and integration architect with 18 years of experience designing scalable enterprise platforms for financial institutions and technology firms. He specialises in cloud-native migrations, API-led connectivity, and Domain-Driven Design, having delivered large-scale programmes across North America and Europe."
    },
    {
      name: 'Sofia Reyes',
      role: 'Change Management Lead',
      quote: 'Change sticks when capability is built, not bought.',
      linkedin: 'https://www.linkedin.com/in/',
      specialty: 'Org Design & Transformation',
      experience: '12+ Years',
      focus: 'Financial Services & Retail',
      methodology: 'Prosci / ADKAR',
      credentials: 'Prosci · PMP',
      location: 'Toronto, ON',
      background: 'Sofia Reyes is an organizational design and change management specialist with a track record of embedding lasting capability across financial services and retail enterprises. She leads stakeholder engagement, training architecture, and adoption programmes that ensure technology investments translate into measurable behavioural change.'
    },
  ];

  var cards = document.querySelectorAll('.team-card');
  if (!cards.length) return;

  var activeIndex = 0;

  function activateExpert(index) {
    activeIndex = index;
    cards.forEach(function (c, i) {
      c.classList.toggle('active', i === index);
      c.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
    var e = experts[index];
    document.getElementById('tm-specialty').textContent = e.specialty;
    document.getElementById('tm-experience').textContent = e.experience;
    document.getElementById('tm-focus').textContent = e.focus;
    document.getElementById('tm-methodology').textContent = e.methodology;
    document.getElementById('tm-credentials').textContent = e.credentials;
    document.getElementById('tm-location').textContent = e.location;
    document.getElementById('tm-background').textContent = e.background;
  }

  cards.forEach(function (card, i) {
    card.addEventListener('click', function () { activateExpert(i); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateExpert(i); }
    });
  });

})();
