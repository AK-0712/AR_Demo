import * as THREE from '../node_modules/three';
import {ARButton} from '../node_modules/three/examples/jsm/webxr/ARButton'

const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const light = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(light)

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({color: 0Xffffff * Math.random()});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0,0, 2);
scene.add(cube)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0,2,5);
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha:true
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.xr.enabled = true;

document.body.appendChild(renderer.domElement);
document.body.appendChild(ARButton.createButton(renderer));

renderer.setAnimationLoop(render)

function render(){
    requestAnimationFrame(render);
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.02;
       renderer.render(scene,camera)
}

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio)
})