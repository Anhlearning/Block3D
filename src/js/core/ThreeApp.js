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
  AmbientLight,
  // SphereGeometry,
  // AmbientLight,HemisphereLight,PCFSoftShadowMap,
} from "three";
import singletonMap from "../LoadManager";
import { TOUCHMANAGER } from "../Manager/TouchManager";
import { GAMEMANAGER } from "../Manager/GameManager";
import Stats from "three/examples/jsm/libs/stats.module.js";
import BlockGroup from "../Object/Block/BlockGroup";
import { Gate } from "../Object/Gate/Gate";
import GameConstant from "../Const/GameConstant";
import { createMaskMaterial } from "../Shader/MaskShader";

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
      55,
      window.innerWidth / window.innerHeight,
      0.3,
      100
    );

    this.currentFov = 55;
    this.camera.position.set(-0.5, 15, 5);
    this.camera.rotation.x = MathUtils.degToRad(-85);
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
    GAMEMANAGER.SetScene(this.scene, this.camera, this.renderer, this.physicsWorld);
    // if (CONFIG.onGameReady()) {
    // }
  }
  InitVariables() { }

  async awake() {
    this.InitVariables();
    TOUCHMANAGER.Init(this.scene, this.camera, this.renderer);
    this.setupEnvironment();
    this.setupMap();
    // const block = new BlockGroup({
    //   BlockName: "BLOCK_Z3x2D0",
    //   colorId: 1,
    //   scene: this.scene,
    //   camera: this.camera,
    //   renderer: this.renderer,
    //   physicsWorld: this.physicsWorld,
    // });
    // const block1 = new BlockGroup({
    //   BlockName: "BLOCK_Z3x2D0Reverse",
    //   colorId: 2,
    //   scene: this.scene,
    //   camera: this.camera,
    //   renderer: this.renderer,
    //   physicsWorld: this.physicsWorld,
    // });
    // const block2 = new BlockGroup({
    //   BlockName: "BLOCK_T3x2D180",
    //   colorId: 3,
    //   scene: this.scene,
    //   camera: this.camera,
    //   renderer: this.renderer,
    //   physicsWorld: this.physicsWorld,
    // });
    // const block3 = new BlockGroup({
    //   BlockName: "BLOCK_T3x2D270",
    //   colorId: 4,
    //   scene: this.scene,
    //   camera: this.camera,
    //   renderer: this.renderer,
    //   physicsWorld: this.physicsWorld,
    // });
    // const Gate1 = new Gate({
    //   colorId: 1,
    //   name: "GATE3",
    //   directionCheck: '-z',
    // })
    // const Gate2 = new Gate({
    //   colorId: 2,
    //   name: "GATE2",
    //   directionCheck: '-x',
    // })
    // const Gate3 = new Gate({
    //   colorId: 3,
    //   name: "GATE1",
    //   directionCheck: '+x',
    // })
    // Gate1.group.position.set(-2, 0.0, 4);
    // Gate2.group.position.set(-2, 0.0, 7);
    // Gate3.group.position.set(-2, 0.0, 0);
    // this.scene.add(Gate1.group);
    // this.scene.add(Gate2.group);
    // this.scene.add(Gate3.group);

    // block.group.position.set(0, 0, -2);
    // block1.group.position.set(1, 0, 1);
    // block2.group.position.set(1, 0, 4);
    // block3.group.position.set(1, 0, 8);
    // TOUCHMANAGER.addObject(block);
    // TOUCHMANAGER.addObject(block1);
    // TOUCHMANAGER.addObject(block2);
    // TOUCHMANAGER.addObject(block3);

    // GAMEMANAGER.addBlockObject(block.group);
    // GAMEMANAGER.addBlockObject(block1.group);
    // GAMEMANAGER.addBlockObject(block2.group);
    // GAMEMANAGER.addBlockObject(block3.group);
    // GAMEMANAGER.addObject(Gate1.group);
    // GAMEMANAGER.addObject(Gate2.group);
    // GAMEMANAGER.addObject(Gate3.group);

    // const cornerTopLeft = GameConstant.createPrefab("wall4");
    // const cornerTopRight = GameConstant.createPrefab("cornerTopRight");
    // cornerTopRight.position.set(2, 0, 0);
    // const cornerBotRight = GameConstant.createPrefab("cornerBotRight");
    // cornerBotRight.position.set(2, 0, 2);
    // const cornerBotLeft = GameConstant.createPrefab("cornerBotLeft");
    // cornerBotLeft.position.set(0, 0, 2);
    // this.scene.add(cornerTopLeft);
    // this.scene.add(cornerTopRight);
    // this.scene.add(cornerBotRight);
    // this.scene.add(cornerBotLeft);
  }
  setupMap() {
    GameConstant.CreateMap();
    GameConstant.createFloor();
    GameConstant.createBlock();
    this.spawnBG('bg', { x: 0, y: -0.04, z: 2 }, 40, 20);

    const maskGeo = new BoxGeometry(7, 3, 8);
    const maskMat = createMaskMaterial();
    const maskMesh = new Mesh(maskGeo, maskMat);
    maskMesh.position.set(-0.5, 0, -5.75);
    maskMesh.renderOrder = 2001;


    const maskGeo1 = new BoxGeometry(5.5, 3, 10);
    const maskMat1 = createMaskMaterial();
    const maskMesh1 = new Mesh(maskGeo1, maskMat1);
    maskMesh1.position.set(-6.5, 0, 3);
    maskMesh1.renderOrder = 2001;

    const maskGeo2 = new BoxGeometry(7, 3, 8);
    const maskMat2 = createMaskMaterial();
    const maskMesh2 = new Mesh(maskGeo2, maskMat2);
    maskMesh2.position.set(-0.5, 0, 11.75);
    maskMesh2.renderOrder = 2001;

    const maskGeo3 = new BoxGeometry(6, 3, 10);
    const maskMat3 = createMaskMaterial();
    const maskMesh3 = new Mesh(maskGeo3, maskMat3);
    maskMesh3.position.set(5.75, 0, 3);
    maskMesh3.renderOrder = 2001;

    this.scene.add(maskMesh);
    this.scene.add(maskMesh1);
    this.scene.add(maskMesh2);
    this.scene.add(maskMesh3);
  }
  setupEnvironment() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = SRGBColorSpace;
    // this.renderer.shadowMap.type = PCFSoftShadowMap;
    // this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);
    const sun = new DirectionalLight(0xffffff, 5);
    sun.position.set(10, 15, 0);
    sun.castShadow = true;
    sun.target.position.set(-10, 0, 0);
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
    const light = new AmbientLight(0xC6C6C6, 2);
    this.scene.add(light);
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
    const image = singletonMap.get(imageBgname).source?.resource;
    const planeTexture = new Texture(image);
    planeTexture.minFilter = LinearFilter;
    planeTexture.magFilter = LinearFilter;
    planeTexture.colorSpace = SRGBColorSpace;
    planeTexture.needsUpdate = true;
    planeTexture.wrapS = planeTexture.wrapT = RepeatWrapping;
    planeTexture.repeat.set(countRepeat, countRepeat);

    const geometry = new PlaneGeometry(xGeo, yGeo);

    const material = new MeshBasicMaterial({
      map: planeTexture,
      side: DoubleSide,
      transparent: false,
      alphaTest: 0.5,
      depthWrite: true,
      depthTest: true,
    });

    const plane = new Mesh(geometry, material);
    plane.renderOrder = 1;
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
