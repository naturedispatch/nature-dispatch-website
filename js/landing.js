/* ============================================
   NATURE DISPATCH — Landing Page JavaScript
   GSAP + AOS + Custom Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  const loaderFill = document.querySelector('.loader__bar-fill');
  let progress = 0;
  const loaderInterval = setInterval(function () {
    progress += Math.random() * 25 + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      setTimeout(function () {
        loader.classList.add('hidden');
        startHeroAnimation();
      }, 300);
    }
    loaderFill.style.width = progress + '%';
  }, 200);

  /* ---------- NAVBAR ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* --- Mobile nav toggle --- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- HERO BACKGROUND SLIDESHOW ---------- */
  const heroImages = document.querySelectorAll('.hero__bg-img');
  let currentHeroImg = 0;
  if (heroImages.length > 1) {
    heroImages[0].classList.add('active');
    setInterval(function () {
      heroImages[currentHeroImg].classList.remove('active');
      currentHeroImg = (currentHeroImg + 1) % heroImages.length;
      heroImages[currentHeroImg].classList.add('active');
    }, 5000);
  } else if (heroImages.length === 1) {
    heroImages[0].classList.add('active');
  }

  /* ---------- GSAP HERO ANIMATION ---------- */
  function startHeroAnimation() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero__badge', { y: 30, opacity: 0, duration: 0.8 })
      .from('.hero__title', { y: 50, opacity: 0, duration: 1 }, '-=0.4')
      .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero__actions .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4')
      .from('.hero__stats', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
      .from('.hero__scroll', { opacity: 0, duration: 1 }, '-=0.2');
  }

  /* ---------- GSAP SCROLL TRIGGERS ---------- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    /* Stagger service cards */
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services__grid',
        start: 'top 80%',
        once: true
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

    /* About images */
    gsap.from('.about__img-main', {
      scrollTrigger: { trigger: '.about', start: 'top 75%', once: true },
      x: -60, opacity: 0, duration: 1, ease: 'power3.out'
    });
    gsap.from('.about__img-float', {
      scrollTrigger: { trigger: '.about', start: 'top 70%', once: true },
      x: 60, y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out'
    });
    gsap.from('.about__stat-badge', {
      scrollTrigger: { trigger: '.about', start: 'top 70%', once: true },
      scale: 0, opacity: 0, duration: 0.6, delay: 0.6, ease: 'back.out(1.7)'
    });

    /* Stats counter animation */
    document.querySelectorAll('.stats__number').forEach(function (el) {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = prefix + Math.round(this.targets()[0].val) + suffix;
            }
          });
        }
      });
    });

    /* Lanes list items */
    gsap.from('.lanes__list-item', {
      scrollTrigger: { trigger: '.lanes__list', start: 'top 80%', once: true },
      x: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
    });

    /* CTA form */
    gsap.from('.cta__form', {
      scrollTrigger: { trigger: '.cta', start: 'top 70%', once: true },
      y: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });
  }

  /* ---------- AOS INIT ---------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      offset: 80,
      once: true,
      easing: 'ease-out-cubic'
    });
  }

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- FORM HANDLING ---------- */
  var forms = document.querySelectorAll('form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!this.checkValidity()) { this.reportValidity(); return; }

      var btn = form.querySelector('.form-submit');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var action = form.getAttribute('action');
      if (action && action.indexOf('formspree.io') !== -1) {
        fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(function (r) {
          if (r.ok) {
            btn.textContent = '✓ Sent! We\'ll be in touch.';
            btn.style.background = '#2E7D32';
            form.reset();
          } else {
            btn.textContent = 'Error — please try again';
            btn.style.background = '#C62828';
          }
          setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        }).catch(function () {
          btn.textContent = 'Error — please try again';
          btn.style.background = '#C62828';
          setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        });
      } else {
        btn.textContent = '✓ Sent! We\'ll be in touch.';
        btn.style.background = '#2E7D32';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 4000);
      }
    });
  });

  /* ---------- MARQUEE DUPLICATION ---------- */
  var track = document.querySelector('.marquee__track');
  if (track) {
    var items = track.innerHTML;
    track.innerHTML = items + items;
  }

});
