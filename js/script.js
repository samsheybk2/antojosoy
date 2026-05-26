/* ============================================================
   DATA
   ============================================================ */
const imgs = [
  'img/materia (1).webp',
  'img/materia (2).webp',
  'img/materia (3).webp',
  'img/materia (4).webp',
];

const galleryData = [
  { id: 1, img: imgs[0], name: 'Pastel de Chocolate Clásico', cat: 'pasteles' },
  { id: 2, img: imgs[1], name: 'Tarta de Fresas con Crema', cat: 'fresas' },
  { id: 3, img: imgs[2], name: 'Porción de Chocolate Fundido', cat: 'porciones' },
  { id: 4, img: imgs[3], name: 'Bomba de Chocolate Puro', cat: 'chocolate' },
];

const menuData = [
  { id: 1, img: imgs[0], name: 'Pastel Clásico de Chocolate', desc: 'Tres capas de bizcocho de chocolate, relleno de ganache y cubierto con frosting de chocolate belga.', price: '$680', ingredients: ['Harina de trigo', 'Cacao 70%', 'Huevos', 'Mantequilla', 'Crema de leche', 'Vainilla'], allergens: 'Gluten, Lácteos, Huevo' },
  { id: 2, img: imgs[1], name: 'Tarta de Fresas con Crema', desc: 'Base de galleta, relleno de crema pastelera y fresas frescas bañadas en reducción de frutos rojos.', price: '$520', ingredients: ['Galleta', 'Crema pastelera', 'Fresas frescas', 'Frutos rojos', 'Azúcar glass'], allergens: 'Gluten, Lácteos' },
  { id: 3, img: imgs[2], name: 'Chocolate Fundido Individual', desc: 'Bizcocho esponjoso con corazón de chocolate líquido que se derrite al partirlo. Acompañado de helado de vainilla.', price: '$280', ingredients: ['Chocolate amargo', 'Huevos', 'Mantequilla', 'Harina', 'Helado de vainilla'], allergens: 'Gluten, Lácteos, Huevo' },
  { id: 4, img: imgs[3], name: 'Selva Negra', desc: 'Bizcocho de chocolate, cerezas, crema batida y virutas de chocolate. Un clásico alemán con toque artesanal.', price: '$750', ingredients: ['Bizcocho de chocolate', 'Cerezas', 'Crema batida', 'Virutas de chocolate', 'Kirsch'], allergens: 'Gluten, Lácteos, Frutos secos' },
];

const testimonialsData = [
  { name: 'María Fernanda', text: 'El pastel de chocolate con fresas es el mejor que he probado. Se nota el amor con el que lo preparan. Pedí uno para el cumpleaños de mi hija y quedó espectacular.', rating: 5, avatar: '👩' },
  { name: 'Carlos Méndez', text: 'Soy repostero y realmente valoro la calidad de sus ingredientes. El selva negra es una obra de arte. Recomiendo totalmente.', rating: 5, avatar: '👨‍🍳' },
  { name: 'Ana Sofía', text: 'Pidieron por WhatsApp y llegó puntual. La presentación es hermosa y el sabor inolvidable. Ya somos clientes frecuentes.', rating: 5, avatar: '👩‍💼' },
  { name: 'Ricardo Luna', text: 'Nunca había probado un chocolate fundido tan perfecto. El centro líquido es adictivo. Repetiré mil veces.', rating: 5, avatar: '🧑‍🍳' },
];

const socialFeedData = [
  { img: imgs[0], likes: '2,847' },
  { img: imgs[1], likes: '3,921' },
  { img: imgs[2], likes: '1,654' },
  { img: imgs[3], likes: '5,238' },
];

/* ============================================================
   DOM REFS
   ============================================================ */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

const header = $('#header');
const hamburger = $('#hamburger');
const nav = $('#nav');
const themeToggle = $('#themeToggle');
const galleryGrid = $('#galleryGrid');
const galleryFilters = $('#galleryFilters');
const lightbox = $('#lightbox');
const lightboxImg = $('#lightboxImg');
const lightboxName = $('#lightboxName');
const lightboxClose = $('#lightboxClose');
const lightboxPrev = $('#lightboxPrev');
const lightboxNext = $('#lightboxNext');
const carouselTrack = $('#carouselTrack');
const carouselPrev = $('#carouselPrev');
const carouselNext = $('#carouselNext');
const carouselDots = $('#carouselDots');
const flipOverlay = $('#flipOverlay');
const flipClose = $('#flipClose');
const flipDetailInner = $('#flipDetailInner');
const flipDetailImg = $('#flipDetailImg');
const flipDetailName = $('#flipDetailName');
const flipDetailDesc = $('#flipDetailDesc');
const flipDetailPrice = $('#flipDetailPrice');
const flipDetailIngredients = $('#flipDetailIngredients');
const flipDetailAllergens = $('#flipDetailAllergens');
const flipDetailWhatsApp = $('#flipDetailWhatsApp');
const testimoniosTrack = $('#testimoniosTrack');
const socialFeed = $('#socialFeed');


