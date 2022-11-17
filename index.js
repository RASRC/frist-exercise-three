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
    AmbientLight,
    SphereGeometry,
    AxesHelper
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

const axesHelper = new AxesHelper();
escena.add(axesHelper);

//const geometria = new BoxGeometry(1.5,1.5,1.5)
const geometria = new SphereGeometry(0.5)
const material = new MeshPhongMaterial({color: "yellow"})
const materialBlue = new MeshPhongMaterial({color: "blue"})
const materialWhite = new MeshPhongMaterial({color: "white"})

const sol = new Mesh(geometria,material)
const tierra = new Mesh(geometria,materialBlue)
tierra.scale.set(0.2,0.2,0.2)
tierra.position.x=2
const luna = new Mesh(geometria,materialWhite)
luna.position.x=1
luna.scale.set(0.3,0.3,0.3)


escena.add(sol)
sol.add(tierra)
tierra.add(luna)

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

const camara = new PerspectiveCamera(75,canvasHtml.clientWidth / canvasHtml.clientHeight)
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
renderer.render(sol,camara)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate() {
    /*cubo.rotation.x += 0.01;
    cubo.rotation.z += 0.01;*/
    sol.rotation.y += 0.01
    tierra.rotation.y += 0.03
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