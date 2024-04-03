window.onload = function() {
    fetch('https://api.guuslab.com/api/word?lan=nl&e=lab', { mode: 'no-cors' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var heroElement = document.querySelector('.hero-q');
            if (data.words && data.words.length > 0) {
                heroElement.textContent = data.words[0];
            }
        })
        .catch(error => console.error('Error:', error));
};