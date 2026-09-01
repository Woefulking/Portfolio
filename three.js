import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const starsCount = 1000;
const radius = 1.2;

const stars = new THREE.Group();

const sphereGeometry = new THREE.SphereGeometry(0.001, 16, 16);

const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x4488ff,
});

for (let i = 0; i < starsCount * 3; i += 3) {
  let x, y, z, len;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    z = Math.random() * 2 - 1;
    len = Math.sqrt(x * x + y * y + z * z);
  } while (len > 1);

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.set(x * radius, y * radius, z * radius);

  stars.add(sphere);
}

scene.add(stars);

function animate() {
  requestAnimationFrame(animate);

  stars.rotation.x -= 0.00006;
  stars.rotation.y -= 0.0001;

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
