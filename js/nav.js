document.addEventListener("DOMContentLoaded", function() {
  let hamburgerIcon, menuItems, menuOff;
  const intervalId = setInterval(() => {
    hamburgerIcon = hamburgerIcon || document.querySelector('.hamburger-icon-mob');
    menuItems = menuItems || document.querySelector('.menu-items-mob');
    menuOff = menuOff || document.querySelector('.menu-off');

    if (hamburgerIcon && menuItems && menuOff) {
      clearInterval(intervalId);

      hamburgerIcon.addEventListener('click', () => {
        hamburgerIcon.classList.toggle('active');
        menuItems.classList.toggle('active');
        menuOff.classList.toggle('active');
      });

      menuOff.addEventListener('click', () => {
        hamburgerIcon.classList.remove('active');
        menuItems.classList.remove('active');
        menuOff.classList.remove('active');
      });
    }
  }, 100);
});