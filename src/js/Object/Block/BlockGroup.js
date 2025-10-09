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

export class BlockGroup extends ObjectBase {
  constructor({ scene, camera, renderer, physicsWorld }) {
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
    this.InitBlock();

    console.log(this.group);
  }
  InitBlock() {
    let block_L = BlockManagerPool.acquire('block_L');
    block_L.name = "BLOCK L";
    block_L.rotation.y = MathUtils.degToRad(90);
    block_L.position.set(-1.5, 0, -2.5);
    //#region  child BoxCollider 
    const positions = [
      new Vector3(-1, 0, 1),
      new Vector3(-1, 0, 3),
      new Vector3(-3, 0, 1)
    ];
    // Thông số hình dạng
    const size = new Vector3(0.02, 0.02, 0.02);
    const scale = new Vector3(100, 100, 100);
    const center = new Vector3(0, 0.1, 0);

    // ✅ Mỗi collider có tông màu khác nhau
    const colliderBaseColors = [0xff6600, 0x00ffaa, 0x3366ff]; // cam, xanh ngọc, xanh lam

    const baseLength = 0.05;

    // const directions = {
    //   // thẳng
    //   right: new Vector3(1, 0, 0),
    //   left: new Vector3(-1, 0, 0),
    //   forward: new Vector3(0, 0, 1),
    //   back: new Vector3(0, 0, -1),
    //   // chéo
    //   frontRight: new Vector3(1, 0, 1).normalize(),
    //   frontLeft: new Vector3(-1, 0, 1).normalize(),
    //   backRight: new Vector3(1, 0, -1).normalize(),
    //   backLeft: new Vector3(-1, 0, -1).normalize(),
    // };

    // ✅ Vẽ từng collider khác màu
    for (let i = 0; i < positions.length; i++) {
      const baseColor = colliderBaseColors[i % colliderBaseColors.length];

      const debugMat = new MeshBasicMaterial({
        color: baseColor,
        wireframe: true,

        transparent: true,
        opacity: 0.6,
      });

      const geo = new BoxGeometry(size.x, size.y, size.z);
      const mesh = new Mesh(geo, debugMat.clone());
      mesh.name = `Collider_${i + 1}`;
      block_L.add(mesh);

      mesh.position.copy(positions[i]).add(center);
      mesh.scale.copy(scale);

      // // ✅ tạo 8 tia ray cố định
      // mesh.userData.rays = {};
      // for (const [key, dir] of Object.entries(directions)) {
      //   const start = new Vector3(0, 0, 0);
      //   const end = dir.clone().multiplyScalar(baseLength);

      //   // 💡 Tạo màu ray bằng cách pha tông chính với hướng
      //   const hueShift = (i * 0.2 + Math.random() * 0.05) % 1;
      //   const color = new Color(baseColor).offsetHSL(hueShift, 0.2, 0);

      //   const lineGeo = new BufferGeometry().setFromPoints([start, end]);
      //   const lineMat = new LineBasicMaterial({
      //     color: color,
      //     transparent: true,
      //     opacity: 0.9,
      //   });

      //   const line = new Line(lineGeo, lineMat);
      //   line.name = `Ray_${key}`;
      //   mesh.add(line);

      //   mesh.userData.rays[key] = line;
      // }
    }
    //#endregion

    this.addComponent(new Children({
      child: block_L
    }))
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
