import{
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer
} from "three"

const canvasHtml = document.getElementById("escena-inicial")
const escena = new Scene()

const geometria = new BoxGeometry(1.5,1.5,1.5)
const material = new MeshBasicMaterial({color: "blue"})

const cubo = new Mesh(geometria,material)

escena.add(cubo)

/*const tamaño = {
    width: 800,
    height: 600
}*/

const camara = new PerspectiveCamera(75,canvasHtml.clientWidth / canvasHtml.clientWidth)
camara.position.z = 3

escena.add(camara)


const renderer = new WebGLRenderer({
    canvas: canvasHtml})
renderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight,false)
renderer.render(cubo,camara)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate() {
    cubo.rotation.x += 0.01;
    cubo.rotation.z += 0.01;
    renderer.render(escena, camara);
    requestAnimationFrame(animate);
 }
 
 animate();

 camara.addEventListener("resize",()=>{
    camara.aspect = canvasHtml.clientWidth / canvasHtml.clientHeight
    camara.updateProjectionMatrix()
    renderer.setSize(canvasHtml.clientWidth, canvasHtml.clientHeight,false)
 })