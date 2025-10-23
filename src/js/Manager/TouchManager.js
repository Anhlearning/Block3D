import { RaycastUtils } from "../Utils/RaycastUtils";
import { GAMEMANAGER } from "./GameManager";

export class TouchManager {
  constructor() {
    this.isClickInProgress = false; // Kiểm tra xem có nhấp chuột nào đang diễn ra không
  }

  Init(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.objects = []; // danh sách ObjectBase
    this.utils = new RaycastUtils(camera, renderer);
    this.dragging = null;
    window.addEventListener("pointerdown", this._onPointerDown.bind(this));
    window.addEventListener("pointermove", this._onPointerMove.bind(this));
    window.addEventListener("pointerup", this._onPointerUp.bind(this));
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  removeObject(obj) {
    this.objects = this.objects.filter((o) => o !== obj);
  }
  update() {
    // if (!this.dragging || !this._lastPointerEvent) return;
  }
  // ================== Event ==================
  _onPointerDown(e) {
    this.isClickInProgress = true; // Đặt cờ rằng nhấp chuột đang diễn ra
    const hit = this.utils.getFirstHit(
      e,
      this.objects.map((o) => o.group)
    );
    const obj = this.objects.find((o) => {
      if (o.group === hit?.object) return true;

      if (hit?.object && o.group) {
        if (o.group.children.includes(hit.object)) return true;

        let found = false;
        o.group.traverse((child) => {
          if (child === hit.object) found = true;
        });
        return found;
      }
      return false;
    });

    if (obj) {
      if (obj.isClickable && obj.onClick) {
        const pos = this.utils.getWorldPosition(e, obj.group.position, "y");
        obj.onClick(e, pos);
      }
      if (obj.isDraggable) {
        this.dragging = obj;
        if (obj.onDragStart) {
          const mousePosition = this.utils.getMouse(e).clone();
          const worldPosition = obj.group.position.clone();
          const screenPos = this.utils.worldToScreen(worldPosition);
          const mouseOffset = mousePosition.clone().sub(screenPos);
          this.mouseOffset = mouseOffset;

          const blockMoveScript = obj.getComponent("BlockMoveScript");
          blockMoveScript.UpdateMousePosition(mouseOffset);
        };
      }
    }
  }

  _onPointerMove(e) {
    if (
      this.dragging &&
      this.dragging.isDraggable &&
      this.dragging.onDragMove
    ) {
      this._lastPointerEvent = e;
      const MousePosition = this.utils.getMouse(this._lastPointerEvent).clone();
      // dùng clone() để tính toán offset mà không ảnh hưởng biến gốc
      const mouseOffset = MousePosition.clone().sub(this.mouseOffset);

      const newPos = this.utils.screenToWorld({
        x: mouseOffset.x,
        y: MousePosition.y,
        planeHeight: 0, // mặt phẳng y = 0
      });
      this.dragging.onDragMove(newPos);
    }
  }

  _onPointerUp(e) {
    if (this.dragging && this.dragging.isDraggable) {
      this.dragging.onDragEnd(this.dragging.group, e);
    }
    this.dragging = null;

    this.isClickInProgress = false;
  }
}

export const TOUCHMANAGER = new TouchManager();
