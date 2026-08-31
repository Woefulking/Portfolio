import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const starsCount = 1000;
const positions = new Float32Array(starsCount * 3);

const radius = 1.2;
for (let i = 0; i < starsCount * 3; i += 3) {
  let x, y, z, len;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    z = Math.random() * 2 - 1;
    len = Math.sqrt(x * x + y * y + z * z);
  } while (len > 1);

  positions[i] = x * radius;
  positions[i + 1] = y * radius;
  positions[i + 2] = z * radius;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0x4488ff,
  size: 0.002,
  sizeAttenuation: true,
  depthWrite: false,
  transparent: false,
});

const stars = new THREE.Points(geometry, material);
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
