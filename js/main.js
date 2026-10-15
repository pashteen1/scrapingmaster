// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// Services filter
function initServicesFilter() {
  const grid = document.getElementById('servicesGrid');
  const search = document.getElementById('serviceSearch');
  if (!grid || !window.SERVICES) return;

  function render(list) {
    if (!list.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:3rem 0;">No services match your search.</p>';
      return;
    }
    grid.innerHTML = list.map(s => `
      <div class="card service-card">
        <img class="card-img" src="images/${s.img}" alt="${s.name}" loading="lazy" onerror="this.style.background='#1a1a1a'">
        <div class="card-body">
          <h3 class="card-title">${s.name}</h3>
          <p class="card-desc">${s.desc}</p>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <a href="https://wa.me/923247334145?text=Hi%20Irfan%2C%20I%20need%20${encodeURIComponent(s.name)}" target="_blank" class="btn btn-wa" style="padding:0.5rem 0.9rem;font-size:0.85rem;">WhatsApp</a>
            <a href="contact.html?service=${s.slug}" class="btn btn-outline" style="padding:0.5rem 0.9rem;font-size:0.85rem;">Get Quote</a>
          </div>
        </div>
      </div>
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

document.addEventListener('DOMContentLoaded', initServicesFilter);

// Contact form demo
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      form.reset();
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2500);
    }, 1000);
  });
}
