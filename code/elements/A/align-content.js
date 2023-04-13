const aligncontent = `
<div class="card">
<div class="title">
  <h2 class="text">
  align-content
  </h2>
  <h4 class="text">
  Specifies the alignment between the lines inside a flexible container when the items do not use all available space.
  </h4>
  </div>
  <div class="thing">
    <h3 class="text">
    example
    </h3>
    <div id="main">
    <div style="
    background-color:coral;
    width: 50px;
    height: 50px;
    border: 1px solid #c3c3c3;
    display: flex;
    flex-wrap: wrap;
    align-content: center;"></div>
    <div style="background-color:lightblue;
    width: 50px;
    height: 50px;
    border: 1px solid #c3c3c3;
    display: flex;
    flex-wrap: wrap;
    align-content: center;"></div>
    <div style="background-color:pink;
    width: 50px;
    height: 50px;
    border: 1px solid #c3c3c3;
    display: flex;
    flex-wrap: wrap;
    align-content: center;"></div>
    </div>
  </div>
  <div class="thing">
    <h3 class="text">
    code
    </h3>
    <pre class="code-text">
#main {
  width: 70px;
  height: 300px;
  border: 1px solid #c3c3c3;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

div style="background-color:coral;
width: 50px;
height: 50px;
border: 1px solid #c3c3c3;
display: flex;
flex-wrap: wrap;
align-content: center;"/div

div style="background-color:lightblue;
width: 50px;
height: 50px;
border: 1px solid #c3c3c3;
display: flex;
flex-wrap: wrap;
align-content: center;"/div

div style="background-color:pink;
width: 50px;
height: 50px;
border: 1px solid #c3c3c3;
display: flex;
flex-wrap: wrap;
align-content: center;"/div
    </pre>
  </div>
  <div class="thing">
    <h3 class="text">
    value's
    </h3>
    <pre class="value-text">
stretch         Default value. Lines stretch
                to take up the remaining space.

center	        Lines are packed toward 
                the center of the flex container.

flex-start      Lines are packed toward the 
                start of the flex container.	

flex-end        Lines are packed toward the 
                end of the flex container.	

space-between   Lines are evenly distributed 
                in the flex container.	

space-around    Lines are evenly distributed in 
                the flex container, with half-size 
                spaces on either end.

space-evenly    Lines are evenly distributed in 
                the flex container, with equal 
                space around them.	

initial         Sets this property to its 
                default value.	

inherit         Inherits this property from its 
                parent element.	
    </pre>
  </div>
  <div class="thing">
    <h3 class="text">
    js-syntax
    </h3>
    <pre class="syntax-text">
object.style.alignContent="center"
    </pre>
  </div>
</div>
`;
const container1 = document.getElementById('align-content');
container1.innerHTML = aligncontent;