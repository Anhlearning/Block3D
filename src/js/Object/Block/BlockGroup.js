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
  Group,
  PlaneGeometry,
} from "three";
import { ObjectBase } from "../SuperObject/ObjectBase";
import Children from "../../components/Children";
import BlockMoveScript from "./BlockMoveScript";
import { BlockManagerPool } from "../../Pooling/BlockPoolManager";
import { BlockScript, LockState, MoveType } from "./BlockScript";
import GameConstant from "../../Const/GameConstant";
import { MaterialFactory } from "../../Factory/MaterialFactory";
import singletonMap from "../../LoadManager";

export class BlockGroup extends ObjectBase {
  constructor({ BlockName, colorId, MoveType, LockState, scene, camera, renderer, physicsWorld }) {
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
    this.isCollected = false
    // 🧠 Gán userData cho group gốc (rất quan trọng!)
    this.group.userData.blockGroup = this;
    this.group.userData.blockName = BlockName;
    this.group.userData.colorId = colorId;

    // Gắn các component logic
    this.addComponent(new BlockScript(colorId));
    this.addComponent(new BlockMoveScript());
    this.move = this.getComponent("BlockMoveScript");
    // Tạo block thật
    this.InitBlock(BlockName, colorId, MoveType, LockState);
  }

  InitBlock(key, colorId, movetype, lockState) {
    const detail = GameConstant.BLOCK_DETAIL[key];
    if (!detail) {
      console.warn(`⚠️ Không tìm thấy config cho key: ${key}`);
      return;
    }
    this.arrowZ = new Group();
    this.arrowZ.position.set(detail.arrowZ.x, detail.arrowZ.y, detail.arrowZ.z);
    this.arrowZ.rotation.y = MathUtils.degToRad(-90);
    this.arrowX = new Group();
    this.arrowX.position.set(detail.arrowX.x, detail.arrowX.y, detail.arrowX.z);
    this.sizeX = detail.size.x;
    this.sizeY = detail.size.y;
    const block = BlockManagerPool.acquire(detail.name || key.toLowerCase());
    this.blockMesh = block;
    block.scale.set(detail.scale.x, detail.scale.y, detail.scale.z);
    block.name = detail.name || key;
    const colorData = GameConstant.COLOR_DETAIL[colorId];
    const colorHex = colorData ? colorData.color : 0xffffff;

    // 🔸 Tạo material có texture và màu
    const mat = MaterialFactory.getLitMatBlock({
      baseKey: "baseMap",
      normalKey: "normalMap",
      metallicKey: "specularMap",
      color: colorHex,
      roughness: 1,
    });
    // const mat = MaterialFactory.getUnlitMat("specularMap");
    // let index = 0;
    block.traverse((child) => {
      if (child.isMesh) {
        child.userData.blockGroup = this;
        child.userData.isCollider = true;
        child.material = mat;
        child.material.needsUpdate = true;
        child.material.depthWrite = true;
        child.material.depthTest = true;
        child.renderOrder = 2075; // sau mask
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
    block.userData.isCollider = true;
    // 🔸 Tạo collider
    if (Array.isArray(detail.colliders)) {
      const baseColors = [0xff6600, 0x00ffaa, 0x3366ff];
      detail.colliders.forEach((col, i) => {
        const geo = new BoxGeometry(col.size.x, col.size.y, col.size.z);
        const mat = MaterialFactory.getUnlitMat("base");
        const mesh = new Mesh(geo, mat);
        mesh.material.visible = false;
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
    if (movetype != "Free") {
      switch (movetype) {
        case "Horizontal":
          this.CreteArrowmesh(this.sizeX, MoveType.Horizontal);
          this.getComponent("BlockScript").setMoveType(MoveType.Horizontal);
          break;
        case "Vertical":
          this.CreteArrowmesh(this.sizeY, MoveType.Vertical);
          this.getComponent("BlockScript").setMoveType(MoveType.Vertical);
          break;
        default:
          break;
      }
    }
    if (lockState == LockState.Locked) {
      this.getComponent("BlockScript").setLockState(LockState.Locked);
    }
    // 🔸 Gắn block vào group
    this.addComponent(new Children({ child: block }));
    this.group.add(this.arrowX);
    this.group.add(this.arrowZ);
    // // Pivot gizmo để debug
    // const circleGeo = new CircleGeometry(0.1, 32);
    // const circleMat = new MeshBasicMaterial({
    //   color: 0xff0000,
    //   wireframe: false,
    //   transparent: true,
    //   opacity: 0.8,
    // });
    // const circleMesh = new Mesh(circleGeo, circleMat);
    // circleMesh.rotation.x = -Math.PI / 2;
    // circleMesh.position.set(0, 0, 0);

    // this.group.add(circleMesh);
  }
  CreteArrowmesh(size, direction) {
    const newGr = new Group();
    const stringTexture = "arrow" + size;
    const img = singletonMap.get(stringTexture).source?.resource;
    const aspect = img.width / img.height;
    let height = size * 0.8;
    if (size == 1) height *= 0.9;
    const width = aspect * height;
    const arrowGeo = new PlaneGeometry(width, height);

    const arrowMat = MaterialFactory.getUnlitMat(stringTexture);
    const arrowMesh = new Mesh(arrowGeo, arrowMat);
    arrowMesh.rotation.x = -Math.PI / 2;
    arrowMesh.rotation.z = -Math.PI / 2;
    if (size == 1) {
      arrowMesh.position.set(0.372, 1.025, 0)
    }
    else if (size == 2) {
      arrowMesh.position.set(1.05, 1.025, 0.5)
    }
    else if (size == 3) {
      arrowMesh.position.set(1.55, 1.025, 0.5)
    }
    else if (size == 4) {
      arrowMesh.position.set(2.05, 1.025, 0.5)
    }
    newGr.add(arrowMesh);
    if (direction == MoveType.Horizontal) {
      this.arrowX.add(newGr);
    }
    else {
      this.arrowZ.add(newGr);
    }
  }
  // Dùng trong Gate
  GetSize(dir) {
    const up = new Vector3(0, 0, 1);
    const down = new Vector3(0, 0, -1);

    const angleToUp = dir.angleTo(up) * MathUtils.RAD2DEG;
    const angleToDown = dir.angleTo(down) * MathUtils.RAD2DEG;

    if (angleToUp < 15 || angleToDown < 15) {
      return this.sizeX;
    }
    return this.sizeY;
  }

  update(pos) {
    this.onDragMove(pos);
  }

  onDragStart(obj, e, hit) {
    const move = this.getComponent("BlockMoveScript");
    const blockType = this.getComponent("BlockScript");
    if (!blockType.canMove()) return;
    move?.onDragStart?.(obj, e, hit);
  }

  onDragMove(pos) {
    this.move?.onDragMove?.(pos);
  }

  onDragEnd(obj, e) {
    const move = this.getComponent("BlockMoveScript");
    move?.onDragEnd?.(obj, e);
  }
  ActiveOutlineMesh(value) {
    this.blockMesh.traverse((child) => {
      if (child.isMesh) {
        child.applyOutline = value;
      }
    })
  }
}

export default BlockGroup;
