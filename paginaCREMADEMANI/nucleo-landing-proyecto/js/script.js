/* =====================================================================
   MANÍ ARTESANAL — SCRIPT PRINCIPAL
   Módulos independientes, sin dependencias externas.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initFAQ();
  initBackToTop();
  initWhatsApp();
  initVideoAutoplay();
  initSmoothAnchors();
});

/* ---------------------------------------------------------------------
   1. NAVBAR STICKY — cambia de estilo al hacer scroll
   ------------------------------------------------------------------- */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------------------------------------------------------------------
   2. MENÚ MÓVIL — abre/cierra el drawer de navegación
   ------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ---------------------------------------------------------------------
   3. SCROLL REVEAL — anima secciones al entrar en viewport
   ------------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-stagger, .tl-step');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(t => t.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(t => observer.observe(t));
}

/* ---------------------------------------------------------------------
   4. FAQ ACCORDION — abre una pregunta a la vez, con animación de altura
   ------------------------------------------------------------------- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Cierra las demás preguntas abiertas (una a la vez)
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherAnswer = other.querySelector('.faq-a');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });
}

/* ---------------------------------------------------------------------
   5. BOTÓN VOLVER ARRIBA — aparece tras cierto scroll
   ------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.fab-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 800);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------------------
   6. WHATSAPP — arma el link con mensaje pre-cargado según el contexto
   ------------------------------------------------------------------- */
function initWhatsApp() {
  // Reemplazar por el número real del negocio (formato internacional, sin '+')
  const PHONE = '51999999999';
  const DEFAULT_MSG = 'Hola, quiero saber más sobre las cremas de maní artesanales 🥜';

  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const customMsg = el.getAttribute('data-whatsapp') || DEFAULT_MSG;
    el.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(customMsg)}`;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
}

/* ---------------------------------------------------------------------
   7. VIDEOS AUTOPLAY SIN SONIDO — solo reproduce el que está en pantalla
   (ahorra datos y batería del usuario en móviles)
   ------------------------------------------------------------------- */
function initVideoAutoplay() {
  const videos = document.querySelectorAll('.v-card video');
  if (!videos.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.6 });

  videos.forEach(v => observer.observe(v));
}

/* ---------------------------------------------------------------------
   8. ANCLAS SUAVES — compensa el navbar fijo al saltar a una sección
   ------------------------------------------------------------------- */
function initSmoothAnchors() {
  const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