/* ============================================================
   THEME TOGGLE
   ============================================================ */
let isDark = localStorage.getItem('theme') === 'dark' ||
  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

function applyTheme(dark) {
  isDark = dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggle.innerHTML = `<span class="theme-toggle__icon">${dark ? '☀️' : '🌙'}</span>`;
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

applyTheme(isDark);

themeToggle.addEventListener('click', () => applyTheme(!isDark));

/* ============================================================
   HEADER / NAV
   ============================================================ */
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 60);
  lastScroll = y;
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', open);
});

$$('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   HERO SLIDESHOW — 9 imágenes, 1s, pausa al hover
   ============================================================ */
const heroImages = [
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1600&q=80',
  'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=1600&q=80',
  'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1600&q=80',
  'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a58?w=1600&q=80',
  'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1600&q=80',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1600&q=80',
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&q=80',
  'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=1600&q=80',
];

const heroSlidesContainer = $('#heroSlides');
const heroSection = $('#hero');
let heroIdx = 0;
let heroTimer = null;

function buildHeroSlides() {
  heroImages.forEach((url, i) => {
    const div = document.createElement('div');
    div.className = `hero__slide${i === 0 ? ' active' : ''}`;
    div.style.backgroundImage = `url('${url}')`;
    heroSlidesContainer.appendChild(div);
  });
}

function nextHeroSlide() {
  const slides = $$('.hero__slide', heroSlidesContainer);
  slides.forEach(s => s.classList.remove('active'));
  heroIdx = (heroIdx + 1) % slides.length;
  slides[heroIdx].classList.add('active');
}

function startHeroTimer() {
  heroTimer = setInterval(nextHeroSlide, 5000);
}

buildHeroSlides();
startHeroTimer();

/* ============================================================
   ESPECIALIDAD SLIDESHOW — 9 imágenes, 1s, pausa al hover
   ============================================================ */
const especialidadSlides = $('#especialidadSlides');
const especialidadCard = $('.especialidad__card--visual');
let espIdx = 0;
let espTimer = null;

function buildEspecialidadSlides() {
  heroImages.forEach((url, i) => {
    const div = document.createElement('div');
    div.className = `hero__slide${i === 0 ? ' active' : ''}`;
    div.style.backgroundImage = `url('${url}')`;
    especialidadSlides.appendChild(div);
  });
}

function nextEspSlide() {
  const slides = $$('.hero__slide', especialidadSlides);
  slides.forEach(s => s.classList.remove('active'));
  espIdx = (espIdx + 1) % slides.length;
  slides[espIdx].classList.add('active');
}

function startEspTimer() {
  espTimer = setInterval(nextEspSlide, 5000);
}

function stopEspTimer() {
  clearInterval(espTimer);
  espTimer = null;
}

buildEspecialidadSlides();
startEspTimer();

especialidadCard.addEventListener('mouseenter', stopEspTimer);
especialidadCard.addEventListener('mouseleave', startEspTimer);

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function observeReveal(container) {
  $$('.reveal', container).forEach(el => revealObserver.observe(el));
}

/* ============================================================
   GALLERY
   ============================================================ */
function renderGallery(items) {
  galleryGrid.innerHTML = items.map(item => `
    <div class="gallery__item reveal" data-cat="${item.cat}" data-id="${item.id}">
      <img src="${item.img}" alt="${item.name}" loading="lazy" />
      <div class="gallery__item-overlay">
        <span class="gallery__item-name">${item.name}</span>
        <button class="gallery__item-btn" data-id="${item.id}">¡Lo quiero!</button>
      </div>
    </div>
  `).join('');

  observeReveal(galleryGrid);
  attachGalleryEvents();
}

function attachGalleryEvents() {
  $$('.gallery__item', galleryGrid).forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.gallery__item-btn')) return;
      const id = parseInt(item.dataset.id);
      const data = galleryData.find(d => d.id === id);
      if (data) openLightbox(data);
    });
  });

  $$('.gallery__item-btn', galleryGrid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const data = galleryData.find(d => d.id === id);
      if (data) {
        const menuItem = menuData.find(m => m.name.toLowerCase().includes(data.name.toLowerCase().split(' ')[0]));
        if (menuItem) openFlip(menuItem);
        else openLightbox(data);
      }
    });
  });
}

