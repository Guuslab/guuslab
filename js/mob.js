if (/Mobi/.test(navigator.userAgent) && !/iPad/.test(navigator.userAgent)) {

    const menuElement = document.querySelector('.menu-items');
    const iconElement = document.querySelector('.hamburger-icon');
    const logoElement = document.querySelector('.logo');
  
    menuElement.classList.remove('menu-items');
    menuElement.classList.add('menu-items-mob');
  
    iconElement.classList.remove('hamburger-icon');
    iconElement.classList.add('hamburger-icon-mob');
  
    logoElement.classList.remove('logo');
    logoElement.classList.add('logo-mob');
  }