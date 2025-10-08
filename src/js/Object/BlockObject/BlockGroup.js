import {
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
  Line,
  LineBasicMaterial,
  BufferGeometry,
} from "three";
import { ObjectBase } from "../SuperObject/ObjectBase";
import Children from "../../components/Children";
import { RaycastUtils } from "../../Utils/RaycastUtils";
import BlockMoveScript from "./BlockMoveScript";

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
    this.addComponent(new BlockMoveScript());
  }
  onClick(e, pos) {
   
  }

  onDragStart(obj, e) {
    const move = this.getComponent("BlockMoveScript");
    move?.onDragStart?.(obj, e);
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
