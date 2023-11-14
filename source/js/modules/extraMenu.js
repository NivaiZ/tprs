export function helpMenuOpenHandler() {
  const button = document.querySelectorAll('[data-button="help"]');
  const helpMenu = document.querySelector('.menu__help');

  if (button) {
    for (let i = 0; i < button.length; i++) {
      const element = button[i];

      element.addEventListener('click', (event) => {
        event.stopPropagation();
        element.classList.toggle('menu__button--open');
        helpMenu.classList.toggle('menu__help--open');
      })

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.closest('.menu__item--relative') && !target.closest('[data-button="button"]')) {
          helpMenu.classList.remove('menu__help--open');
          element.classList.remove('menu__button--open');
        }
      })
    }
  }
}
