export function modalVisible() {
  const button = document.querySelectorAll('[data-button="modal"]');
  const modal = document.querySelector('#modal__authorization');
  const body = document.querySelector('body');
  const modalClose = document.querySelector('[data-button="close"]');

  if (button && modal && body && modalClose) {
    for (let i = 0; i < button.length; i++) {
      const element = button[i];
      element.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.add('modal__open');
        body.classList.add('body__overflow');
      })

      modalClose.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.remove('modal__open');
        body.classList.remove('body__overflow');
      })
    }

    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        modal.classList.remove('modal__open');
        body.classList.remove('body__overflow');
      }
    })

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.closest('.side-menu__open') && !target.closest(['[data-button="close"]'])) {
        modal.classList.remove('modal__open');
      }
    })
  }
}
