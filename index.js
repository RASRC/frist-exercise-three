//Importación de constructores

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
    AxesHelper,
    GridHelper,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments
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

import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

import gsap from "gsap";

//Canvas HTML

const canvasHtml = document.getElementById("escena-inicial")

//Escena

const escena = new Scene()

//Geometría y materiales

//const geometria = new BoxGeometry(1.5,1.5,1.5)
const geometria = new SphereGeometry(0.5)
const material = new MeshPhongMaterial({color: "yellow"})

const materialBlue = new MeshPhongMaterial({color: "blue"})
const materialWhite = new MeshPhongMaterial({color: "grey"})
material.shininess = "100"
material.flatShading="true"

//Objetos

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

//Coordenadas y grillas

const axesHelper = new AxesHelper()
axesHelper.material.depthTest=false
axesHelper.renderOrder=2
const axesTierra = new AxesHelper(0.5)
axesTierra.material.depthTest=false
axesTierra.renderOrder=2

const grid = new GridHelper()

escena.add(axesHelper)
tierra.add(axesTierra)
escena.add(grid)

//Luces

const ligth01 = new DirectionalLight()
ligth01.position.set(0,1,1)
escena.add(ligth01)

const light03 = new AmbientLight("0xffffff",0.5)
escena.add(light03)

/*const ligth02 = new DirectionalLight()
ligth01.position.set(1,1,1)
escena.add(ligth02)*/

//Cámara

const camara = new PerspectiveCamera(75,canvasHtml.clientWidth / canvasHtml.clientHeight)
camara.position.z = 3
camara.position.x = 3
camara.position.y = 3
camara.lookAt(axesHelper.position)

CameraControls.install( { THREE: subsetOfTHREE } );
const clock = new Clock();
const controls = new CameraControls(camara, canvasHtml);
controls.dollyToCursor=true;

/*const controls = new OrbitControls(camara, canvasHtml);
controls.enableDamping = true;*/

escena.add(camara)

//Renderizador

const renderer = new WebGLRenderer({
    canvas: canvasHtml})
renderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight,false)
renderer.render(sol,camara)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("white",1)

//Animación de objetos

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

 //Responsividad

 camara.addEventListener("resize",()=>{
    camara.aspect = canvasHtml.clientWidth / canvasHtml.clientHeight
    camara.updateProjectionMatrix()
    renderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight,false)
 })

 //Debugging

const gui = new GUI()

const posicionFolder = gui.addFolder("Posición")
posicionFolder.add(sol.position,"x",-3,3,0.01)
posicionFolder.add(sol.position,"y",-3,3,0.01)
posicionFolder.add(sol.position,"z",-3,3,0.01)

const vistaFolder = gui.addFolder("Apariencia")
vistaFolder.add(sol,"visible").name("visibilidad")

const colorParam = {
  value: "0xFFFF00"
}
vistaFolder.addColor(colorParam,"value").onChange(() => {
  sol.material.color.set(colorParam.value)
}).name("color")

const functionParam = {
  spin: () => {
    gsap.to(sol.rotation,{
      z: sol.rotation.z + 10,
      duration: 1
    })
  }
}
vistaFolder.add(functionParam,"spin").name("voltereta")

//Wireframe

const stationGeometry = new BoxGeometry(0.5,0.5,0.5)
const spaceMaterial = new MeshBasicMaterial({
  color: "white",
  polygonOffset: true,
  polygonOffsetFactor: 1, 
  polygonOffsetUnits: 1
})

const spaceStation = new Mesh(stationGeometry,spaceMaterial)
spaceStation.position.x=2
spaceStation.position.z=2

escena.add(spaceStation)

const edgesGeo = new EdgesGeometry(stationGeometry)
const edgesMaterial = new LineBasicMaterial({color: "black"})
const wireframe = new LineSegments(edgesGeo,edgesMaterial)
spaceStation.add(wireframe)

