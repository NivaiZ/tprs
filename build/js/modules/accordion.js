export function accordionHandler() {
  const buttons = document.querySelectorAll('[data-content="accordion"]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const accordion = button.nextElementSibling;

      buttons.forEach((otherButton) => {
        const otherAccordion = otherButton.nextElementSibling;
        accordion.style.height = '0';
        if (otherButton !== button) {
          otherAccordion.classList.remove('content__visible');
          otherButton.classList.remove('content__rotate');
          otherAccordion.style.height = '0';
        }
      });

      accordion.classList.toggle('content__visible');
      button.classList.toggle('content__rotate');

      if (accordion.classList.contains('content__visible')) {
        const contentHeight = accordion.scrollHeight + 'px';
        accordion.style.height = contentHeight;
      } else {
        accordion.style.height = '0';
      }
    });
  });
}
