export function anchorButtonUp() {
  const button = document.querySelector('[data-button="up"]');

  document.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    scrollY < 400 ? show() : remove();
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  })

  function show() {
    button.classList.add('anchor__up--button-hide')
  }

  function remove() {
    button.classList.remove('anchor__up--button-hide')
  }

}
