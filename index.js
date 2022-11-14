import{
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer
} from "three"

const escena = new Scene()

const geometria = new BoxGeometry(1.5,1.5,1.5)
const material = new MeshBasicMaterial({color: "blue"})

const cubo = new Mesh(geometria,material)

escena.add(cubo)

const tamaño = {
    width: 800,
    height: 600
}

const camara = new PerspectiveCamera(75,tamaño.width / tamaño.height)
camara.position.z = 3

escena.add(camara)

const canvasHtml = document.getElementById("escena-inicial")
const renderer = new WebGLRenderer({
    canvas: canvasHtml})
renderer.setSize(tamaño.width,tamaño.height)
renderer.render(cubo,camara)

function animate() {
    cubo.rotation.x += 0.01;
    cubo.rotation.z += 0.01;
    renderer.render(escena, camara);
    requestAnimationFrame(animate);
 }
 
 animate();