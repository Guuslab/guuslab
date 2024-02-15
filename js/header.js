class CustomHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const page = this.getAttribute('page') || '1';
    this.innerHTML = `
      <header>
        <nav>
          <div class="hamburger-menu">
            <div class="hamburger-icon">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
            <div class="logo-div">
              <a href="/">
                <svg fill="none" class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.8 131.3" oncontextmenu="return false;">
                  <g>
                    <path
                    id="guuslab-logo"
                      d="M168,65.7c.2-25.4,36.7-37,54.9-48.4-47.6,24.6-125.1,48.4-189,48.4,63.8,0,141.3,23.7,188.9,48.3-18.2-11.3-54.5-22.9-54.8-48.3Z"/>
                    </g>
                  </svg>
              </a>
            </div>
          <ul class="menu-items">
              <li><a class="item1${page === '1' ? '-on' : ''}" href="/">Home</a></li>
              <li><a class="item2${page === '2' ? '-on' : ''}" href="/about">About</a></li>
              <li><a class="item3${page === '3' ? '-on' : ''}" href="/pro">Projecten</a></li>
              <li><a class="item4${page === '4' ? '-on' : ''}" href="/lab">The Lab</a></li>
            </ul>
          </div>
          <div class="backdrop"></div>
        </nav>
      </header>
    `;
  }
}

customElements.define('lab-header', CustomHeader);