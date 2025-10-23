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
  WebGLRenderTarget,
  Vector2,
  MeshLambertMaterial,
  BufferGeometry
  // SphereGeometry,
  // AmbientLight,HemisphereLight,PCFSoftShadowMap,
} from "three";
import singletonMap from "../LoadManager";
import { TOUCHMANAGER } from "../Manager/TouchManager";
import { GAMEMANAGER } from "../Manager/GameManager";
import Stats from "three/examples/jsm/libs/stats.module.js";
import GameConstant from "../Const/GameConstant";
import { CustomOutlinePass } from "../Shader/CustomOutlinePass";
import { EffectComposer, FXAAShader, OutputPass, RenderPass, ShaderPass } from "three/examples/jsm/Addons.js";
import ParticelSystem from "three-nebula"
import CubeEmitterManager, { CUBE_POOL, cubeEmitter } from "../VFX/SpawnFx";
import { MeshRenderer } from "three-nebula";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
const THREE_NAMESPACE = {
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
  WebGLRenderTarget,
  Vector2,
  MeshLambertMaterial,
};
Mesh.prototype.raycast = acceleratedRaycast;
BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
export default class ThreeApp {
  constructor(container = document.body) {
    this.container = container;
    this.renderer = new WebGLRenderer({ antialias: true, stencil: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xCDB79E, 1);
    this.container.appendChild(this.renderer.domElement);
    this.scene = new Scene();
    this.clock = new Clock();
    this.currentFov = 60;
    this.camera = new PerspectiveCamera(
      this.currentFov,
      window.innerWidth / window.innerHeight,
      0.3,
      100
    );
    this.originalCameraPosition = new Vector3(-0.5, 16, 5)
    // this.camera.position.copy(this.originalCameraPosition);
    this.camera.rotation.x = MathUtils.degToRad(-85);
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
    GAMEMANAGER.SetScene(this.scene, this.camera, this.renderer, this.physicsWorld);

    const meshRenderer = new MeshRenderer(this.scene, THREE_NAMESPACE);
    this.particleSystem = new ParticelSystem();
    this.particleSystem.addRenderer(meshRenderer);
    CubeEmitterManager.getInstance(this.particleSystem, this.scene);
    //#region  OUTLINE SHADER
    this.renderTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    this.composer = new EffectComposer(this.renderer, this.renderTarget);
    this.pass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.pass);

    this.customOutline = new CustomOutlinePass(
      new Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera
    );
    this.composer.addPass(this.customOutline);

    this.effectFXAA = new ShaderPass(FXAAShader);
    this.effectFXAA.uniforms['resolution'].value.set(
      1 / (window.innerWidth * window.devicePixelRatio),
      1 / (window.innerHeight * window.devicePixelRatio)
    );
    this.composer.addPass(this.effectFXAA);

    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);
    //#endregion
  }
  InitVariables() { }

  async awake() {
    // this.InitVariables();
    TOUCHMANAGER.Init(this.scene, this.camera, this.renderer);
    this.setupEnvironment();
    this.setupMap();
  }
  setupMap() {
    this.spawnBG('bg', { x: 0, y: -0.04, z: 3 }, 50, 40);
    GameConstant.CreateMap();
    GameConstant.createFloor();
    GameConstant.createBlock();
    GameConstant.createCubeMask();


  }
  setupEnvironment() {
    // this.renderer.shadowMap.type = PCFSoftShadowMap;
    // this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);
    const sun = new DirectionalLight(0xffffff, 3);
    sun.position.set(0, 10, 0); 
    const targetPosition = new Vector3(5,-1,1);
    console.log(targetPosition);
    
    sun.target.position.copy(targetPosition);
    // sun.castShadow = true;
    this.scene.add(sun);
    this.scene.add(sun.target);
    // sun.shadow.mapSize.width = 2048;
    // sun.shadow.mapSize.height = 2048;
    // sun.shadow.camera.left = -10;
    // sun.shadow.camera.right = 10;
    // sun.shadow.camera.top = 10;
    // sun.shadow.camera.bottom = -10;
    // sun.shadow.normalBias = 0.2;
    // const hemi = new HemisphereLight(0xffffff, 0x888888, 2.0);
    // this.scene.add(hemi);
    const light = new AmbientLight(0xC6C6C6, 2);
    this.scene.add(light);
  }
  update() {
    const delta = this.clock.getDelta();
    this.renderer.resetState();
    this.stats.update();
    GAMEMANAGER.delta = delta;
    TOUCHMANAGER.update();
    this.composer.render();
    this.particleSystem.update(delta);
    // this.renderer.render(this.scene, this.camera);
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
  getContext() {
    return this.renderer.getContext();
  }
  getAspectRatio() {
    const r = this.camera.aspect; // width / height
    const ratio = Math.floor(r * 100);

    if (ratio >= 80) return "4:5";
    if (ratio >= 75) return "3:4";
    if (ratio >= 67) return "2:3";
    if (ratio >= 62) return "10:16";
    if (ratio >= 56) return "9:16";
    if (ratio >= 50) return "9:18";
    if (ratio >= 44) return "9:20";
    if (ratio >= 42) return "9:21";
    if (ratio >= 40) return "9:22";
    if (ratio >= 39) return "9:23";
    return "";
  }
  setCamera(x, y) {
    const v = new Vector3().copy(this.originalCameraPosition);
    v.x = (x - 6) / 2 - 0.5;
    v.y = (y - 3) / 2 + 13.5;
    if (v.y - v.x <= 16.5) {
      const tmp = y - x;
      v.y += (3 - tmp);
    }
    const aspectType = this.getAspectRatio();
    if (aspectType === "9:22") {
      v.y += (x - 6);
      v.z += (y - 9) * 0.5;
    } else if (aspectType === "9:21") {
      v.y += (x - 6);
      v.z += (y - 9) * 0.5;
    } else if (aspectType === "9:20") {
      v.y += (x - 6);
      v.z += (y - 9) * 0.5;
    } else if (aspectType === "9:23") {
      v.y += (x - 6) * 1.5 + 1.5;
      v.z += (y - 9) * 1.5;
    }
    else {
      v.z = Math.max(4.5, (y - 8) / 2 + 4.5);
    }
    this.camera.position.copy(v);
  }
  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.composer.setSize(window.innerWidth, window.innerHeight);
    this.customOutline.setSize(window.innerWidth, window.innerHeight);
    this.effectFXAA.uniforms["resolution"].value.set(
      1 / (window.innerWidth * window.devicePixelRatio),
      1 / (window.innerHeight * window.devicePixelRatio)
    );
    const ratio = window.innerWidth / window.innerHeight;
    if (ratio < 1) {
    }
    this.camera.updateProjectionMatrix();
    const mapX = GameConstant.mapX;
    const mapY = GameConstant.mapY;
    this.lastMapSize = { x: mapX, y: mapY };
    this.setCamera(mapX, mapY);
  }
}
