export function anchorHandler() {
  const smoothLinks = document.querySelectorAll('[data-link="anchor"]');
  if (smoothLinks) {
    for (let smoothLink of smoothLinks) {
      smoothLink.addEventListener('click', (event) => {
        event.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      })
    }
  }
}
