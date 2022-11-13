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