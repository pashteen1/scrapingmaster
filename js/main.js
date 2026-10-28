const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

function initServices() {
  const grid = document.getElementById('servicesGrid');
  const search = document.getElementById('serviceSearch');
  if (!grid || typeof window.SERVICES === 'undefined') return;

  function render(list) {
    if (!list.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:2.5rem 0;">No services match your search.</p>';
      return;
    }
    grid.innerHTML = list.map(s => `
      <a href="services/${s.slug}.html" class="card service-card" style="display:block;">
        <img class="card-img" src="images/${s.img}" alt="${s.name}" loading="lazy" onerror="this.style.background='#1a1a1a'">
        <div class="card-body">
          <h3 class="card-title">${s.name}</h3>
          <p class="card-desc">${s.desc}</p>
          <span class="card-link">View details →</span>
        </div>
      </a>
    `).join('');
  }

  render(window.SERVICES);

  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase().trim();
      const filtered = window.SERVICES.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        (s.keywords || '').toLowerCase().includes(q)
      );
      render(filtered);
    });
  }
}

document.addEventListener('DOMContentLoaded', initServices);

const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      form.reset();
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2200);
    }, 900);
  });
}
