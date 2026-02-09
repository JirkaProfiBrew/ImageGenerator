// Simple navigation for wireframe prototype
document.addEventListener('DOMContentLoaded', function() {
  // Highlight active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');

  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Make upload zones interactive
  const uploadZones = document.querySelectorAll('.upload-zone');
  uploadZones.forEach(function(zone) {
    zone.addEventListener('click', function() {
      zone.innerHTML = '<div class="icon">&#10003;</div><div class="title">File uploaded!</div><div class="subtitle">product-photo.jpg (2.4 MB)</div>';
      zone.style.borderColor = 'var(--success)';
      zone.style.background = 'var(--success-light)';
    });
  });

  // Make buttons show click feedback
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(function(btn) {
    if (btn.hasAttribute('data-navigate')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = btn.getAttribute('data-navigate');
      });
    }
  });

  // Toggle checkbox styling
  const checkboxes = document.querySelectorAll('.checkbox-custom');
  checkboxes.forEach(function(cb) {
    cb.addEventListener('click', function() {
      cb.classList.toggle('checked');
    });
  });
});