// Filters
galleryFilters.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  $$('.filter-btn', galleryFilters).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filter = btn.dataset.filter;
  $$('.gallery__item', galleryGrid).forEach(item => {
    if (filter === 'all' || item.dataset.cat === filter) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
});

renderGallery(galleryData);

/* ============================================================
   TORTAS CARRUSEL (Infinite Scroll + Controles + Lightbox)
   ============================================================ */
const tortasImgs = [
  'tortas/torta (1).webp',
  'tortas/torta (2).webp',
  'tortas/torta (3).webp',
  'tortas/torta (4).webp',
  'tortas/torta (5).webp',
];

const tortasTrack = $('#tortasCarouselTrack');
const tortasPrev = $('#tortasPrev');
const tortasNext = $('#tortasNext');
const tortasLightbox = $('#tortasLightbox');
const tortasLightboxImg = $('#tortasLightboxImg');
const tortasLightboxClose = $('#tortasLightboxClose');

let tortasScrollX = 0;
let tortasSpeed = 1.2;
let tortasPaused = false;
let tortasRAF = null;

function buildTortasCarousel() {
  const items = [...tortasImgs, ...tortasImgs].map((src, i) => `
    <div class="tortas-carousel__item" data-idx="${i}">
      <img src="${src}" alt="Torta" loading="lazy" draggable="false" />
    </div>
  `).join('');
  tortasTrack.innerHTML = items;

  $$('.tortas-carousel__item', tortasTrack).forEach(el => {
    el.addEventListener('click', (e) => {
      if (tortasDragged) return;
      const src = el.querySelector('img').src;
      tortasLightboxImg.src = src;
      tortasLightbox.classList.add('open');
      tortasLightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
}

function animateTortas() {
  if (!tortasPaused) {
    tortasScrollX += tortasSpeed;
    const half = tortasTrack.scrollWidth / 2;
    if (tortasScrollX >= half) tortasScrollX = 0;
    tortasTrack.style.transform = `translateX(-${tortasScrollX}px)`;
  }
  tortasRAF = requestAnimationFrame(animateTortas);
}

tortasPrev.addEventListener('click', () => {
  tortasPaused = true;
  tortasScrollX = Math.max(0, tortasScrollX - 180);
  tortasTrack.style.transform = `translateX(-${tortasScrollX}px)`;
  setTimeout(() => { tortasPaused = false; }, 800);
});

tortasNext.addEventListener('click', () => {
  tortasPaused = true;
  tortasScrollX += 180;
  const half = tortasTrack.scrollWidth / 2;
  if (tortasScrollX >= half) tortasScrollX = 0;
  tortasTrack.style.transform = `translateX(-${tortasScrollX}px)`;
  setTimeout(() => { tortasPaused = false; }, 800);
});

// Drag support
let tortasDragging = false;
let tortasDragged = false;
let tortasStartX = 0;
let tortasStartScroll = 0;

function tortasDragStart(clientX) {
  tortasDragging = true;
  tortasDragged = false;
  tortasPaused = true;
  tortasStartX = clientX;
  tortasStartScroll = tortasScrollX;
}

function tortasDragMove(clientX) {
  if (!tortasDragging) return;
  const dx = tortasStartX - clientX;
  if (Math.abs(dx) > 5) tortasDragged = true;
  tortasScrollX = Math.max(0, tortasStartScroll + dx);
  const half = tortasTrack.scrollWidth / 2;
  if (tortasScrollX >= half) tortasScrollX = 0;
  if (tortasScrollX < 0) tortasScrollX = 0;
  tortasTrack.style.transform = `translateX(-${tortasScrollX}px)`;
}

function tortasDragEnd() {
  tortasDragging = false;
  setTimeout(() => { tortasPaused = false; }, 400);
}

// Mouse events
tortasTrack.addEventListener('mousedown', (e) => tortasDragStart(e.clientX));
document.addEventListener('mousemove', (e) => tortasDragMove(e.clientX));
document.addEventListener('mouseup', tortasDragEnd);

// Touch events
tortasTrack.addEventListener('touchstart', (e) => tortasDragStart(e.touches[0].clientX), { passive: true });
document.addEventListener('touchmove', (e) => tortasDragMove(e.touches[0].clientX), { passive: true });
document.addEventListener('touchend', tortasDragEnd);

// Prevent native drag on images
tortasTrack.addEventListener('dragstart', (e) => e.preventDefault());

// Hover pause (only when not dragging)
tortasTrack.addEventListener('mouseenter', () => { if (!tortasDragging) tortasPaused = true; });
tortasTrack.addEventListener('mouseleave', () => { if (!tortasDragging) tortasPaused = false; });

tortasLightboxClose.addEventListener('click', () => {
  tortasLightbox.classList.remove('open');
  tortasLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
});

tortasLightbox.addEventListener('click', (e) => {
  if (e.target === tortasLightbox) {
    tortasLightbox.classList.remove('open');
    tortasLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});

buildTortasCarousel();
animateTortas();

/* ============================================================
   LIGHTBOX
   ============================================================ */
let lightboxItems = [];
let lightboxIdx = 0;

function openLightbox(data) {
  lightboxItems = galleryData.filter(d => d.cat === data.cat);
  if (lightboxItems.length === 0) lightboxItems = [data];
  lightboxIdx = lightboxItems.findIndex(d => d.id === data.id);
  if (lightboxIdx === -1) lightboxIdx = 0;

  showLightboxItem();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function showLightboxItem() {
  const item = lightboxItems[lightboxIdx];
  lightboxImg.src = item.img.replace('w=600', 'w=1200');
  lightboxImg.alt = item.name;
  lightboxName.textContent = item.name;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

lightboxPrev.addEventListener('click', () => {
  lightboxIdx = (lightboxIdx - 1 + lightboxItems.length) % lightboxItems.length;
  showLightboxItem();
});

lightboxNext.addEventListener('click', () => {
  lightboxIdx = (lightboxIdx + 1) % lightboxItems.length;
  showLightboxItem();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});

/* ============================================================
   CAROUSEL
   ============================================================ */
let carouselPos = 0;
let visibleCards = 3;

function calcVisibleCards() {
  const w = window.innerWidth;
  if (w < 768) visibleCards = 1;
  else if (w < 1024) visibleCards = 2;
  else visibleCards = 3;
}

calcVisibleCards();

function renderCarousel() {
  carouselTrack.innerHTML = menuData.map((item, i) => `
    <div class="carousel__card reveal" data-idx="${i}">
      <img src="${item.img}" alt="${item.name}" class="carousel__card-img" loading="lazy" />
      <div class="carousel__card-body">
        <h3 class="carousel__card-title">${item.name}</h3>
        <p class="carousel__card-desc">${item.desc}</p>
        <div class="carousel__card-footer">
          <span class="carousel__card-price">${item.price}</span>
          <button class="carousel__card-btn" data-id="${item.id}">Ver detalles</button>
        </div>
      </div>
    </div>
  `).join('');

  observeReveal(carouselTrack);

  $$('.carousel__card-btn', carouselTrack).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const data = menuData.find(d => d.id === id);
      if (data) openFlip(data);
    });
  });
}

function updateCarousel() {
  const total = menuData.length;
  const maxPos = Math.max(0, total - visibleCards);
  carouselPos = Math.min(carouselPos, maxPos);
  const gap = 24;
  const cardWidth = `calc(${100 / visibleCards}% - ${gap * (visibleCards - 1) / visibleCards}px)`;

  $$('.carousel__card', carouselTrack).forEach(card => {
    card.style.flex = `0 0 ${cardWidth}`;
    card.style.minWidth = visibleCards === 1 ? '0' : '280px';
  });

  let offset = 0;
  for (let i = 0; i < carouselPos; i++) {
    const card = $$('.carousel__card', carouselTrack)[i];
    if (card) offset += card.offsetWidth + gap;
  }
  carouselTrack.style.transform = `translateX(-${offset}px)`;
  renderDots();
}

function renderDots() {
  const total = menuData.length;
  const pages = Math.max(1, Math.ceil(total / visibleCards));
  const active = Math.min(Math.floor(carouselPos), pages - 1);

  carouselDots.innerHTML = Array.from({ length: pages }, (_, i) =>
    `<button class="carousel__dot ${i === active ? 'active' : ''}" data-page="${i}"></button>`
  ).join('');

  $$('.carousel__dot', carouselDots).forEach(dot => {
    dot.addEventListener('click', () => {
      carouselPos = parseInt(dot.dataset.page) * visibleCards;
      updateCarousel();
    });
  });
}

carouselPrev.addEventListener('click', () => {
  if (carouselPos > 0) carouselPos--;
  updateCarousel();
});

carouselNext.addEventListener('click', () => {
  const total = menuData.length;
  const maxPos = Math.max(0, total - visibleCards);
  if (carouselPos < maxPos) carouselPos++;
  updateCarousel();
});

renderCarousel();
updateCarousel();

window.addEventListener('resize', () => {
  calcVisibleCards();
  updateCarousel();
});

/* ============================================================
   FLIP CARD (Detail)
   ============================================================ */
function openFlip(data) {
  flipDetailImg.src = data.img;
  flipDetailName.textContent = data.name;
  flipDetailDesc.textContent = data.desc;
  flipDetailPrice.textContent = data.price;
  flipDetailIngredients.innerHTML = data.ingredients.map(i => `<li>${i}</li>`).join('');
  flipDetailAllergens.textContent = data.allergens;
  flipDetailWhatsApp.href = `https://wa.me/544243646260?text=${encodeURIComponent(`Hola, quiero pedir: ${data.name} (${data.price})`)}`;
  flipOverlay.classList.remove('flipped');
  flipOverlay.classList.add('open');
  flipOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeFlip() {
  flipOverlay.classList.remove('open', 'flipped');
  flipOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

flipClose.addEventListener('click', closeFlip);
flipOverlay.addEventListener('click', (e) => { if (e.target === flipOverlay) closeFlip(); });

// Toggle flip on the detail card when clicking "Ver detalles" inside the overlay
// Clicking the front side triggers flip
flipDetailInner.addEventListener('click', (e) => {
  if (e.target.closest('.flip-card-detail__close')) return;
  if (e.target.closest('.flip-card-detail__back')) return;
  if (e.target.closest('.btn')) return;
  flipOverlay.classList.toggle('flipped');
});

document.addEventListener('keydown', (e) => {
  if (!flipOverlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeFlip();
});

/* ============================================================
   TESTIMONIOS SLIDER
   ============================================================ */
function renderTestimonials() {
  testimoniosTrack.innerHTML = testimonialsData.map(t => {
    const stars = '⭐'.repeat(t.rating);
    return `
      <div class="testimonio-card">
        <div class="testimonio-card__inner">
          <div class="testimonio-card__avatar">${t.avatar}</div>
          <div class="testimonio-card__stars">${stars}</div>
          <p class="testimonio-card__text">"${t.text}"</p>
          <span class="testimonio-card__name">— ${t.name}</span>
        </div>
      </div>
    `;
  }).join('');
}

let testimonioIdx = 0;
let testimonioInterval;

function showTestimonio() {
  const cards = $$('.testimonio-card', testimoniosTrack);
  const w = cards[0]?.offsetWidth || 0;
  testimoniosTrack.style.transform = `translateX(-${testimonioIdx * w}px)`;
}

function nextTestimonio() {
  testimonioIdx = (testimonioIdx + 1) % testimonialsData.length;
  showTestimonio();
}

function startTestimoniosAuto() {
  stopTestimoniosAuto();
  testimonioInterval = setInterval(nextTestimonio, 4000);
}

function stopTestimoniosAuto() {
  clearInterval(testimonioInterval);
}

renderTestimonials();

// Touch support for slider
let touchStartX = 0;
let touchEndX = 0;

testimoniosTrack.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  stopTestimoniosAuto();
}, { passive: true });

testimoniosTrack.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  startTestimoniosAuto();
}, { passive: true });

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextTestimonio();
    else {
      testimonioIdx = (testimonioIdx - 1 + testimonialsData.length) % testimonialsData.length;
      showTestimonio();
    }
  }
}

startTestimoniosAuto();

/* ============================================================
   SOCIAL FEED
   ============================================================ */
function renderSocialFeed() {
  socialFeed.innerHTML = socialFeedData.map(item => `
    <div class="social-feed__item reveal">
      <img src="${item.img}" alt="Publicación de Instagram" loading="lazy" />
      <div class="social-feed__item-overlay">
        <span>❤️ ${item.likes}</span>
      </div>
    </div>
  `).join('');
  observeReveal(socialFeed);
}

renderSocialFeed();

/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ============================================================
   WHATSAPP CONTACT FORM
   ============================================================ */
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const product = document.getElementById('contactProduct').value;
    const message = document.getElementById('contactMessage').value.trim();
    let text = `Hola! Soy ${name || '...'}.`;
    if (product) text += ` Me interesa: ${product}.`;
    if (message) text += ` ${message}`;
    window.open(`https://wa.me/544243646260?text=${encodeURIComponent(text)}`, '_blank');
  });
}

/* ============================================================
   INITIALIZE REVEAL FOR STATIC ELEMENTS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  $$('.reveal').forEach(el => revealObserver.observe(el));
});
