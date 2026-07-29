const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

const loginForm = document.querySelector('[data-login-form]');
loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!loginForm.checkValidity()) {
    loginForm.reportValidity();
    return;
  }
  const submit = loginForm.querySelector('button[type="submit"]');
  submit.textContent = 'Entrando...';
  submit.disabled = true;

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.redirectUrl) {
      window.location.href = result.redirectUrl;
    } else if (result.error) {
      showToast(result.error);
      submit.textContent = 'Entrar no painel';
      submit.disabled = false;
    }
  } catch (error) {
    showToast('Ocorreu um erro, tente novamente');
    submit.textContent = 'Entrar no painel';
    submit.disabled = false;
  }
});

document.querySelector('.password-toggle')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  const input = button.parentElement.querySelector('input');
  const visible = input.type === 'text';
  input.type = visible ? 'password' : 'text';
  button.textContent = visible ? '◉' : '◌';
  button.setAttribute('aria-label', visible ? 'Exibir senha' : 'Ocultar senha');
});

const sidebar = document.querySelector('.admin-sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebarClose = document.querySelector('.sidebar-close');
function toggleSidebar(open) {
  sidebar?.classList.toggle('is-open', open);
}
sidebarToggle?.addEventListener('click', () => toggleSidebar(true));
sidebarClose?.addEventListener('click', () => toggleSidebar(false));

const navItems = document.querySelectorAll('[data-panel]');
const panels = document.querySelectorAll('[data-panel-content]');
const breadcrumb = document.querySelector('[data-breadcrumb]');
const panelTitles = {
  dashboard: 'Visão geral', projects: 'Projetos', about: 'Sobre mim', services: 'Serviços',
  testimonials: 'Depoimentos', settings: 'Configurações', 'project-editor': 'Novo projeto'
};

function openPanel(name) {
  if (!name) return;
  panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.panelContent === name));
  navItems.forEach((item) => item.classList.toggle('is-active', item.dataset.panel === name));
  if (breadcrumb) breadcrumb.textContent = panelTitles[name] || name;
  toggleSidebar(false);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach((item) => item.addEventListener('click', (event) => {
  const panel = item.dataset.panel;
  if (!panel) return;
  event.preventDefault();
  openPanel(panel);
}));
document.querySelectorAll('[data-go-panel]').forEach((item) => item.addEventListener('click', () => openPanel(item.dataset.goPanel)));
document.querySelectorAll('[data-add-project], [data-edit-project]').forEach((item) => item.addEventListener('click', () => openPanel('project-editor')));
document.querySelectorAll('[data-add-service]').forEach((item) => item.addEventListener('click', () => showToast('Formulário para adicionar serviço aberto.')));
document.querySelectorAll('[data-add-testimonial]').forEach((item) => item.addEventListener('click', () => showToast('Formulário para adicionar depoimento aberto.')));

document.querySelectorAll('[data-save], [data-toast]').forEach((item) => item.addEventListener('click', () => showToast(item.dataset.save || item.dataset.toast)));
document.querySelectorAll('[data-save-form]').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('Alterações salvas com sucesso.');
}));

const modal = document.querySelector('.confirm-modal');
let deleteItem;
document.querySelectorAll('[data-delete]').forEach((button) => button.addEventListener('click', () => {
  deleteItem = button.closest('tr, article');
  const name = button.dataset.delete;
  const deleteName = modal?.querySelector('[data-delete-name]');
  if (deleteName) deleteName.textContent = name;
  if (modal?.showModal) modal.showModal();
}));
document.querySelector('[data-close-modal]')?.addEventListener('click', () => modal?.close());
document.querySelector('[data-confirm-delete]')?.addEventListener('click', () => {
  deleteItem?.remove();
  modal?.close();
  showToast('Item excluído com sucesso.');
});
modal?.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') toggleSidebar(false);
});
