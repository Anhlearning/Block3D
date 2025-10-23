import { Group } from "three";
import { TOUCHMANAGER } from "./TouchManager";

export default class GameManager {
  constructor() {
    this.delta = 0;
    this.Elements = new Group();
    this.Elements.scale.set(1, 1, 1);
    this.objects = [];
    this.MeshObjets = [];
    this.BlockObjects = [];
    this.GateObjects = [];
    this.Maps = new Group();
    this.Blocks = new Group();
    this.Floors = new Group();
  }
  SetScene(scene, camera, renderer, physicsWorld) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.physicsWorld = physicsWorld;
    scene.add(this.Maps);
    scene.add(this.Blocks);
    scene.add(this.Floors);
  }
  addObject(object, type = "") {
    this.objects.push(object);
    switch (type) {
      case "Map":
        this.Maps.add(object);
        this.addMesh(object);
        break;
      case "Gate":
        this.GateObjects.push(object);
        this.Maps.add(object);
        this.addMesh(object);
        break;
      case "Block":
        this.BlockObjects.push(object.group);
        this.Blocks.add(object.group);
        TOUCHMANAGER.addObject(object);
        this.addMesh(object);
        break;
      case "Geo":
        this.scene.add(object);
        break;
      default:
        break;
    }
  }
  addMesh(object) {
    const root = object.group instanceof Group ? object.group : object;
    root.traverse(child => {
      if (child.isMesh && child.userData.isCollider) {
        this.MeshObjets.push(child);
        if (child.geometry && !child.geometry.boundsTree) {
          child.geometry.computeBoundsTree();
        }
      }
    });
  }
}
export const GAMEMANAGER = new GameManager();
