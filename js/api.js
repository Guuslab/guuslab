window.onload = function() {
    fetch('https://api.guuslab.com/api/word?lan=nl&e=lab')
        .then(response => response.json())
        .then(data => {
            var heroElement = document.querySelector('.hero-q');
            heroElement.textContent = data.word;
        })
        .catch(error => console.error('Error:', error));
};