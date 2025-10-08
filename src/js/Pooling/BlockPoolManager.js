import { PoolManager } from "./PoolManager.js";
import { ObjectPool } from "./ObjectPool.js";
import { MathUtils } from "three";

export default class BlockPoolManager extends PoolManager {
  constructor() {
    super();

    this.piecePools = new Map(); 
  }
  Init(scene, camera = null, renderer = null) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }
  /**
   * Khởi tạo pools cho các loại piece
   */
  async RegisterModels() {
    await super.RegisterModels();

  }

  spawnCakeSlot() {
   
  }

  despawnCakeSlot(cake) {
    
  }


}
export const BlockManagerPool = new BlockPoolManager();
