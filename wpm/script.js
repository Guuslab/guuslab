let startTime;
let wordCount = 0;

function startTimer() {
    const textInput = document.getElementById('textInput');
    const resultElement = document.getElementById('wpm');

    const words = textInput.value.split(/\s+/).filter(word => word !== '');

    if (words.length === 0) {
        resultElement.innerText = ' 0';
        startTime = null; // Reset de timer als er geen tekst is.
        return;
    }

    if (!startTime) {
        startTime = new Date();
        wordCount = 0;
    }

    wordCount = words.length;

    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000; // in seconds

    const wpm = Math.round((wordCount / elapsedTime) * 60);

    resultElement.innerText = `${wpm}`;
}
