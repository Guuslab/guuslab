const accentcollor = `
<div class="card">
<div class="title">
  <h2 class="text">
  Accent-collor
  </h2>
  <h4 class="text">
  Specifies an accent color for user-interface controls
  </h4>
  </div>
  <div class="thing">
    <h3 class="text">
    example
    </h3>
    <input type="checkbox" style="accent-color: red;">
    <input type="radio" style="accent-color: green;">
    <input type="range" style="accent-color: rgb(0, 0, 255);">
  </div>
  <div class="thing">
    <h3 class="text">
    code
    </h3>
    <pre class="code-text">
input type="checkbox" style="accent-color: red;"

input type="radio" style="accent-color: green;"

input type="range" style="accent-color: rgb(0, 0, 255);"
    </pre>
  </div>
  <div class="thing">
    <h3 class="text">
    value's
    </h3>
    <pre class="value-text">
auto          Default value. The browser 
              choose the accent color.

color         Specifies the color to be 
              used as the accent color. 
              All legal color values can be used 
              (rgb, hex, named-color, etc)

initial       Sets this property to its default value.	

inherit       Inherits this property from 
              its parent element.	
    </pre>
  </div>
  <div class="thing">
    <h3 class="text">
    js-syntax
    </h3>
    <pre class="syntax-text">
object.style.accentColor="red"
    </pre>
  </div>
</div>
`;
const container = document.getElementById('accent-collor');
container.innerHTML = accentcollor;
