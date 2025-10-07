export class RigidBody {
  constructor({ mass = 1, group = null, mask = null, position = null } = {}) {
    this.mass = mass;
    this.body = null;
    this.group = group;
    this.mask = mask;
    this.position = position;
    this.owner = null;
  }

  getType() {
    return "RigidBody";
  }

  onAttach(owner) {
    this.owner = owner;
    const physicsWorld = owner.physicsWorld;
    if (!physicsWorld)
      throw new Error("physicsWorld is required for RigidBody");
    const colliderShape = owner.getComponent("Collider")?.getShape();
    if (!colliderShape) throw new Error("RigidBody requires a Collider shape");
    this.createBody(physicsWorld, colliderShape);
  }

  onUpdate() {
    if (!this.body) return;
    this.owner.group.position.copy(this.body.position);
    this.owner.group.quaternion.copy(this.body.quaternion);
  }

  onDestroy() {
    if (this.body && this.owner?.physicsWorld) {
      this.owner.physicsWorld.removeBody(this.body);
    }
    this.body = null;
    this.owner = null;
  }

  createBody(physicsWorld, shape) {
    const startPos = this.position ?? this.owner.group.position;
    this.body = new CANNON.Body({
      mass: this.mass,
      shape,
      position: new CANNON.Vec3(startPos.x, startPos.y, startPos.z),
    });
    if (this.group != null || this.mask != null) {
      this.body.collisionFilterGroup = this.group ?? 1;
      this.body.collisionFilterMask = this.mask ?? -1;
    }
    physicsWorld.addBody(this.body);
    this.owner.group.userData.physicsBody = this.body;
  }
}

export default RigidBody;
