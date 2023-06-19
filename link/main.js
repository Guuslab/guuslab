import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const loadingScreen = document.getElementById('loading-screen');

const container = document.getElementById('hallo');
container.style.opacity = '0'; // Stel de initiële zichtbaarheid in op 0
container.appendChild(renderer.domElement);

const loader = new GLTFLoader();

let model; // Variabele om het geladen model bij te houden

loader.load(
    'public/3dmodel/hijskraan.glb',
    function (gltf) {
        model = gltf.scene;
        scene.add(model);
        model.scale.set(1.7, 1.7, 1.7);

        // Animatie voor het vervagen van het laadscherm
        let opacity = 0;
        const fadeInInterval = setInterval(() => {
            opacity += 0.01;
            container.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeInInterval);
                setTimeout(() => {
                    loadingScreen.style.display = 'none'; // Verberg het laadscherm na een vertraging
                }, 10000); // Pas de vertraging hier aan (in milliseconden)
            }
        }, 10);
    },
    function (xhr) {
        // Bereken de voortgang van het laden
        const progress = xhr.loaded / xhr.total;

        // Werk de voortgangsbalk bij
        const loadingProgress = document.getElementById('loading-progress');
        loadingProgress.style.width = `${progress * 100}%`;
    },
    function (error) {
        console.error(error);
    }
);

loader.manager.onLoad = function () {
    // Model is volledig geladen
    const loadingScreenFadeOutInterval = setInterval(() => {
        loadingScreen.classList.add('fade-out');
        clearInterval(loadingScreenFadeOutInterval);
    }, 1000);
};

const light = new THREE.DirectionalLight(0xffffff, 1); // Gebruik DirectionalLight in plaats van PointLight
light.position.set(0, 0, 1); // Stel de richting van het licht in (van voren)
scene.add(light);

camera.position.z = 5;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

let scrollY = 0; // Variabele om de scrollpositie bij te houden

function handleScroll() {
    scrollY = window.scrollY;
}

window.addEventListener('scroll', handleScroll); // Luister naar scroll-gebeurtenissen

function animate() {
    requestAnimationFrame(animate);

    // Update de rotatie en positie op basis van de scrollpositie
    if (model) {
        model.rotation.x = scrollY * 0.0005;
        model.position.y = -scrollY * 0.001;
    }

    renderer.render(scene, camera);
}

animate();