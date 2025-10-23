// BaseMoveScript.js
import { Vector3 } from "three";

export class BaseMoveScript {
    constructor() {
        this.owner = null; // tham chiếu đến BlockGroup
        this.dragging = false;
        this.originPosition = new Vector3();
        this.mousePosition = new Vector3();
        this.tempVector = new Vector3();

        // Hằng số di chuyển
        this.SPEED = 30;
        this.SCALE_FACTOR = 2;
        this.TOLERANCE = 0.01;
        this.POS_RAY = 0.3;
        this.OFFSET_EFFECT = 0.02;

        // Giới hạn vùng
        this.maxX = 50;
        this.minX = -50;
        this.maxZ = 50;
        this.minZ = -50;
    }

    getType() {
        return "BaseMoveScript";
    }

    onAttach(owner) {
        this.owner = owner; 
    }

    onUpdate() { }

    onDestroy() {
        this.owner = null;
    }

    setDragging(v) {
        this.dragging = v;
    }

    isDragging() {
        return this.dragging;
    }

    updatePosition(worldPos) {
        this.originPosition.copy(this.owner.group.position);
        this.dragging = true;
        this.mousePosition.copy(worldPos);
    }

    checkRelease() { }

    snapGrid() {
        const pos = this.owner.group.position;
        pos.x = Math.round(pos.x);
        pos.z = Math.round(pos.z);
        this.dragging = false;
    }
}

export default BaseMoveScript;
