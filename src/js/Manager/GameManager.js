import { Group } from "three";

export default class GameManager {
  constructor() {
    this.delta = 0;
    this.Elements = new Group();
    this.Elements.scale.set(1, 1, 1);
  }
}
export const GAMEMANAGER = new GameManager();
