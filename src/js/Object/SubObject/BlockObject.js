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

    this._initDebugRays();
  }
  onClick(e) {
    if (!this.sphere || !this.sphere.material) return;
    const mat = this.sphere.material;
    mat.color.setHex(mat.color.getHex() === 0x00aaff ? 0xff5555 : 0x00aaff);
  }

  onDragStart(obj, e) {
    this.isDragging = true;
    this.dragOffset.set(0, 0, 0);
    this._setDebugRaysVisible(true);
  }

  onDragMove(obj, pos, e) {
    if (!this.isDragging) return;
    if (this.dragOffset.lengthSq() === 0) {
      this.dragOffset.copy(this.group.position).sub(pos);
    }
    const targetX = pos.x + this.dragOffset.x;
    const targetY = pos.y + this.dragOffset.y;
    this.group.position.set(targetX, targetY, this.group.position.z);

    this._updateDebugRays();
  }

  onDragEnd(obj, e) {
    this.isDragging = false;
    this.dragOffset.set(0, 0, 0);
    this._setDebugRaysVisible(false);
  }

  _initDebugRays() {
    const color = 0x00ff88;
    const mat = new LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.9,
    });
    const makeLine = () =>
      new Line(
        new BufferGeometry().setFromPoints([
          new Vector3(),
          new Vector3(1, 0, 0),
        ]),
        mat.clone()
      );
    this.rayLeft = makeLine();
    this.rayRight = makeLine();
    this.rayUp = makeLine();
    this.rayDown = makeLine();
    this._setDebugRaysVisible(false);
    this.group.add(this.rayLeft, this.rayRight, this.rayUp, this.rayDown);
  }

  _setDebugRaysVisible(v) {
    if (!this.rayLeft) return;
    this.rayLeft.visible = v;
    this.rayRight.visible = v;
    this.rayUp.visible = v;
    this.rayDown.visible = v;
  }

  _updateDebugRays() {
    const origin = this.group.position.clone();
    const z = origin.z;
    const maxDist = 3;
    const directions = {
      left: new Vector3(-1, 0, 0),
      right: new Vector3(1, 0, 0),
      up: new Vector3(0, 1, 0),
      down: new Vector3(0, -1, 0),
    };

    // Targets: all scene children except our own group
    const targets = this.scene.children.filter((n) => n !== this.group);

    const cast = (dir) => {
      const hits = RaycastUtils.raycastFromPoint(origin, dir, targets, maxDist);
      if (hits && hits.length > 0) {
        const p = hits[0].point.clone();
        p.z = z;
        return p;
      }
      const p = origin.clone().add(dir.clone().multiplyScalar(maxDist));
      p.z = z;
      return p;
    };

    const endLeft = cast(directions.left);
    const endRight = cast(directions.right);
    const endUp = cast(directions.up);
    const endDown = cast(directions.down);

    // Convert to local offsets so rays start at the object's center
    const offLeft = endLeft.clone().sub(origin);
    const offRight = endRight.clone().sub(origin);
    const offUp = endUp.clone().sub(origin);
    const offDown = endDown.clone().sub(origin);

    this._setLineLocal(this.rayLeft, offLeft);
    this._setLineLocal(this.rayRight, offRight);
    this._setLineLocal(this.rayUp, offUp);
    this._setLineLocal(this.rayDown, offDown);
  }

  _setLineLocal(line, offset) {
    if (!line) return;
    const geom = line.geometry;
    geom.setFromPoints([new Vector3(0, 0, 0), offset]);
    geom.attributes.position.needsUpdate = true;
  }
}

export default BlockObject;
