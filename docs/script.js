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
    card.addEventListener('click', function () {
      activateExpert(i);
      if (window.innerWidth <= 768) {
        setTimeout(function () {
          document.getElementById('team-meta').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateExpert(i); }
    });
  });

})();


// ── Pulse: render hero + list from posts.json, then wire search + filter ──
(function () {
  var heroContainer = document.getElementById('pulse-hero');
  var listContainer = document.getElementById('pulse-list');
  if (!heroContainer || !listContainer) return;

  var TAG_LABELS = {
    health: 'Digital Health',
    arch: 'Architecture',
    ai: 'AI &amp; Technology',
    strategy: 'Leadership'
  };

  fetch('posts/posts.json')
    .then(function (res) { return res.json(); })
    .then(function (posts) {
      posts = posts.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
      renderHero(posts.slice(0, 5));
      renderList(posts);
      document.querySelectorAll('.fade-up').forEach(function (el) { observer.observe(el); });
      initSearchAndFilter();
    })
    .catch(function (err) { console.error('Failed to load posts/posts.json', err); });

  function renderHero(items) {
    if (!items.length) return;
    var lead = items[0];
    var rest = items.slice(1, 5);
    var leadTag = lead.tags[0];

    var html =
      '<article class="pulse-lead-article">' +
        '<div class="pulse-lead-body">' +
          '<span class="pulse-tag pulse-tag--' + leadTag + '">' + TAG_LABELS[leadTag] + '</span>' +
          '<h2 class="pulse-lead-title"><a href="posts/' + lead.file + '">' + lead.title + '</a></h2>' +
          '<p class="pulse-lead-excerpt">' + lead.excerpt + '</p>' +
          '<div class="pulse-meta">' +
            '<img src="arsalan_profile2.png" alt="Arsalan Karim" class="pulse-avatar" />' +
            '<div>' +
              '<span class="pulse-author">Arsalan Karim</span>' +
              '<span class="pulse-meta-sep">·</span>' +
              '<span>' + lead.displayDate + '</span>' +
              '<span class="pulse-meta-sep">·</span>' +
              '<span>' + lead.readTime + ' min read</span>' +
            '</div>' +
          '</div>' +
          '<a href="posts/' + lead.file + '" class="btn btn-primary" style="display:inline-block">Read Article &rarr;</a>' +
        '</div>' +
      '</article>';

    html += '<div class="pulse-secondary-grid">';
    rest.forEach(function (item) {
      var tag = item.tags[0];
      html +=
        '<article class="pulse-mini-card fade-up">' +
          '<div class="pulse-mini-body">' +
            '<span class="pulse-tag pulse-tag--' + tag + '">' + TAG_LABELS[tag] + '</span>' +
            '<h3 class="pulse-mini-title"><a href="posts/' + item.file + '">' + item.title + '</a></h3>' +
            '<div class="pulse-meta pulse-meta--sm">' +
              '<span class="pulse-author">Arsalan Karim</span>' +
              '<span class="pulse-meta-sep">·</span>' +
              '<span>' + item.displayDateShort + '</span>' +
              '<span class="pulse-meta-sep">·</span>' +
              '<span>' + item.readTime + ' min</span>' +
            '</div>' +
          '</div>' +
        '</article>';
    });
    html += '</div>';

    heroContainer.innerHTML = html;
  }

  function renderList(items) {
    var html = '';
    items.forEach(function (item) {
      var dataTag = item.tags.join(',');
      var dataSearchRaw = (item.title + ' ' + item.excerpt + ' ' + item.tags.map(function (t) { return TAG_LABELS[t]; }).join(' ')).toLowerCase();
      var dataSearch = dataSearchRaw.replace(/&amp;/g, '&').replace(/"/g, '&quot;');
      var tagsHtml = item.tags.map(function (t) {
        return '<span class="pulse-tag pulse-tag--' + t + '">' + TAG_LABELS[t] + '</span>';
      }).join('');
      html +=
        '<article class="pulse-list-item fade-up" data-tag="' + dataTag + '" data-search="' + dataSearch + '">' +
          '<div class="pulse-list-body">' +
            '<div class="pulse-tags">' + tagsHtml + '</div>' +
            '<h3 class="pulse-list-title"><a href="posts/' + item.file + '">' + item.title + '</a></h3>' +
            '<p class="pulse-list-excerpt">' + item.excerpt + '</p>' +
            '<div class="pulse-meta pulse-meta--sm">' +
              '<img src="arsalan_profile2.png" alt="Arsalan Karim" class="pulse-avatar pulse-avatar--sm" />' +
              '<span class="pulse-author">Arsalan Karim</span>' +
              '<span class="pulse-meta-sep">·</span>' +
              '<span>' + item.displayDate + '</span>' +
              '<span class="pulse-meta-sep">·</span>' +
              '<span>' + item.readTime + ' min read</span>' +
            '</div>' +
          '</div>' +
        '</article>';
    });
    listContainer.insertAdjacentHTML('afterbegin', html);
  }

  function initSearchAndFilter() {
    var searchInput = document.querySelector('.pulse-search-input');
    if (!searchInput) return;

    var filterBtns = document.querySelectorAll('.pulse-filter-btn');
    var listItems  = document.querySelectorAll('#pulse-list .pulse-list-item');
    var noResults  = document.getElementById('pulse-no-results');
    var activeFilter = 'all';

    function run() {
      var query = searchInput.value.toLowerCase().trim();
      var visible = 0;
      listItems.forEach(function (item) {
        var tagMatch  = activeFilter === 'all' || item.dataset.tag.split(',').map(function(t){return t.trim();}).indexOf(activeFilter) !== -1;
        var textMatch = !query || item.dataset.search.indexOf(query) !== -1;
        var show = tagMatch && textMatch;
        item.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (noResults) noResults.style.display = visible === 0 ? '' : 'none';
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        run();
      });
    });

    searchInput.addEventListener('input', run);
  }
})();


