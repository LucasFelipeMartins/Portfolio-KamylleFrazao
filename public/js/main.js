document.documentElement.classList.add('js-ready');

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 10);
}, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('is-open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    menuButton.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}));

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const testimonials = [...document.querySelectorAll('.testimonial')];
let activeTestimonial = 0;
function changeTestimonial(direction) {
  if (!testimonials.length) return;
  testimonials[activeTestimonial].classList.remove('is-visible');
  activeTestimonial = (activeTestimonial + direction + testimonials.length) % testimonials.length;
  testimonials[activeTestimonial].classList.add('is-visible');
}
document.querySelector('[data-slide="prev"]')?.addEventListener('click', () => changeTestimonial(-1));
document.querySelector('[data-slide="next"]')?.addEventListener('click', () => changeTestimonial(1));

document.querySelector('[data-contact-form]')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const button = form.querySelector('button[type="submit"]');
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = 'Enviando...';

  try {
    const data = Object.fromEntries(new FormData(form).entries());

    const response = await fetch('/api/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      form.reset();
      showToast(result.message || 'Mensagem enviada! Em breve entraremos em contato.');
    } else {
      const error = Array.isArray(result.error) ? result.error.join(' ') : (result.error || 'Não foi possível enviar a mensagem. Tente novamente.');
      showToast(error);
    }
  } catch {
    showToast('Não foi possível enviar a mensagem. Verifique sua conexão e tente novamente.');
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
});

document.querySelector('.newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input');
  if (!input.checkValidity()) { input.reportValidity(); return; }
  input.value = '';
  showToast('Você foi inscrito em nossa lista de inspirações.');
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const startedAt = performance.now();
    const duration = 900;
    function update(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    counterObserver.unobserve(element);
  });
}, { threshold: .7 });
counters.forEach((counter) => counterObserver.observe(counter));
