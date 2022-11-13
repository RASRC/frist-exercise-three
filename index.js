import{
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer
} from "three"

const escena = new Scene()

const geometria = new BoxGeometry(0.5,0.5,0.5)
const material = new MeshBasicMaterial({color: "blue"})

const cubo = new Mesh(geometria,material)

escena.add(cubo)

const tamaño = {
    width: 800,
    height: 600
}

const camara = new PerspectiveCamera(75,tamaño.width / tamaño.height)