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
import { MaterialFactory } from "../../Factory/MaterialFactory";

export class BlockGroup extends ObjectBase {
  constructor({ BlockName, colorId, scene, camera, renderer, physicsWorld }) {
    super({
      scene,
      camera,
      renderer,
      physicsWorld,
      position: new Vector3(0, 0, 0),
    });

    this.isDragging = false;
    this.dragOffset = new Vector3(0, 0, 0);
    this.colorId = colorId;
    this.BlockName = BlockName;

    // 🧠 Gán userData cho group gốc (rất quan trọng!)
    this.group.userData.blockGroup = this;
    this.group.userData.blockName = BlockName;
    this.group.userData.colorId = colorId;

    // Gắn các component logic
    this.addComponent(new BlockScript(colorId));
    this.addComponent(new BlockMoveScript());

    // Tạo block thật
    this.InitBlock(BlockName, colorId);
  }

  InitBlock(key, colorId) {
    const detail = GameConstant.BLOCK_DETAIL[key];
    if (!detail) {
      console.warn(`⚠️ Không tìm thấy config cho key: ${key}`);
      return;
    }

    this.sizeX = detail.size.x;
    this.sizeY = detail.size.y;

    const block = BlockManagerPool.acquire(detail.name || key.toLowerCase());
    block.scale.set(detail.scale.x, detail.scale.y, detail.scale.z);
    block.name = detail.name || key;
    const colorData = GameConstant.COLOR_DETAIL[colorId];
    const colorHex = colorData ? colorData.color : 0xffffff;

    // 🔸 Tạo material có texture và màu
    const mat = MaterialFactory.getLitMat({
      baseMap: "baseMap",
      normalMap: "normalMap",
      metallicMap: "specularMap",
      color: colorHex,
      roughness: 0.1,
    });
    // const mat =MaterialFactory.getUnlitMat("baseMap");
    block.traverse((child) => {
      if (child.isMesh) {
        child.material = mat;
        child.material.needsUpdate = true;
      }
    });

    block.rotation.set(
      MathUtils.degToRad(detail.rotation.x || 0),
      MathUtils.degToRad(detail.rotation.y || 0),
      MathUtils.degToRad(detail.rotation.z || 0)
    );

    if (detail.position)
      block.position.set(detail.position.x, detail.position.y, detail.position.z);

    // 🧩 Gán userData cho block chính
    block.userData.blockGroup = this;
    block.userData.blockName = key;
    block.userData.colorId = this.colorId;
    block.userData.isMainBlock = true;

    // 🔸 Tạo collider
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

        // ✅ Gán userData cho từng collider
        mesh.userData.blockGroup = this;
        mesh.userData.isCollider = true;
        mesh.userData.colorId = this.colorId;
        mesh.userData.blockName = key;

        // Thiết lập vị trí / scale
        const pos = new Vector3(col.position.x, col.position.y, col.position.z);
        const center = new Vector3(col.center.x, col.center.y, col.center.z);
        mesh.position.copy(pos.add(center));
        mesh.scale.set(col.scale.x, col.scale.y, col.scale.z);

        block.add(mesh);
      });
    }

    // 🔸 Gắn block vào group
    this.addComponent(new Children({ child: block }));

    // Pivot gizmo để debug
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

  // Dùng trong Gate
  GetSize(dir) {
    const up = new Vector3(0, 1, 0);
    const down = new Vector3(0, -1, 0);

    const angleToUp = dir.angleTo(up) * MathUtils.RAD2DEG;
    const angleToDown = dir.angleTo(down) * MathUtils.RAD2DEG;


    if (angleToUp < 15 || angleToDown < 15) {
      return this.sizeY;
    }

    return this.sizeX;
  }

  onClick(e, pos) { }

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
