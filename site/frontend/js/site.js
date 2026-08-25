/**
 * Grayhaven Systems LLC — progressive navigation enhancements
 *
 * Native HTML and CSS provide navigation and scrolling when JavaScript is
 * unavailable. This layer only closes the mobile menu after navigation and
 * highlights the section currently in view when supported.
 */

(function () {
  'use strict';

  const mobileMenu = document.getElementById('navbarMobileMenu');
  const navLinks = document.querySelectorAll('.navbar-links a');
  const sections = document.querySelectorAll('section[id]');

  const setActiveNav = function (id) {
    const activeId = id === 'hero' ? 'top' : id;

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      const isActive = activeId === 'top'
        ? href === './'
        : href === '#' + activeId;

      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  setActiveNav('top');

  const setHomeAtTop = function () {
    if (window.scrollY <= 4) {
      setActiveNav('top');
    }
  };

  window.addEventListener('scroll', setHomeAtTop, { passive: true });
  setHomeAtTop();

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) {
        mobileMenu.removeAttribute('open');
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
      if (window.scrollY <= 4) {
        setActiveNav('top');
        return;
      }

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
