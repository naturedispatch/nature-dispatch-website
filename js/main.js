/* ============================================
   NATURE DISPATCH — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Navbar scroll effect (homepage only) ---
  const navbar = document.getElementById('navbar');

  if (navbar && !navbar.classList.contains('scrolled')) {
    function handleNavScroll() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      // Toggle aria-expanded
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  // --- Basic form validation + submission feedback ---
  var forms = document.querySelectorAll('form');
  for (var f = 0; f < forms.length; f++) {
    forms[f].addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic HTML5 validation
      if (!this.checkValidity()) {
        this.reportValidity();
        return;
      }

      // Show success message
      var btn = this.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Submitted! We\'ll be in touch.';
      btn.style.background = '#2E7D32';
      btn.style.color = '#fff';
      btn.disabled = true;

      // Reset after 4 seconds
      var formRef = this;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        formRef.reset();
      }, 4000);
    });
  }

  // --- Smooth scroll for anchor links ---
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var a = 0; a < anchors.length; a++) {
    anchors[a].addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // --- Simple fade-in animation on scroll ---
  var cards = document.querySelectorAll('.card, .lane-card, .testimonial, .cta-banner');
  
  if ('IntersectionObserver' in window) {
    // Add initial hidden state
    for (var c = 0; c < cards.length; c++) {
      cards[c].style.opacity = '0';
      cards[c].style.transform = 'translateY(20px)';
      cards[c].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.style.opacity = '1';
          entries[i].target.style.transform = 'translateY(0)';
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    for (var c = 0; c < cards.length; c++) {
      observer.observe(cards[c]);
    }
  }

});
