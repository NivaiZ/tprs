export function accordionHandler() {
  const list = document.querySelectorAll('.content__list--accordion');
  const button = document.querySelectorAll('[data-content="accordion"]');
  if (list && button) {
    for (let i = 0; i < button.length; i++) {
      const element = button[i];
      const accordion = list[i];
      element.addEventListener('click', () => {
        accordion.classList.toggle('content__visible');
        element.classList.toggle('content__rotate');
      })
    }
  }
}
