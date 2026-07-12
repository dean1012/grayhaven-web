/**
 * Grayhaven Systems LLC — progressive navigation enhancements
 *
 * Native HTML and CSS provide navigation and scrolling when JavaScript is
 * unavailable. This layer only closes the mobile menu after navigation and
 * highlights the section currently in view when supported.
 */

(function () {
  'use strict';

  const menuToggle = document.getElementById('navbarMenuToggle');
  const menuToggleLabel = document.querySelector('label[for="navbarMenuToggle"]');
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
  const sections = document.querySelectorAll('section[id]');

  const setActiveNav = function (id) {
    const activeId = id === 'hero' ? 'top' : id;

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + activeId;

      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  setActiveNav('top');

  if (menuToggle && menuToggleLabel) {
    menuToggleLabel.addEventListener('click', function (event) {
      event.preventDefault();
      menuToggle.checked = !menuToggle.checked;
      menuToggleLabel.setAttribute('aria-expanded', String(menuToggle.checked));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menuToggle) {
        menuToggle.checked = false;
      }

      if (menuToggleLabel) {
        menuToggleLabel.setAttribute('aria-expanded', 'false');
      }

      const href = link.getAttribute('href');
      const targetId = href === './' ? 'top' : href.startsWith('#') ? href.slice(1) : '';
      if (targetId) {
        setActiveNav(targetId);
      }
    });
  });

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, {
      rootMargin: '-60px 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }
})();
