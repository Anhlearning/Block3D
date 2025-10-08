// BlockMoveScript.js
import { Vector3 } from "three";
import BaseMoveScript from "./BaseMoveScript.js";
import { GAMEMANAGER } from "../../Manager/GameManager.js";

export class BlockMoveScript extends BaseMoveScript {
    constructor() {
        super();
        this.currentTarget = new Vector3();
    }

    getType() {
        return "BlockMoveScript";
    }

    onAttach(owner) {
        super.onAttach(owner);
    }

    onDragStart(obj, e) {
        this.dragging = true;
        // this.originPosition.copy(this.owner.group.position);
    }

    // Khi di chuyển chuột — TouchManager đã trả về pos (tọa độ world)
    onDragMove(obj, pos, e) {
        if (!this.dragging) return;
        this.currentTarget.copy(pos);
        this.currentTarget.y = this.originPosition.y;

        const step = this.SPEED * GAMEMANAGER.delta;
        const position = this.owner.group.position;

        this.currentTarget.x = Math.max(this.minX, Math.min(this.maxX, this.currentTarget.x));
        this.currentTarget.z = Math.max(this.minZ, Math.min(this.maxZ, this.currentTarget.z));

        // Di chuyển mượt bằng LERP
        position.lerp(this.currentTarget, step * 0.5);
    }

    // Khi thả chuột ra
    onDragEnd(obj, e) {
        this.dragging = false;
        this.snapGrid();
    }

    snapGrid() {
        super.snapGrid();
        console.log("Snapped to grid:", this.owner.group.position);
    }
}

export default BlockMoveScript;
