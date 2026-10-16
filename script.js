document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelector('.site-nav')?.classList.remove('is-open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  siteNav?.classList.toggle('is-open', !open);
});

const dialogs = {
  note: document.querySelector('#note-dialog'),
  resume: document.querySelector('#resume-dialog'),
};

const showDialog = (dialog) => {
  if (!dialog) return;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
};

const closeDialog = (dialog) => {
  if (!dialog) return;
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
};

document.querySelector('[data-open-note]')?.addEventListener('click', () => showDialog(dialogs.note));
document.querySelectorAll('[data-open-resume]').forEach((button) => {
  button.addEventListener('click', () => showDialog(dialogs.resume));
});
document.querySelectorAll('.modal-close').forEach((button) => {
  button.addEventListener('click', () => closeDialog(button.closest('dialog')));
});
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
});
