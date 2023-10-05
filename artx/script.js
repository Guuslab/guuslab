// Deze functie wordt aangeroepen wanneer de pagina is geladen
function init() {
    // Voeg de links van de zijbalk toe aan de hoofdpagina
    var links = document.querySelectorAll("nav ul li a");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      link.addEventListener("click", function() {
        // Navigeer naar de geselecteerde pagina
        var href = link.getAttribute("href");
        window.location.href = href;
      });
    }
  }
  
  // Voer de init() functie uit wanneer de pagina is geladen
  document.addEventListener("DOMContentLoaded", init);
  