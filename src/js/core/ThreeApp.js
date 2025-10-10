import {
  WebGLRenderer,
  Scene,
  Clock,
  PerspectiveCamera,
  Vector3,
  PlaneGeometry,
  MeshBasicMaterial,
  LinearFilter,
  MeshStandardMaterial,
  SRGBColorSpace,
  RepeatWrapping,
  Mesh,
  DirectionalLight,
  Texture,
  MathUtils,
  DoubleSide,
  Group,
  PointLight,
  SphereGeometry,
  BoxGeometry,
  // SphereGeometry,
  // AmbientLight,HemisphereLight,PCFSoftShadowMap,
} from "three";
import singletonMap from "../LoadManager";
import { TOUCHMANAGER } from "../Manager/TouchManager";
import { GAMEMANAGER } from "../Manager/GameManager";
import Stats from "three/examples/jsm/libs/stats.module.js";
import BlockGroup from "../Object/Block/BlockGroup";

// import CONFIG from '../Config';
export default class ThreeApp {
  constructor(container = document.body) {
    this.container = container;
    this.renderer = new WebGLRenderer({ antialias: true, stencil: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xb26847, 1);
    this.container.appendChild(this.renderer.domElement);
    this.scene = new Scene();
    this.clock = new Clock();
    this.camera = new PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.3,
      100
    );
    this.currentFov = 60;
    this.camera.position.set(0, 20, 7.5);
    this.camera.rotation.x = MathUtils.degToRad(-80);
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
    // if (CONFIG.onGameReady()) {
    // }
  }
  InitVariables() { }

  async awake() {
    this.InitVariables();
    TOUCHMANAGER.Init(this.scene, this.camera, this.renderer);
    this.setupEnvironment();
    const block = new BlockGroup({
      BlockName: "BLOCK_L",
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      physicsWorld: this.physicsWorld,
    });
    const block1 = new BlockGroup({
      BlockName: "BLOCK_L",
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      physicsWorld: this.physicsWorld,
    });
    block1.group.position.set(2, 0, 6);
    TOUCHMANAGER.addObject(block);
    TOUCHMANAGER.addObject(block1);
  }
  setupEnvironment() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = SRGBColorSpace;
    // this.renderer.shadowMap.type = PCFSoftShadowMap;
    // this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);


    const sun = new DirectionalLight(0xffffff, 5);
    sun.position.set(0, 5, 3);
    sun.castShadow = true;
    sun.target.position.set(0, 0, 5);
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
    sun.shadow.normalBias = 0.2;
    this.scene.add(sun);
    // const hemi = new HemisphereLight(0xffffff, 0x888888, 2.0);
    // this.scene.add(hemi);
    // const light = new AmbientLight(0x404040, 1);
    // this.scene.add(light);
  }
  update() {
    this.renderer.resetState();
    this.stats.update();
    const delta = this.clock.getDelta();
    GAMEMANAGER.delta = delta;
    // this.physicsWorld.step(1 / 60, delta, 3);
    this.renderer.render(this.scene, this.camera);
  }
  spawnBG(imageBgname, position, xGeo, yGeo, countRepeat = 1) {
    const image = singletonMap.get(imageBgname).texture.source?.resource;
    const planeTexture = new Texture(image);
    planeTexture.minFilter = LinearFilter;
    planeTexture.magFilter = LinearFilter;
    planeTexture.colorSpace = SRGBColorSpace;
    planeTexture.needsUpdate = true;
    planeTexture.wrapS = planeTexture.wrapT = RepeatWrapping;
    planeTexture.repeat.set(countRepeat, countRepeat);

    const geometry = new PlaneGeometry(xGeo, yGeo);

    // Dùng MeshStandardMaterial thay cho MeshBasicMaterial
    const material = new MeshBasicMaterial({
      map: planeTexture,
      side: DoubleSide,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: true, // cho nền cũng ghi vào depth buffer
    });

    const plane = new Mesh(geometry, material);
    plane.renderOrder = -1;
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(position.x, position.y, position.z);

    this.scene.add(plane);

    return plane;
  }

  ConvertImageToMaterial(nameImage) {
    const image = singletonMap.get(nameImage).texture.source?.resource;
    const tableTexture = new Texture(image);
    tableTexture.minFilter = LinearFilter;
    tableTexture.magFilter = LinearFilter;
    tableTexture.colorSpace = SRGBColorSpace;
    tableTexture.needsUpdate = true;
    tableTexture.wrapS = tableTexture.wrapT = RepeatWrapping;
    tableTexture.repeat.set(1, 1);
    const material = new MeshStandardMaterial({
      map: tableTexture,
      side: DoubleSide,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: true, // cho nền cũng ghi vào depth buffer
      metalness: 0.0, // thường background không phản chiếu kim loại
      roughness: 1.0, // bề mặt nhám, không bóng
    });
    return material;
  }
  getContext() {
    return this.renderer.getContext();
  }
  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    const ratio = window.innerWidth / window.innerHeight;
    if (ratio < 1) {
    }
    this.camera.updateProjectionMatrix();
  }
}
