/* ============================================================
   KRISTOU COUCOU BEACH — main.js  (vanilla JS)
   ============================================================ */
(function () {
  'use strict';

  const WA = 'https://wa.me/21693604882?text=';

  /* -------- Header: transparent over hero, solid green on scroll -------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Mobile menu -------- */
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  const toggleMenu = (open) => {
    const willOpen = open ?? !menu.classList.contains('open');
    menu.classList.toggle('open', willOpen);
    burger.classList.toggle('open', willOpen);
    burger.setAttribute('aria-expanded', String(willOpen));
    menu.setAttribute('aria-hidden', String(!willOpen));
  };
  burger.addEventListener('click', () => toggleMenu());
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* -------- Active nav link on scroll -------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* -------- Hero slideshow -------- */
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsWrap = document.getElementById('hero-dots');
  let current = 0, timer = null;
  const INTERVAL = 5000;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Image ' + (i + 1));
    dot.addEventListener('click', () => { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === current));
    dots.forEach((d, k) => d.classList.toggle('active', k === current));
  }
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);
  const start = () => { timer = setInterval(next, INTERVAL); };
  const restart = () => { clearInterval(timer); start(); };

  document.getElementById('hero-next').addEventListener('click', () => { next(); restart(); });
  document.getElementById('hero-prev').addEventListener('click', () => { prev(); restart(); });
  start();

  /* -------- Videos: always replay when finished -------- */
  document.querySelectorAll('video').forEach(v => {
    v.loop = true; // native loop
    v.addEventListener('ended', () => { v.currentTime = 0; v.play().catch(() => {}); });
    // ensure autoplay kicks in when in view (some browsers pause offscreen)
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) v.play().catch(() => {}); });
    }, { threshold: 0.25 });
    io.observe(v);
  });

  /* -------- Gallery: mix all pics_ folders -------- */
  const galleryImages = [
    { src: 'assets/media/hero/hero-1.webp', alt: 'Panorama de la plage privée' },
    { src: 'assets/media/exp/exp-1.webp', alt: 'Journée magique sous le soleil' },
    { src: 'assets/media/services/service-bateau.webp', alt: 'Traversée en bateau' },
    { src: 'assets/media/hero/hero-4.webp', alt: 'Ambiance festive au bord de la mer' },
    { src: 'assets/media/hist/hist-1.webp', alt: 'Accueil chaleureux les pieds dans le sable' },
    { src: 'assets/media/services/service-cabine.webp', alt: 'Cabine privée face à la mer' },
    { src: 'assets/media/hero/hero-2.webp', alt: 'Eaux cristallines de Ghar El Melh' },
    { src: 'assets/media/services/service-cocktail.webp', alt: 'Mocktails signature' },
    { src: 'assets/media/hero/hero-6.webp', alt: 'Détente et évasion' },
    { src: 'assets/media/services/service-dej.webp', alt: 'Déjeuner de poisson frais' },
    { src: 'assets/media/hero/hero-3.webp', alt: 'Cabanes et paillotes en mer' },
    { src: 'assets/media/hero/hero-5.webp', alt: 'Coucher de soleil spectaculaire' }
  ];
  // Deterministic shuffle (fixed seed order) so it feels mixed without Math.random
  const order = [4, 0, 7, 2, 10, 5, 1, 8, 3, 11, 6, 9];
  const mixed = order.map(i => galleryImages[i]).filter(Boolean);

  const grid = document.getElementById('gallery-grid');
  const INITIAL = 6;
  mixed.forEach((img, i) => {
    const fig = document.createElement('figure');
    fig.className = 'gallery-item' + (i >= INITIAL ? ' is-hidden' : '');
    fig.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy" />`;
    fig.addEventListener('click', () => openLightbox(i));
    grid.appendChild(fig);
  });

  const moreBtn = document.getElementById('gallery-more');
  if (mixed.length <= INITIAL) { moreBtn.style.display = 'none'; }
  let expanded = false;
  moreBtn.addEventListener('click', () => {
    expanded = !expanded;
    grid.querySelectorAll('.gallery-item').forEach((el, i) => {
      if (i >= INITIAL) el.classList.toggle('is-hidden', !expanded);
    });
    moreBtn.textContent = expanded ? 'Afficher moins' : 'Afficher plus';
  });

  /* -------- Lightbox -------- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  let lbIndex = 0;
  function openLightbox(i) {
    lbIndex = i;
    lbImg.src = mixed[i].src; lbImg.alt = mixed[i].alt;
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function lbGo(d) {
    lbIndex = (lbIndex + d + mixed.length) % mixed.length;
    lbImg.src = mixed[lbIndex].src; lbImg.alt = mixed[lbIndex].alt;
  }
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-next').addEventListener('click', () => lbGo(1));
  document.getElementById('lb-prev').addEventListener('click', () => lbGo(-1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lbGo(1);
    if (e.key === 'ArrowLeft') lbGo(-1);
  });

  /* -------- Forfaits (data-driven) -------- */
  const forfaits = [
    { name: 'Parasol', price: 70, img: 'assets/media/forfait/forfait-70.webp', slug: 'parasol' },
    { name: 'Paillote en mer', price: 80, img: 'assets/media/forfait/forfait-80.webp', slug: 'paillote en mer' },
    { name: 'Cabane avec piscine privée', price: 90, img: 'assets/media/forfait/forfait-90.webp', slug: 'cabane avec piscine privée' },
    { name: 'Cabane VIP face à la mer', price: 90, img: 'assets/media/forfait/forfait-100.webp', slug: 'cabane VIP face à la mer' },
    { name: 'Cabane VIP avec piscine dans la mer', price: 130, img: 'assets/media/forfait/forfait-130.webp', slug: 'cabane VIP avec piscine dans la mer',
      featured: true, extra: 'À partir de 5 personnes · L\'enfant -11 ans : 45 DT · -5 ans : gratuit.' }
  ];

  const fGrid = document.getElementById('forfaits-grid');
  forfaits.forEach(f => {
    const included = `Ce prix inclut le parking, le transport aller-retour en bateau, l'accès à votre ${f.slug}, ainsi qu'un déjeuner complet à base de poisson.`;
    const msg = encodeURIComponent(`Bonjour Kristou Coucou Beach, je souhaite réserver le forfait ${f.name} (${f.price} DT). Merci.`);
    const card = document.createElement('article');
    card.className = 'forfait-card reveal' + (f.featured ? ' featured' : '');
    card.innerHTML = `
      <div class="forfait-img">
        ${f.featured ? '<span class="forfait-tag">Le plus exclusif</span>' : ''}
        <img src="${f.img}" alt="Forfait ${f.name}" loading="lazy" />
      </div>
      <div class="forfait-body">
        <h3>${f.name}</h3>
        <div class="forfait-price">${f.price} <span class="cur">DT</span></div>
        ${f.extra ? `<p class="forfait-extra">${f.extra}</p>` : ''}
        <p class="forfait-desc">${included}</p>
        <a class="btn btn-primary" href="${WA}${msg}" target="_blank" rel="noopener">Réserver</a>
      </div>`;
    fGrid.appendChild(card);
  });

  /* -------- Scroll reveal -------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* -------- Footer year -------- */
  document.getElementById('year').textContent = new Date().getFullYear();

})();