// ── Hero milestone card slider ──────────────────────────────
(function () {
  var stack = document.querySelector('.hero-milestone-stack');
  if (!stack) return;
  var cards = Array.from(stack.querySelectorAll('.milestone-card'));
  var dots  = Array.from(stack.querySelectorAll('.card-dot'));
  var INTERVAL = 7000;

  // idx tracks which card index is in each role
  var idx = { active: 0, next: 1, prev: 2 };

  function snap(card, cls) {
    card.classList.add('no-trans');
    card.classList.remove('is-active', 'is-next', 'is-prev');
    card.classList.add(cls);
    void card.offsetWidth; // force reflow
    card.classList.remove('no-trans');
  }

  function updateDots() {
    dots.forEach(function (d, i) { d.classList.toggle('active', i === idx.active); });
  }

  // set initial positions
  cards[idx.active].classList.add('is-active');
  cards[idx.next].classList.add('is-next');
  cards[idx.prev].classList.add('is-prev');
  updateDots();

  function advance(dir) {
    if (dir > 0) {
      // teleport prev → right, then animate active→left, next→center
      snap(cards[idx.prev], 'is-next');
      cards[idx.active].classList.replace('is-active', 'is-prev');
      cards[idx.next].classList.replace('is-next', 'is-active');
      var tmp = idx.prev;
      idx.prev = idx.active;
      idx.active = idx.next;
      idx.next = tmp;
    } else {
      // teleport next → left, then animate active→right, prev→center
      snap(cards[idx.next], 'is-prev');
      cards[idx.active].classList.replace('is-active', 'is-next');
      cards[idx.prev].classList.replace('is-prev', 'is-active');
      var tmp = idx.next;
      idx.next = idx.active;
      idx.active = idx.prev;
      idx.prev = tmp;
    }
    updateDots();
  }

  var timer = setInterval(function () { advance(1); }, INTERVAL);

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function () { advance(1); }, INTERVAL);
  }

  // dot clicks
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      if (i === idx.active) return;
      // figure out direction: forward if i is the next card
      var dir = (i === idx.next) ? 1 : -1;
      advance(dir);
      resetTimer();
    });
  });

  // scroll wheel
  var scrollLock = false;
  stack.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (scrollLock) return;
    scrollLock = true;
    setTimeout(function () { scrollLock = false; }, 600);
    advance(e.deltaY > 0 ? 1 : -1);
    resetTimer();
  }, { passive: false });
})();

/* ── Hero typewriter cycling effect ─────────────────────────── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var target = document.querySelector('.hero-typed-text');
    if (target) target.textContent = 'strategy that never gets executed?';
    return;
  }

  var phrases = [
    'strategy that never gets executed?',
    'projects that never land?',
    'disjointed systems?',
    'technology that does not work?',
    'missed milestones?',
    'siloed data?',
    'decisions that create more problems?',
    'architecture complexity?',
    'too many vendors, too little clarity?',
    'transformation that keeps stalling?',
    "AI you can't trust or govern?",
    "systems that don't talk to each other.",
    'technology misaligned with the business.',
    'systems holding you back?',
    'vendors that overpromise and underdeliver?',
    'data that no one actually uses?',
    "systems that can't talk to each other?",
    'the gap between strategy and capabilities?',
    'a digital transformation that keeps stalling?',
  ];

  var typedEl  = document.querySelector('.hero-typed-text');
  var cursorEl = document.querySelector('.hero-cursor');
  if (!typedEl || !cursorEl) return;

  // Fisher-Yates shuffle — randomise order, never repeats until all played
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
  }
  shuffle(phrases);

  var phraseIndex = 0;
  var charIndex   = 0;
  var isDeleting  = false;

  var INITIAL_DELAY = 600;
  var TYPE_SPEED    = 75;
  var DELETE_SPEED  = 42;
  var HOLD_AFTER    = 2200;
  var PAUSE_BETWEEN = 400;

  function tick() {
    var phrase = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      typedEl.textContent = phrase.slice(0, charIndex);
      cursorEl.classList.add('typing');

      if (charIndex === phrase.length) {
        cursorEl.classList.remove('typing');
        setTimeout(function () { isDeleting = true; tick(); }, HOLD_AFTER);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      typedEl.textContent = phrase.slice(0, charIndex);
      cursorEl.classList.add('typing');

      if (charIndex === 0) {
        cursorEl.classList.remove('typing');
        isDeleting = false;
        phraseIndex++;
        if (phraseIndex >= phrases.length) { phraseIndex = 0; shuffle(phrases); }
        setTimeout(tick, PAUSE_BETWEEN);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  setTimeout(tick, INITIAL_DELAY);
})();
