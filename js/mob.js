if (/Mobi/.test(navigator.userAgent) && !/iPad/.test(navigator.userAgent)) {

    const menuElement = document.querySelector('.menu-items');
    const iconElement = document.querySelector('.hamburger-icon');
    const logoElement = document.querySelector('.logo');
    const  skyContentElement = document.querySelector('.sky-content');
    const  artxContentElement = document.querySelector('.artx-content');
  
    menuElement.classList.remove('menu-items');
    menuElement.classList.add('menu-items-mob');
  
    iconElement.classList.remove('hamburger-icon');
    iconElement.classList.add('hamburger-icon-mob');
  
    logoElement.classList.remove('logo');
    logoElement.classList.add('logo-mob');
    
    skyContentElement.classList.remove('sky-content');
    skyContentElement.classList.add('sky-content-mob');

    artxContentElement.classList.remove('artx-content');
    artxContentElement.classList.add('artx-content-mob');

  }