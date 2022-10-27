
const headerButton = document.querySelector('#headerButton')
const headerMenuMobile = document.querySelector('#headerMenuMobile')
const headerButtonDiv = headerButton.firstElementChild

headerButton.addEventListener('click', () => {
  headerMenuMobile.classList.toggle('header-menu__mobile_active')
  headerButtonDiv.classList.toggle('active')
  headerButton.classList.toggle('header-nav__burger_active')
})