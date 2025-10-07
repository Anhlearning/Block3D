import { PoolManager } from "./PoolManager.js";
import { ObjectPool } from "./ObjectPool.js";
import { MathUtils } from "three";

export default class CakePoolManager extends PoolManager {
  constructor() {
    super();

    this.piecePools = new Map(); // Map để lưu pool cho từng loại piece (theo index/type)

    this.piecePrefabs = [
      // ['cake128', 'skincake128', 'shadow'],
      // ['cake129', 'skincake129', 'shadow'],
      ["cake130", "skincake130", "shadow"],
      // ['cake131', 'skincake131', 'shadow'],
      ["cake132", "skincake132", "shadow"],
      ["cake133", "skincake133", "shadow"],
      ["cake134", "skincake134", "shadow"],
      // ['cake135', 'skincake135', 'shadow'],
      ["cake136", "skincake136", "shadow"],
    ];
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
    // this.cakePool = new ObjectPool(() => new CakeController(this.scene), 24);
    // this.initializePiecePools();
  }
  initializePiecePools() {
    for (let i = 0; i < 5; i++) {
      this.piecePools.set(
        i,
        new ObjectPool(() => this.createPieceController(i), 10)
      );
    }
  }
  createPieceController(type) {
    const [mesh, meshTexture, geometryTexture] = this.piecePrefabs[type];
    return new PieceController(type, mesh, meshTexture, geometryTexture);
  }

  spawnCakeSlot() {
    const cake = this.cakePool.acquire();
    if (cake) {
      // Reset trạng thái cake
      cake.isInCell = false;
      cake.isFinish = false;
      cake.clearCake();

      // Reset liên kết
      cake.up = null;
      cake.down = null;
      cake.left = null;
      cake.right = null;
      cake.parent = null;

      // Đảm bảo visible
      cake.cakeGroup.visible = true;
    }
    return cake;
  }

  despawnCakeSlot(cake) {
    if (!cake) return;

    // Clear tất cả pieces trong cake
    cake.clearCake();

    // Ẩn cake group
    cake.cakeGroup.visible = false;

    // Thu hồi về pool
    this.cakePool.release(cake);
  }

  spawnCake(index) {
    const pool = this.piecePools.get(index);
    if (!pool) {
      console.warn(`No pool found for piece index: ${index}`);
      return null;
    }

    const piece = pool.acquire();
    if (piece) {
      // Đảm bảo visible
      piece.Group3D.visible = true;
      piece.Group3D.active = true;
    }
    return piece;
  }

  despawnPiece(piece) {
    if (!piece) return;

    // Ẩn piece
    piece.Group3D.visible = false;
    piece.Group3D.active = false;

    // Thu hồi về pool tương ứng
    const pool = this.piecePools.get(piece.Type);
    if (pool) {
      pool.release(piece);
    } else {
      console.warn(`No pool found for piece type: ${piece.Type}`);
    }
  }
  spawnFullCake(index, layer = -1, isMask = false) {
    // Lấy CakeController từ pool
    const cake = this.spawnCakeSlot();
    if (!cake) {
      console.error("Failed to spawn cake slot");
      return null;
    }

    // Tạo 6 pieces cho cake
    const pieces = [];
    for (let i = 0; i < 6; i++) {
      const piece = this.spawnCake(index);
      if (piece) {
        // Thiết lập userData cho piece (nếu Mesh đã được tạo)
        if (piece.Mesh) {
          piece.Mesh.userData = {
            type: index,
            layer: layer,
            isMask: isMask,
          };
        }

        // Thêm piece vào cake
        cake.cakeGroup.add(piece.Group3D);
        piece.Group3D.rotation.z = MathUtils.degToRad(i * cake.AnglePerPiece);
        piece.Group3D.position.set(0, 0, 0);

        // Lưu vào cakePieces array (sử dụng Group3D thay vì Mesh)
        cake.cakePieces[i] = piece.Group3D;

        // Lưu vào dictCakeObject
        if (!cake.dictCakeObject[index]) {
          cake.dictCakeObject[index] = [];
        }
        cake.dictCakeObject[index].push(piece.Group3D);

        pieces.push(piece);
      }
    }

    // Nếu không tạo được đủ 6 pieces, thu hồi cake
    if (pieces.length !== 6) {
      console.error(
        `Failed to create full cake. Only ${pieces.length}/6 pieces created`
      );
      this.despawnCakeSlot(cake);
      // Thu hồi các pieces đã tạo
      pieces.forEach((piece) => this.despawnPiece(piece));
      return null;
    }

    return cake;
  }

  /**
   * Thu hồi toàn bộ cake và các pieces của nó
   * @param {CakeController} cake
   */
  despawnFullCake(cake) {
    if (!cake) return;

    // Thu hồi tất cả pieces trong cake
    for (let i = 0; i < cake.cakePieces.length; i++) {
      const pieceGroup = cake.cakePieces[i];
      if (pieceGroup) {
        // Tìm PieceController tương ứng
        const pieceController = this.findPieceControllerByGroup(pieceGroup);
        if (pieceController) {
          this.despawnPiece(pieceController);
        }
      }
    }

    // Thu hồi cake
    this.despawnCakeSlot(cake);
  }

  findPieceControllerByGroup(group) {
    // Tìm trong tất cả pools
    for (const [type, pool] of this.piecePools) {
      for (const piece of pool.pool) {
        if (piece.Group3D === group) {
          return piece;
        }
      }
    }
    return null;
  }

  getPoolStats() {
    const stats = {
      cakePool: {
        total: this.cakePool.pool.length,
        active: this.cakePool.pool.filter((cake) => cake.cakeGroup.visible)
          .length,
      },
      piecePools: {},
    };

    for (const [type, pool] of this.piecePools) {
      stats.piecePools[type] = {
        total: pool.pool.length,
        active: pool.pool.filter((piece) => piece.Group3D.visible).length,
      };
    }

    return stats;
  }

  resetAllPools() {
    // Reset cake pool
    this.cakePool.reset();

    // Reset piece pools
    for (const pool of this.piecePools.values()) {
      pool.reset();
    }
  }
}
export const cakePoolManager = new CakePoolManager();
