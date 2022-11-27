//Importación de constructores

import {
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
  LineSegments,
} from "three";

import CameraControls from "camera-controls";

//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

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
    clamp: MathUtils.clamp,
  },
};

import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

import gsap from "gsap";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

//Canvas HTML

const canvasHtml = document.getElementById("escena-inicial");

//Escena

const escena = new Scene();

//Cámara

const camara = new PerspectiveCamera(
  75,
  canvasHtml.clientWidth / canvasHtml.clientHeight
);
camara.position.z = 3;
camara.position.x = 3;
camara.position.y = 3;
//camara.lookAt(axesHelper.position)

/*
// Raycasting

const geoCubo = new BoxGeometry(1, 1, 1);
const materialCubo = new MeshBasicMaterial({
  color: "orange",
});
const resaltador = new MeshBasicMaterial({
  color: "red",
});
const cubo = new Mesh(geoCubo, materialCubo);
escena.add(cubo);
const seleccionPrevia = {
  objeto: null,
  material: null,
};
const raycaster = new Raycaster();
const mouse = new Vector2();

canvasHtml.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / canvasHtml.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / canvasHtml.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camara);
  const inters = raycaster.intersectObject(cubo);

  const colisiona = inters.length !== 0;
  if (!colisiona) {
    reinicioObjeto()
    return;
  }

  const primerElemento = inters[0]
  const enObjeto = seleccionPrevia.objeto === primerElemento.object

  if(enObjeto) return
  
  reinicioObjeto()

  seleccionPrevia.objeto = primerElemento.object
  seleccionPrevia.material = primerElemento.object.material

  primerElemento.object.material = resaltador

})

function reinicioObjeto(){
  if (seleccionPrevia.objeto) {
    seleccionPrevia.objeto.material = seleccionPrevia.material;
    seleccionPrevia.objeto = null;
    seleccionPrevia.material = null;
  }
}*/

/*
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
*/

//Coordenadas y grillas

const axesHelper = new AxesHelper();
axesHelper.material.depthTest = false;
axesHelper.renderOrder = 2;
/*
const axesTierra = new AxesHelper(0.5)
axesTierra.material.depthTest=false
axesTierra.renderOrder=2
tierra.add(axesTierra)
*/

const grid = new GridHelper();
escena.add(axesHelper);
escena.add(grid);

//Luces

const ligth01 = new DirectionalLight();
ligth01.position.set(0, 1, 1);
const light03 = new AmbientLight("0xffffff", 0.5);
escena.add(ligth01, light03);

/*const ligth02 = new DirectionalLight()
ligth01.position.set(1,1,1)
escena.add(ligth02)*/

//Camara Controls

CameraControls.install({ THREE: subsetOfTHREE });
const clock = new Clock();
const controls = new CameraControls(camara, canvasHtml);
controls.dollyToCursor = true;
controls.setLookAt(20, 30, 20, 0, 0, 0);

/*const controls = new OrbitControls(camara, canvasHtml);
controls.enableDamping = true;*/

escena.add(camara);

//Renderizador

const renderer = new WebGLRenderer({
  canvas: canvasHtml,
});
renderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight, false);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("white", 1);

//Loaders

const loadingScreen = document.getElementById("pantalla-carga");
const progreso = document.getElementById("barra-progreso");
let Objeto3D;

const loader = new GLTFLoader();
loader.load(
  "./police_station.glb",
  (archivo) => {
    Objeto3D = archivo.scene;
    loadingScreen.classList.add("hidden");
    escena.add(Objeto3D);
  },
  (progress) => {
    const avanceBruto = (progress.loaded / progress.total) * 100;
    const avanceRedondeo = Math.round(avanceBruto);
    progreso.textContent = `CARGANDO ${avanceRedondeo}%`;
    //console.log(progress)
  },
  (error) => {
    console.log(error);
  }
);

//Etiquetador

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight);
const canvas2D = labelRenderer.domElement;
canvas2D.style.position = "absolute";
canvas2D.style.pointerEvents = "none";
canvas2D.style.top = "0";
document.body.appendChild(canvas2D);

/*const label = document.createElement("h1")
label.textContent = "Prueba"
const labelObject = new CSS2DObject(label)
escena.add(labelObject)*/

const raycaster = new Raycaster();
const mouse = new Vector2();

canvasHtml.addEventListener("dblclick", (event) => {
  mouse.x = (event.clientX / canvasHtml.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / canvasHtml.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camara);
  const inters = raycaster.intersectObject(Objeto3D);

  const elementoInt = inters[0];
  const position = elementoInt.point;

  const message = window.prompt("Escribe una incidencia:");

  if (!inters.length) {
    return;
  }

  const contenedor = document.createElement("div");
  contenedor.classList.add("label-container");

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "X";
  cancelButton.classList.add("button-hidden");
  contenedor.appendChild(cancelButton);

  const label = document.createElement("p");
  label.textContent = message;
  label.classList.add("label");
  contenedor.appendChild(label);

  const labelObject = new CSS2DObject(contenedor);
  labelObject.position.copy(position);
  escena.add(labelObject);

  cancelButton.onclick = () => {
    labelObject.removeFromParent(); //Quito objeto de la escena
    labelObject.element = null; //Elimino objeto
    contenedor.remove(); //Elimino contenedor
  };

  contenedor.onmouseenter = () => {
    cancelButton.classList.remove("button-hidden");
  };

  contenedor.onmouseleave = () => {
    cancelButton.classList.add("button-hidden");
  };
});

//Animación de objetos

function animate() {
  /*cubo.rotation.x += 0.01;
    cubo.rotation.z += 0.01;*/
  /*
    sol.rotation.y += 0.01
    tierra.rotation.y += 0.03
    */
  const delta = clock.getDelta();
  controls.update(delta);
  renderer.render(escena, camara);
  labelRenderer.render(escena, camara);
  requestAnimationFrame(animate);
}

animate();

//Responsividad

camara.addEventListener("resize", () => {
  camara.aspect = canvasHtml.clientWidth / canvasHtml.clientHeight;
  camara.updateProjectionMatrix();
  renderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight, false);
  labelRenderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight);
});

/*
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

*/
