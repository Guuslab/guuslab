document.querySelectorAll('.copyButton').forEach((button) => {
  button.addEventListener('click', function() {
    var copyText = button.closest('.copyContainer').querySelector('.code');
    navigator.clipboard.writeText(copyText.textContent)
      .then(() => {
        var message = document.createElement('div');
        message.classList.add('message');
        message.id = 'message';
        message.textContent = 'Copying to clipboard was successful!';
        document.body.appendChild(message);
        setTimeout(function() {
          document.body.removeChild(message);
        }, 3000);
      })
      .catch(err => {
        alert('Could not copy text: ', err);
      });
  });
});