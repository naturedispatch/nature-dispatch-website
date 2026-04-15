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

  // --- Form validation + Formspree submission ---
  var forms = document.querySelectorAll('form');
  for (var f = 0; f < forms.length; f++) {
    forms[f].addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic HTML5 validation
      if (!this.checkValidity()) {
        this.reportValidity();
        return;
      }

      var form = this;
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // If form has a Formspree action, submit via fetch
      var action = form.getAttribute('action');
      if (action && action.indexOf('formspree.io') !== -1) {
        fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(function (response) {
          if (response.ok) {
            btn.textContent = 'Submitted! We\'ll be in touch.';
            btn.style.background = '#2E7D32';
            btn.style.color = '#fff';
            form.reset();
          } else {
            btn.textContent = 'Error — please try again';
            btn.style.background = '#C62828';
            btn.style.color = '#fff';
          }
          setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
          }, 4000);
        }).catch(function () {
          btn.textContent = 'Error — please try again';
          btn.style.background = '#C62828';
          btn.style.color = '#fff';
          setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
          }, 4000);
        });
      } else {
        // Fallback for forms without Formspree
        btn.textContent = 'Submitted! We\'ll be in touch.';
        btn.style.background = '#2E7D32';
        btn.style.color = '#fff';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
          form.reset();
        }, 4000);
      }
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
