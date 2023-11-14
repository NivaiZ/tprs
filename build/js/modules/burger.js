export function burgerMenuOpenHandler() {
  const button = document.querySelector('[data-button="burger"]');
  const sideMenu = document.querySelector('.side-menu');
  const modal = document.querySelector('#modal__authorization');
  const body = document.querySelector('.body');
  const sideButtonClose = document.querySelector('[data-button="burger-close"]');

  if (button) {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      event.currentTarget.classList.toggle('menu__burger--open');
      sideMenu.classList.toggle('side-menu__open');
      body.classList.toggle('body__overflow');
    });

    sideButtonClose.addEventListener('click', () => {
      sideMenu.classList.remove('side-menu__open');
      body.classList.remove('body__overflow');
      button.classList.remove('menu__burger--open');
    })

    body.addEventListener('click', (event) => {
      const target = event.target;
      const isSideMenuOpen = sideMenu.classList.contains('side-menu__open');
      const isBurgerButton = target.closest('[data-button="burger"]');
      const isModalOpen = modal.classList.contains('modal__open');

      if (isSideMenuOpen && !isBurgerButton && !target.closest('.side-menu') && !isModalOpen) {
        sideMenu.classList.remove('side-menu__open');
        button.classList.remove('menu__burger--open');
        body.classList.remove('body__overflow');
      }
    });
  }
}
