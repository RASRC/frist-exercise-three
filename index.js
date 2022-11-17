import{
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    MeshPhongMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer,
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
    Clock,
    DirectionalLight,
    AmbientLight
} from "three"

import CameraControls from "camera-controls";

//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
      DEG2RAD: MathUtils.DEG2RAD,
      clamp: MathUtils.clamp
    }
  };

const canvasHtml = document.getElementById("escena-inicial")
const escena = new Scene()

const geometria = new BoxGeometry(1.5,1.5,1.5)
const material = new MeshPhongMaterial({
  color: "blue",
  specular: "white"})

const cubo = new Mesh(geometria,material)

escena.add(cubo)

/*const tamaño = {
    width: 800,
    height: 600
}*/

const ligth01 = new DirectionalLight()
ligth01.position.set(0,1,1)
escena.add(ligth01)

const light03 = new AmbientLight("0xffffff",0.5)
escena.add(light03)

/*const ligth02 = new DirectionalLight()
ligth01.position.set(1,1,1)
escena.add(ligth02)*/

material.shininess = "100"
material.flatShading="true"

const camara = new PerspectiveCamera(75,canvasHtml.clientWidth / canvasHtml.clientWidth)
camara.position.z = 3

CameraControls.install( { THREE: subsetOfTHREE } );
const clock = new Clock();
const controls = new CameraControls(camara, canvasHtml);
controls.dollyToCursor=true;

/*const controls = new OrbitControls(camara, canvasHtml);
controls.enableDamping = true;*/

escena.add(camara)


const renderer = new WebGLRenderer({
    canvas: canvasHtml})
renderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight,false)
renderer.render(cubo,camara)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate() {
    /*cubo.rotation.x += 0.01;
    cubo.rotation.z += 0.01;*/
    const delta = clock.getDelta();
    controls.update(delta);
    renderer.render(escena, camara);
    requestAnimationFrame(animate);
 }
 
 animate();

 camara.addEventListener("resize",()=>{
    camara.aspect = canvasHtml.clientWidth / canvasHtml.clientHeight
    camara.updateProjectionMatrix()
    renderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight,false)
 })