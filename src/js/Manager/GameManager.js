import { Group } from "three";

export default class GameManager {
  constructor() {
    this.delta = 0;
    this.Elements = new Group();
    this.Elements.scale.set(1, 1, 1);
    this.objects = [];
  }
  SetScene(scene) {
    this.scene = scene;
  }
  addObject(object) {
    this.objects.push(object);
  }
}
export const GAMEMANAGER = new GameManager();
