import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerWidth);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const container = document.getElementById('hallo');
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1.5, 4, 1.5);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 3, -5); // Pas de positie van het licht aan
scene.add(light);

camera.position.z = 5;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
