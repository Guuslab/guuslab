import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const container = document.getElementById('hallo');
container.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load(
    'public/3dmodel/hijskraan.glb', // Replace with the path to your GLB file
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 3, -5);
scene.add(light);

camera.position.z = 5;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

let scrollY = 0; // Variable to store the scroll position

function handleScroll() {
    scrollY = window.scrollY;
}

window.addEventListener('scroll', handleScroll); // Listen for scroll events

function animate() {
    requestAnimationFrame(animate);

    // Update the rotation based on scroll position
    if (scene.children.length > 0) {
        const model = scene.children[0];
        model.rotation.y = scrollY * 0.01;
    }

    renderer.render(scene, camera);
}

animate();
