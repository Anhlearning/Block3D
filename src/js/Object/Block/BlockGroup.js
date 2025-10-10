import {
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
  Line,
  LineBasicMaterial,
  BufferGeometry,
  BoxGeometry,
  CircleGeometry,
  Color,
  MathUtils,
} from "three";
import { ObjectBase } from "../SuperObject/ObjectBase";
import Children from "../../components/Children";
import BlockMoveScript from "./BlockMoveScript";
import { BlockManagerPool } from "../../Pooling/BlockPoolManager";
import { BlockScript } from "./BlockScript";
import GameConstant from "../../Const/GameConstant";

export class BlockGroup extends ObjectBase {
  constructor({ BlockName, scene, camera, renderer, physicsWorld }) {
    super({
      scene,
      camera,
      renderer,
      physicsWorld,
      position: new Vector3(0, 0, 0),
    });
    this.isDragging = false;
    this.dragOffset = new Vector3(0, 0, 0);
    this.addComponent(new BlockScript());
    this.addComponent(new BlockMoveScript());
    this.InitBlock(BlockName);
  }
  InitBlock(key) {
    const detail = GameConstant.BLOCK_DETAIL[key];
    this.sizeX = detail.size.x;
    this.sizeY = detail.size.y;
    if (!detail) {
      console.warn(`⚠️ Không tìm thấy config cho key: ${key}`);
      return;
    }
    const block = BlockManagerPool.acquire(detail.name || key.toLowerCase());
    block.name = detail.name || key;

    block.rotation.set(
      MathUtils.degToRad(detail.rotation.x || 0),
      MathUtils.degToRad(detail.rotation.y || 0),
      MathUtils.degToRad(detail.rotation.z || 0)
    );

    if (detail.position)
      block.position.set(detail.position.x, detail.position.y, detail.position.z);

    // 🔸 3. Tạo collider theo thông số trong config
    if (Array.isArray(detail.colliders)) {
      const baseColors = [0xff6600, 0x00ffaa, 0x3366ff];
      detail.colliders.forEach((col, i) => {
        const geo = new BoxGeometry(col.size.x, col.size.y, col.size.z);
        const mat = new MeshBasicMaterial({
          color: baseColors[i % baseColors.length],
          wireframe: true,
          transparent: true,
          opacity: 0.6,
        });
        const mesh = new Mesh(geo, mat);
        mesh.name = col.name || `Collider_${i + 1}`;
        block.add(mesh);

        const pos = new Vector3(col.position.x, col.position.y, col.position.z);
        const center = new Vector3(col.center.x, col.center.y, col.center.z);
        mesh.position.copy(pos.add(center));

        mesh.scale.set(col.scale.x, col.scale.y, col.scale.z);
      });
    }

    // 🔸 4. Gắn block vào đối tượng hiện tại
    this.addComponent(new Children({ child: block }));
    //Pivot
    const circleGeo = new CircleGeometry(0.1, 32);
    const circleMat = new MeshBasicMaterial({
      color: 0xff0000,
      wireframe: false,
      transparent: true,
      opacity: 0.8,
    });
    const circleMesh = new Mesh(circleGeo, circleMat);
    circleMesh.rotation.x = -Math.PI / 2;
    circleMesh.position.set(0, 0, 0);

    this.group.add(circleMesh);
  }
  GetSize(dir) {
    const up = new Vector3(0, 1, 0);
    const down = new Vector3(0, -1, 0);

    // Tính góc giữa vector dir và up/down
    const angleToUp = dir.angleTo(up) * MathUtils.RAD2DEG;
    const angleToDown = dir.angleTo(down) * MathUtils.RAD2DEG;

    if (angleToUp < 15 || angleToDown < 15) {
      return this._size.y;
    }

    return this._size.x;
  }
  onClick(e, pos) {

  }

  onDragStart(obj, e, hit) {
    const move = this.getComponent("BlockMoveScript");
    move?.onDragStart?.(obj, e, hit);
  }

  onDragMove(obj, pos, e) {
    const move = this.getComponent("BlockMoveScript");
    move?.onDragMove?.(obj, pos, e);
  }

  onDragEnd(obj, e) {
    const move = this.getComponent("BlockMoveScript");
    move?.onDragEnd?.(obj, e);
  }
}

export default BlockGroup;
