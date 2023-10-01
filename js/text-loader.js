  function getTxtFileText(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, false);
    xhr.send();
  
    return xhr.responseText;
  }
  
  var txtFileText = getTxtFileText("hello.txt");
  
  document.querySelector(".txt-text").innerHTML = txtFileText;
  