import { Box3, Vector3 } from "three";

export const ShapeType = Object.freeze({
  BOX: "box",
  SPHERE: "sphere",
  CYLINDER: "cylinder",
});

export class Collider {
  constructor({ shapeType = ShapeType.SPHERE, sizeOverride = null } = {}) {
    this.shapeType = shapeType;
    this.size = new Vector3();
    this.radius = 0;
    this.height = 0;
    this.offsetY = 0;
    this.shape = null;
    this.owner = null;
    this.sizeOverride = sizeOverride;
  }

  getType() {
    return "Collider";
  }

  onAttach(owner) {
    this.owner = owner;
    this.calculateSize(this.sizeOverride);
    this.createShape();
  }

  onUpdate() {}

  onDestroy() {
    this.owner = null;
    this.shape = null;
  }

  calculateSize(sizeOverride) {
    if (sizeOverride) {
      this.size.copy(sizeOverride);
    } else {
      const box = new Box3().setFromObject(this.owner.group);
      box.getSize(this.size);
    }
    this.radius = Math.max(this.size.x, this.size.y, this.size.z) / 2;
    this.height = this.size.y * 0.5;
  }

  createShape() {
    switch (this.shapeType) {
      case ShapeType.CYLINDER: {
        this.offsetY = this.height;
        this.shape = new CANNON.Cylinder(
          this.size.x * 0.5,
          this.size.x * 0.5,
          this.height * 2,
          12
        );
        break;
      }
      case ShapeType.BOX: {
        this.offsetY = this.size.y / 2;
        this.shape = new CANNON.Box(
          new CANNON.Vec3(this.size.x / 2, this.size.y / 2, this.size.z / 2)
        );
        break;
      }
      case ShapeType.SPHERE:
      default: {
        this.offsetY = this.height;
        this.shape = new CANNON.Sphere(this.radius);
        break;
      }
    }
  }

  getShape() {
    return this.shape;
  }
}

export default Collider;
