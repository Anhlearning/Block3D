import { Vector3, Raycaster, Vector2, Group } from "three";

export class ObjectBase {
  constructor({
    object3D,
    name = "Object",
    scene,
    camera,
    renderer,
    physicsWorld = null,
    draggable = true,
    clickable = true,
    position = new Vector3(0, 0, 0),
  }) {
    this.group = object3D ?? new Group();
    this.group.name = name;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.physicsWorld = physicsWorld;

    this.isDraggable = draggable;
    this.isClickable = clickable;

    this.position = position;

    this.components = new Map();

    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.dragging = null;
    this.prepareObject();
  }

  prepareObject() {
    this.group.position.copy(this.position);
    this.scene.add(this.group);
  }

  addComponent(component) {
    if (!component || typeof component.onAttach !== "function") {
      throw new Error("Component must implement onAttach(owner)");
    }

    const type = component.getType?.() ?? component.constructor.name;
    // 🔹 Nếu đã có component cùng loại, lưu thành mảng
    if (!this.components.has(type)) {
      this.components.set(type, []);
    }

    const list = this.components.get(type);
    list.push(component);

    component.onAttach(this);
    return component;
  }

  getComponent(type, index = 0) {
    const list = this.components.get(type);
    if (!list) return null;
    return list[index] ?? null;
  }

  getComponents(type) {
    return this.components.get(type) ?? [];
  }

  removeComponent(type, component = null) {
    const list = this.components.get(type);
    if (!list) return;

    if (component) {
      const idx = list.indexOf(component);
      if (idx !== -1) {
        list[idx].onDestroy?.();
        list.splice(idx, 1);
      }
    } else {
      // xóa toàn bộ loại đó
      for (const comp of list) comp.onDestroy?.();
      this.components.delete(type);
    }

    // Nếu list rỗng thì xoá luôn key
    if (list.length === 0) this.components.delete(type);
  }

  syncPhysics() {
    const rb = this.getComponent("RigidBody");
    rb?.onUpdate?.();
  }

  onClick(e) {
    // mặc định: không làm gì
  }

  onDragStart(obj, e) {
    // mặc định: không làm gì
  }

  onDragMove(obj, pos, e) {
    // mặc định: không làm gì
  }

  onDragEnd(obj, e) {
    // mặc định: không làm gì
  }
}
