document.addEventListener("DOMContentLoaded", function() {
  if (/Mobi/.test(navigator.userAgent) && !/iPad/.test(navigator.userAgent)) {
    let menuElement, iconElement, logoElement, skyContentElement, artxContentElement;
    const elements = ['menu-items', 'hamburger-icon', 'logo', 'sky-content', 'artx-content'];
    const mobElements = ['menu-items-mob', 'hamburger-icon-mob', 'logo-mob', 'sky-content-mob', 'artx-content-mob'];
    const intervalIds = [];
    let searchFrequency = 1; // start with 1ms
    let foundElements = 0;

    const searchElements = () => {
      elements.forEach((element, index) => {
        const el = document.querySelector(`.${element}`);
        if (el) {
          clearInterval(intervalIds[index]);
          el.classList.remove(element);
          el.classList.add(mobElements[index]);
          foundElements++;
          switch (element) {
            case 'menu-items':
              menuElement = el;
              break;
            case 'hamburger-icon':
              iconElement = el;
              break;
            case 'logo':
              logoElement = el;
              break;
            case 'sky-content':
              skyContentElement = el;
              break;
            case 'artx-content':
              artxContentElement = el;
              break;
          }
        }
      });

      if (foundElements === elements.length) {
        console.log('All elements found');
        clearInterval(searchIntervalId);
      }
    };

    let searchIntervalId = setInterval(searchElements, searchFrequency);

    setTimeout(() => {
      clearInterval(searchIntervalId);
      searchFrequency = 1000; // change to 1s after 5s
      searchIntervalId = setInterval(searchElements, searchFrequency);
    }, 5000);

    setTimeout(() => {
      clearInterval(searchIntervalId);
      searchFrequency = 10000; // change to 10s after another 5s
      searchIntervalId = setInterval(searchElements, searchFrequency);
    }, 10000);
  }
});