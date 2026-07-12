/**
 * Grayhaven Systems LLC — Site JavaScript
 * Handles: mobile nav toggle and active nav state
 * Vanilla JS — no dependencies
 */

(function () {
  'use strict';

  const desktopNavQuery = window.matchMedia('(min-width: 1721px)');

  /* ===== MOBILE NAV TOGGLE ===== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (!desktopNavQuery.matches) {
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    window.addEventListener('resize', function () {
      if (desktopNavQuery.matches) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===== HOME LINK — SCROLL TO TOP ===== */
  document.querySelectorAll('a[href="#top"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  });

  /* ===== ACTIVE NAV HIGHLIGHT ===== */
  const navLinks = document.querySelectorAll('.navbar-links a');
  const sections = document.querySelectorAll('section[id], header[id]');

  if (navLinks.length > 0 && sections.length > 0) {
    const setActiveNav = function (id) {
      navLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        const isActive = href === '#' + id;

        link.classList.toggle('is-active', isActive);

        if (isActive) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const updateActiveNavFallback = function () {
      const scrollPosition = window.scrollY + 80;
      let activeId = sections[0].getAttribute('id');

      sections.forEach(function (section) {
        if (section.offsetTop <= scrollPosition) {
          activeId = section.getAttribute('id');
        }
      });

      setActiveNav(activeId);
    };

    if (!('IntersectionObserver' in window)) {
      window.addEventListener('scroll', updateActiveNavFallback, { passive: true });
      window.addEventListener('resize', updateActiveNavFallback);
      updateActiveNavFallback();
      return;
    }

    const observerOptions = {
      rootMargin: '-60px 0px -70% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          setActiveNav(id);
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

})();
