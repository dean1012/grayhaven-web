/**
 * Progressive navigation enhancement for website and application shells.
 * Native anchors and consumer-provided :target fallbacks remain usable
 * without JavaScript.
 */
(function () {
  'use strict';

  document.documentElement.classList.add('js-enabled');

  const body = document.body;
  const links = Array.from(
    document.querySelectorAll('[data-section-nav] a')
  ).filter(function (link) {
    const href = link.getAttribute('href') || '';
    return Boolean(link.dataset.sectionId) || href.startsWith('#');
  });
  const sectionId = function (link) {
    const href = link.getAttribute('href') || '';
    return link.dataset.sectionId || (href.startsWith('#') ? href.slice(1) : '');
  };
  const sections = Array.from(document.querySelectorAll('main [id]')).filter(
    function (section) {
      return links.some(function (link) {
        return sectionId(link) === section.id;
      });
    }
  );
  const defaultSection = body.dataset.sectionDefault || 'top';
  const configuredRoot = body.dataset.sectionScrollRoot;
  const scrollRoot = configuredRoot
    ? document.querySelector(configuredRoot)
    : null;
  const usesWindow = !scrollRoot;

  if (!usesWindow && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const setActive = function (id) {
    links.forEach(function (link) {
      const active = sectionId(link) === id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const scrollTop = function () {
    return usesWindow ? window.scrollY : scrollRoot.scrollTop;
  };
  const viewportHeight = function () {
    return usesWindow ? window.innerHeight : scrollRoot.clientHeight;
  };
  const scrollHeight = function () {
    return usesWindow
      ? Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      : scrollRoot.scrollHeight;
  };
  const topWithinRoot = function (section) {
    const rootTop = usesWindow ? 0 : scrollRoot.getBoundingClientRect().top;
    return scrollTop() + section.getBoundingClientRect().top - rootTop;
  };
  const updateActive = function () {
    if (!links.length) return;
    if (scrollTop() <= 4) {
      setActive(defaultSection);
      return;
    }

    const remaining = scrollHeight() - scrollTop() - viewportHeight();
    if (
      sections.length &&
      remaining <= Math.max(64, viewportHeight() * 0.06)
    ) {
      setActive(sections[sections.length - 1].id);
      return;
    }

    const activationPoint = scrollTop() + Math.min(320, viewportHeight() * 0.24);
    let active = defaultSection;
    sections.forEach(function (section) {
      if (topWithinRoot(section) <= activationPoint) active = section.id;
    });
    setActive(active);
  };
  const scrollNestedRoot = function (target) {
    if (usesWindow || !target || !scrollRoot.contains(target)) return;
    const targetTop = target.getBoundingClientRect().top;
    const rootTop = scrollRoot.getBoundingClientRect().top;
    scrollRoot.scrollTo({
      top: Math.max(0, scrollRoot.scrollTop + targetTop - rootTop),
      behavior: 'auto'
    });
  };
  const syncLocation = function () {
    const id = window.location.hash.slice(1) || defaultSection;
    const target = document.getElementById(id);
    if (!usesWindow) {
      if (target && scrollRoot.contains(target)) {
        scrollNestedRoot(target);
      } else {
        scrollRoot.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
    setActive(target ? id : defaultSection);
    window.requestAnimationFrame(updateActive);
  };

  if (links.length) {
    setActive(defaultSection);
    (usesWindow ? window : scrollRoot).addEventListener(
      'scroll',
      updateActive,
      { passive: true }
    );
    window.addEventListener('resize', updateActive);
    window.addEventListener('popstate', syncLocation);
    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        const id = sectionId(link);
        const target = document.getElementById(id);
        if (!usesWindow && target && scrollRoot.contains(target)) {
          event.preventDefault();
          scrollNestedRoot(target);
          if (window.location.hash !== '#' + id) {
            window.history.pushState(null, '', '#' + id);
          }
        }
        setActive(id);
        const mobileMenu = link.closest('details[data-mobile-nav]');
        if (mobileMenu) mobileMenu.removeAttribute('open');
      });
    });
    syncLocation();
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('details[data-mobile-nav][open]').forEach(
      function (menu) {
        menu.removeAttribute('open');
      }
    );
  });
})();
