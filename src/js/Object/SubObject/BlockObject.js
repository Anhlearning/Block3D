import { Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from "three";
import { ObjectBase } from "../SuperObject/ObjectBase";
import Children from "../../components/Children";

export class BlockObject extends ObjectBase {
  constructor({ scene, camera, renderer, physicsWorld }) {
    super({
      scene,
      camera,
      renderer,
      physicsWorld,
      position: new Vector3(0, 0, 0),
    });

    const geometry = new SphereGeometry(0.5, 16, 16);
    const material = new MeshBasicMaterial({ color: 0x00aaff });
    const sphere = new Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    sphere.scale.set(4, 4, 4);
    this.sphere = sphere;
    this.addComponent(new Children({ child: sphere }));

    this.isDragging = false;
    this.dragOffset = new Vector3(0, 0, 0);
  }
  onClick(e) {
    if (!this.sphere || !this.sphere.material) return;
    const mat = this.sphere.material;
    mat.color.setHex(mat.color.getHex() === 0x00aaff ? 0xff5555 : 0x00aaff);
  }

  onDragStart(obj, e) {
    this.isDragging = true;
    this.dragOffset.set(0, 0, 0);
  }

  onDragMove(obj, pos, e) {
    if (!this.isDragging) return;
    if (this.dragOffset.lengthSq() === 0) {
      this.dragOffset.copy(this.group.position).sub(pos);
      ms;
    }
    const targetX = pos.x + this.dragOffset.x;
    const targetY = pos.y + this.dragOffset.y;
    this.group.position.set(targetX, targetY, this.group.position.z);
  }

  onDragEnd(obj, e) {
    this.isDragging = false;
    this.dragOffset.set(0, 0, 0);
  }
}

export default BlockObject;
