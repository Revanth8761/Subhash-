/**
 * Portfolio JavaScript
 * Engineer: Anagani Subhash Chandrabose
 * Pure Vanilla JavaScript (No Frameworks, No Libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark / Light) with Local Storage & System Preference
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const sunIcon = themeToggleBtn.querySelector('.icon-sun');
    const moonIcon = themeToggleBtn.querySelector('.icon-moon');
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    }
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const siteNav = document.getElementById('site-nav');

  if (mobileMenuBtn && siteNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a link inside nav is clicked
    siteNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!siteNav.contains(e.target) && !mobileMenuBtn.contains(e.target) && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Scrollspy: Active Navigation Links on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 4. Resume Modal Viewer
  const openResumeBtns = document.querySelectorAll('.js-open-resume');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeBtn = document.getElementById('close-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  openResumeBtns.forEach(btn => btn.addEventListener('click', openResume));
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeResume();
    }
  });
});
