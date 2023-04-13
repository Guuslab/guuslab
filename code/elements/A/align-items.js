const alignitems = `
<div class="card">
<div class="title">
  <h2 class="text">
  align-items
  </h2>
  <h4 class="text">
  Specifies the alignment for items inside a flexible container
  </h4>
  </div>
  <div class="thing">
    <h3 class="text">
    example
    </h3>
    <pre class="code-text">
    <div id="main" style="
    width: 220px;
    height: 300px;
    border: 1px solid black; 
    display: flex;
    align-items: center;">
    <div style="background-color:coral;
    min-height:30px;
    flex: 1;
    border: 1px solid black;
    display: flex;
    align-items: center;
    ">RED</div>
    <div style="background-color:lightblue;
    min-height:50px;
    flex: 1;
    border: 1px solid black;
    display: flex;
    align-items: center;
    ">BLUE</div>  
    <div style="background-color:lightgreen;
    min-height:190px;
    flex: 1;
    border: 1px solid black;
    display: flex;
    align-items: center;
    ">Green div
    </pre>
  </div>
  <div class="thing">
    <h3 class="text">
    code
    </h3>
    <pre class="code-text">
div id="main" style="
width: 220px;
height: 300px;
border: 1px solid black; 
display: flex;
align-items: center;"

div style="background-color:coral;
min-height:30px;
flex: 1;
border: 1px solid black;
display: flex;
align-items: center;
"RED/div

div style="background-color:lightblue;
min-height:50px;
flex: 1;
border: 1px solid black;
display: flex;
align-items: center;
"BLUE/div

div style="background-color:lightgreen;
min-height:190px;
flex: 1;
border: 1px solid black;
display: flex;
align-items: center;
"Green div
    </pre>
  </div>
  <div class="thing">
    <h3 class="text">
    value's
    </h3>
    <pre class="value-text">
normal              Default. Behaves like 'stretch' 
                    for flexbox and grid items, or 
                    'start' for grid items with a 
                    defined block size.

stretch             Items are stretched to 
                    fit the container.

center              Items are positioned at the 
                    center of the container.

flex-start          Items are positioned at the 
                    beginning of the container.

flex-end            Items are positioned at 
                    the end of the container.

start	            Items are positioned at the 
                    beginning of their individual 
                    grid cells, in the block direction.

end                 Items are positioned at the 
                    end of the their individual 
                    grid cells, in the block direction.

baseline            Items are positioned at
                    the baseline of the container.

initial	            Sets this property to its 
                    default value.	

inherit	            Inherits this property from 
                    its parent element.
    </pre>
  </div>
  <div class="thing">
    <h3 class="text">
    js-syntax
    </h3>
    <pre class="syntax-text">
object.style.alignItems="center"
    </pre>
  </div>
</div>
`;
const container2 = document.getElementById('align-items');
container2.innerHTML = alignitems;
