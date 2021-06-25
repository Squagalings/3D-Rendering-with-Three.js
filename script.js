import * as MathUtils from './MathUtils.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.setZ(30);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xfec0c5 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)

const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper)

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const vertices = [];

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);

  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => MathUtils.randFloatSpread(100));

  // const [x, y, z] = Array(3).fill().map(() => 200 * Math.random() - 100);


  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space1.jpg')
scene.background = spaceTexture;

const jeffTexture = new THREE.TextureLoader().load('jeff.jpg')

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
)
scene.add(jeff)

const moonTexture = new THREE.TextureLoader().load('jupiter.jpg')
// const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    // normalMap: normalTexture
  })
)
scene.add(jupiter)

jupiter.position.z = 30;
jupiter.position.setX(-10);

function moveCamera() {
const t = document.body.getBoundingClientRect().top;
jupiter.rotation.x += 0.05;
jupiter.rotation.y += 0.075;
jupiter.rotation.z += 0.05;

jeff.rotation.y += 0.01;
jeff.rotation.z += 0.01;

camera.position.z = t * - 0.01;
camera.position.x = t * - 0.0002;
camera.position.y = t * - 0.0002;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y -= 0.05;
  torus.rotation.z -= 0.01;

  controls.update()

  renderer.render(scene, camera);
}

animate();