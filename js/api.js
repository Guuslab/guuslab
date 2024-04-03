function fetchWord() {
    fetch('https://api.guuslab.com/api/word?lan=nl')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            var heroElement = document.querySelector('#random');
            if (heroElement) {
                if (data.words && data.words.length > 0) {
                    heroElement.textContent = data.words[0];
                }
            } else {
                console.error('Element with id "random" not found');
            }
        })
        .catch(error => console.error('Error:', error));
}

fetchWord(); // Call the function immediately