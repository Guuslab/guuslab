class CustomFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <footer>
        <div class="footer-content">
            <div class="footer-logo">
                <a href="/">
                    <img
                        src="https://guus.space/logo/lab/white-full.svg"
                        alt="logo"
                    />
                </a>
            </div>
            <div class="footer-links">
                <ul>
                    <h2>Guuslab</h2>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/pro">Projecten</a></li>
                    <li><a href="/lab">The Lab</a></li>
                </ul>
            </div>

            <div class="footer-links">
                <ul>
                    <h2>PROJECTEN</h2>
                    <li>
                        <a href="https://artx.guuslab.com/" target="_blank"
                            >ARTX</a
                        >
                    </li>
                    <li>
                        <a href="https://weer.guuslab.com/" target="_blank"
                            >GuusSky</a
                        >
                    </li>
                    <li>
                        <a href="https://guus.space/" target="_blank"
                            >GuusSpace</a
                        >
                    </li>
                </ul>
            </div>

            <div class="footer-links">
                <ul>
                    <h2>THE LAB</h2>
                    <li>
                        <a
                            href="https://flowfield.guuslab.com/"
                            target="_blank"
                            >Flowfield</a
                        >
                    </li>
                    <li>
                        <a
                            href="https://typetest.guuslab.com/"
                            target="_blank"
                            >Typetest</a
                        >
                    </li>
                    <li>
                        <a href="https://blob.guuslab.com/" target="_blank"
                            >Blob</a
                        >
                    </li>
                    <li>
                        <a href="https://guuslab.com/wpm/" target="_blank"
                            >WPM</a
                        >
                    </li>
                </ul>
            </div>
            <div class="footer-social">
                <a
                    href="https://whatsapp.com/channel/0029Va9YDJE2phHTJpTV2f1B/"
                    target="_blank"
                    ><img
                        src="https://guus.space/icon/whatapp.svg"
                        alt="Whatapp"
                /></a>
                <a href="https://www.instagram.com/guuslab/" target="_blank"
                    ><img
                        src="https://guus.space/icon/insta.svg"
                        alt="Insta"
                /></a>
                <a href="https://github.com/guuskaashoek/" target="_blank"
                    ><img
                        src="https://guus.space/icon/github.svg"
                        alt="Github"
                /></a>
                <a href="https://x.com/guuslab/" target="_blank"
                    ><img src="https://guus.space/icon/x.svg" alt="X"
                /></a>
            </div>
        </div>
        <div class="footer-credits">
            <p>© 2024 Guuslab</p>
        </div>
        </footer>
    `;
  }
}

customElements.define('lab-footer', CustomFooter);