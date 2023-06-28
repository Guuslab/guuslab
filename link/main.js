import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const loadingScreen = document.getElementById('loading-screen');
const loadingProgress = document.getElementById('loading-progress');
const loadingText = document.getElementById('loading-text');
const container = document.getElementById('hallo');
container.style.opacity = '0';
container.appendChild(renderer.domElement);

const loader = new GLTFLoader();

let model;

loader.load(
  'public/3dmodel/hijskraan.glb',
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.scale.set(1.7, 1.7, 1.7);

    let opacity = 0;
    const fadeInInterval = setInterval(() => {
      opacity += 0.01;
      container.style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(fadeInInterval);
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 10000);
      }
    }, 10);
  },
  function (xhr) {
    const progress = xhr.loaded / xhr.total;

    const percentage = Math.min(Math.round(progress * 100), 100); // Begrens het percentage tot 100
    loadingProgress.style.width = `${percentage}%`;
    loadingText.innerText = `${percentage}%`;
  },
  function (error) {
    console.error(error);
  }
);

loader.manager.onLoad = function () {
  const loadingScreenFadeOutInterval = setInterval(() => {
    loadingScreen.classList.add('fade-out');
    clearInterval(loadingScreenFadeOutInterval);
  }, 1000);
};

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

camera.position.z = 5;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

let scrollY = 0;

function handleScroll() {
  scrollY = window.scrollY;
}

window.addEventListener('scroll', handleScroll);

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.x = scrollY * 0.0005;
    model.position.y = -scrollY * -0.0003;
  }

  renderer.render(scene, camera);
}

animate();



// let userAgent = navigator.userAgent;
// if (userAgent.match(/iPhone/i)) {
//     let css = '.nav {padding-top: 120px;}';
//     let head = document.head || document.getElementsByTagName('head')[0];
//     let style = document.createElement('style');

//     style.type = 'text/css';
//     if (style.styleSheet){
//       style.styleSheet.cssText = css;
//     } else {
//       style.appendChild(document.createTextNode(css));
//     }

//     head.appendChild(style);
// }

const button = document.querySelector('button');

button.addEventListener('click', () => {
    setTimeout(() => {
        if ('Notification' in window) {
            Notification.requestPermission().then(perm => {
                if (perm === 'granted') {
                    const notifi = new Notification('test! test! test!', {
                        body: 'this is more text',
                        data: { hallo: 'world' },
                        icon: 'logob.svg'
                    });
                }
            });
        } else {
            console.log('Meldingen worden niet ondersteund in deze browser.');
        }
    }, 10000); // Wacht 10 seconden voordat de melding wordt verzonden
});

// Registratie van de service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker geregistreerd:', registration);
    })
    .catch(error => {
      console.error('Fout bij het registreren van de Service Worker:', error);
    });
}

// Vraag toestemming voor pushmeldingen
function askForNotificationPermission() {
  if (!('Notification' in window)) {
    console.error('De Notification API wordt niet ondersteund in deze browser');
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Toestemming voor pushmeldingen verleend');
      // Hier kun je de code toevoegen om het pushabonnement te maken en naar je server te sturen
    } else {
      console.warn('Toestemming voor pushmeldingen geweigerd');
    }
  });
}

// Event listener voor het klikken op de knop om toestemming te vragen
const myButton = document.querySelector('#myButton');
myButton.addEventListener('click', askForNotificationPermission);
