import { Group } from "three";

export default class GameManager {
  constructor() {
    this.delta = 0;
    this.Elements = new Group();
    this.Elements.scale.set(1, 1, 1);
    this.objects = [];
    this.BlockObjects = [];
  }
  SetScene(scene, camera, renderer, physicsWorld) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.physicsWorld = physicsWorld;
  }
  addObject(object) {
    this.objects.push(object);
  }
  addBlockObject(object) {
    this.addScene(object);
    this.BlockObjects.push(object);
  }
  addScene(object) {
    this.addObject(object);
    this.scene.add(object);
  }
}
export const GAMEMANAGER = new GameManager();
