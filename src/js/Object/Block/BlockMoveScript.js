import {
    Vector3,
    MathUtils,
} from "three";
import { GAMEMANAGER } from "../../Manager/GameManager.js";
import BaseMoveScript from "./BaseMoveScript.js";
import { LockState, MoveType } from "./BlockScript.js";
import { RaycastUtils } from "../../Utils/RaycastUtils.js";
import { EventBus, EventKeys } from "../../Event/EventEmitter.js";
import SOUNDMANAGER from "../../Sound/SoundManager.js";
if (!MathUtils.moveTowards) {
    MathUtils.moveTowards = function (current, target, maxDelta) {
        if (Math.abs(target - current) <= maxDelta) return target;
        return current + Math.sign(target - current) * maxDelta;
    };
}
export class BlockMoveScript extends BaseMoveScript {
    constructor(scene) {
        super();
        this.scene = scene;
        this.OffsetForEffect = 0.02;
        this.MousePosition = new Vector3();
        this.originPosition = new Vector3();
        this.basePos = new Vector3();
        this.v = new Vector3();
        this.dir = new Vector3();
    }

    getType() {
        return "BlockMoveScript";
    }
    onAttach(owner) {
        super.onAttach(owner);
        this.blockScript = owner.getComponent("BlockScript");
    }
    UpdateMousePosition(mousePostion) {
        if (this.owner.isCollected) return;
        this.originPosition = this.owner.group.position.clone();
        this.MousePosition = mousePostion;
        this.dragging = true;
        this.owner.ActiveOutlineMesh(true);
        EventBus.emit(EventKeys.BLOCK_CLICK, (this.owner));
        SOUNDMANAGER.playClickBlock();
    }
    onDragMove(pos) {
        if (!this.dragging || !this.blockScript?.canMove()) return;

        const group = this.owner.group;
        const parent = group.parent || GAMEMANAGER.scene;
        const localPos = parent.worldToLocal(pos.clone());
        const objPos = group.position.clone();

        const newLocalPos = pos;
        const TempVector3 = parent.localToWorld(newLocalPos);
        const step = this.SPEED * GAMEMANAGER.delta;
        TempVector3.y = 0;
        // Nếu bị khóa
        if (this.blockScript.getLockState() !== LockState.None) {
            this.MaxX = this.originPosition.x + this.OffsetForEffect;
            this.MinX = this.originPosition.x - this.OffsetForEffect;
            this.MaxZ = this.originPosition.z + this.OffsetForEffect;
            this.MinZ = this.originPosition.z - this.OffsetForEffect;
            this._moveLimited(objPos, TempVector3, step);
            return;
        }
        // Horizontal
        if (this.blockScript.getMoveType() !== MoveType.Vertical) {
            this.MaxX = 50;
            this.MinX = -50;
            if (this.blockScript.getMoveType() === MoveType.Free) {
                this._rayCastCrossHorizontal(TempVector3);
            }
            this._rayCastStraightHorizontal(TempVector3);
            objPos.copy(this._applyAxisMovementX(objPos, TempVector3, step));
        }

        // // Vertical
        if (this.blockScript.getMoveType() !== MoveType.Horizontal) {
            this.MaxZ = 50;
            this.MinZ = -50;
            if (this.blockScript.getMoveType() === MoveType.Free) {
                this._rayCastCrossVertical(TempVector3);
            }
            this._rayCastStraightVertical(TempVector3);
            objPos.copy(this._applyAxisMovementZ(objPos, TempVector3, step));
        }
        this.owner.group.position.lerp(objPos, step);
        EventBus.emit(EventKeys.BLOCK_MOVE, (this.owner));
    }
    onDragEnd(obj, e) {
        this.dragging = false;
        if (this.owner.isCollected) return;
        this.snapGrid();
        EventBus.emit(EventKeys.BLOCK_MOVE, (this.owner));
    }

    // Snap vị trí block về lưới gần nhất (giống Mathf.Round)
    snapGrid() {
        const p = this.owner.group.position;
        SOUNDMANAGER.playDropBlock();
        // Làm tròn về bội số của 2
        p.x = Math.round(p.x);
        p.z = Math.round(p.z);
        this.owner.group.position.copy(p);
        this.owner.ActiveOutlineMesh(false);
        EventBus.emit(EventKeys.BLOCK_DROP);
        setTimeout(() => {
            if (this.blockScript.getLockState() !== LockState.None) EventBus.emit(EventKeys.BLOCK_MOVE, (this.owner));
        }, 500);
        // console.log("Snapped to grid (step=2):", p);
    }
    // =============== chuyển động giới hạn (MoveTowards + Lerp) ===============
    _moveLimited(position, target, step) {
        const temp = position.clone();

        // X
        if (target.x > this.MaxX)
            temp.x = MathUtils.moveTowards(position.x, this.MaxX, step * this.SCALE_FACTOR);
        else if (target.x < this.MinX)
            temp.x = MathUtils.moveTowards(position.x, this.MinX, step * this.SCALE_FACTOR);
        else temp.x = MathUtils.lerp(position.x, target.x, step);

        // Z
        if (target.z > this.MaxZ)
            temp.z = MathUtils.moveTowards(position.z, this.MaxZ, step * this.SCALE_FACTOR);
        else if (target.z < this.MinZ)
            temp.z = MathUtils.moveTowards(position.z, this.MinZ, step * this.SCALE_FACTOR);
        else temp.z = MathUtils.lerp(position.z, target.z, step);

        this.owner.group.position.copy(temp);
    }

    _applyAxisMovementX(position, target, step) {
        const temp = position.clone();
        if (target.x > this.MaxX)
            temp.x = MathUtils.moveTowards(position.x, this.MaxX, step * this.SCALE_FACTOR);
        else if (target.x < this.MinX)
            temp.x = MathUtils.moveTowards(position.x, this.MinX, step * this.SCALE_FACTOR);
        else temp.x = MathUtils.lerp(position.x, target.x, step);
        return temp;
    }

    _applyAxisMovementZ(position, target, step) {
        const temp = position.clone();
        if (target.z > this.MaxZ)
            temp.z = MathUtils.moveTowards(position.z, this.MaxZ, step * this.SCALE_FACTOR);
        else if (target.z < this.MinZ)
            temp.z = MathUtils.moveTowards(position.z, this.MinZ, step * this.SCALE_FACTOR);
        else temp.z = MathUtils.lerp(position.z, target.z, step);
        return temp;
    }

    // ================= RAYCAST STRAIGHT HORIZONTAL =================
    _rayCastStraightHorizontal(TempVector3) {
        const obj = this.owner.group;
        const t = obj.children[0];

        let farH = 20;
        let hitFar = null;
        if (!this._tempBase) {
            this._tempBase = new Vector3();
            this._tempV = new Vector3();
            this._tempDir = new Vector3();
            this._tempObjPos = new Vector3();
        }

        const basePos = this._tempBase;
        const v = this._tempV;
        const dir = this._tempDir;
        const objPos = this._tempObjPos.copy(obj.position);
        // console.groupCollapsed('%c[Raycast ▶ StraightHorizontal]', 'color:#00ffff');
        for (let i = 1; i < t.children.length; i++) {
            const child = t.children[i];
            child.getWorldPosition(basePos);
            // console.log(`Collider_${i} basePos:`, basePos);
            for (let k = 0; k < 2; k++) {
                v.copy(basePos);
                v.z += this.POS_RAY * 2 * k - this.POS_RAY;

                dir.set(TempVector3.x > objPos.x ? 1 : -1, 0, 0);

                const hits = RaycastUtils.raycastFromPoint(v, dir, GAMEMANAGER.MeshObjets, 20, obj);

                if (hits.length > 0) {
                    const hit = hits[0];
                    if (hit.object === obj) continue;
                    const distance = hit.distance;
                    if (distance < farH) {
                        farH = hit.distance;
                        hitFar = hit;
                        // console.log(`%c▶ Hit: ${hit.object.name}`, 'color:#ff8800', {
                        //     origin: v, dir, distance: hit.distance, hitPoint: hit.point
                        // });
                    }
                } else {
                    // console.log(`No hit from ${child.name} (dir=${dir.x > 0 ? 'right' : 'left'})`, { origin: v });
                }
            }
        }

        if (farH < 20 && hitFar) {
            const v = obj.position.clone();
            if (TempVector3.x > obj.position.x)
                this.MaxX = Math.min(v.x + hitFar.distance - 0.5, this.MaxX) + this.OffsetForEffect;
            else
                this.MinX = Math.max(v.x - hitFar.distance + 0.5, this.MinX) - this.OffsetForEffect;
        }

    }


    _rayCastStraightVertical(TempVector3) {
        const obj = this.owner.group;
        const t = obj.children[0];

        let farV = 20;
        let hitFar = null;

        // ⚡ Các vector tạm tái sử dụng (zero-GC)
        if (!this._tempVertical) {
            this._tempVertical = {
                base: new Vector3(),
                v: new Vector3(),
                dir: new Vector3(),
                objPos: new Vector3(),
            };
        }

        const { base, v, dir, objPos } = this._tempVertical;
        objPos.copy(obj.position);

        for (let i = 1; i < t.children.length; i++) {
            const child = t.children[i];
            child.getWorldPosition(base); // không new Vector3

            for (let k = 0; k < 2; k++) {
                v.copy(base);
                v.x += this.POS_RAY * 2 * k - this.POS_RAY;

                dir.set(0, 0, TempVector3.z > objPos.z ? 1 : -1);

                const hits = RaycastUtils.raycastFromPoint(v, dir, GAMEMANAGER.MeshObjets, 20, obj);
                if (hits.length === 0) continue;

                const hit = hits[0];
                if (hit.object === obj) continue;

                const distance = hit.distance;
                if (distance < farV) {
                    farV = distance;
                    hitFar = hit;
                }
            }
        }

        if (farV < 20 && hitFar) {
            const vpos = objPos;
            if (TempVector3.z > vpos.z)
                this.MaxZ = Math.min(vpos.z + hitFar.distance - 0.5, this.MaxZ) + this.OffsetForEffect;
            else
                this.MinZ = Math.max(vpos.z - hitFar.distance + 0.5, this.MinZ) - this.OffsetForEffect;
        }
    }

    // ================= RAYCAST CROSS HORIZONTAL =================
    _rayCastCrossHorizontal(TempVector3) {
        const obj = this.owner.group;
        const t = obj.children[0];

        let far = 20;
        let hitFar = null;

        // ⚡ Vector tạm tái sử dụng — không cấp phát mới
        if (!this._tempCross) {
            this._tempCross = {
                base: new Vector3(),
                v: new Vector3(),
                dir: new Vector3(),
                shortest: new Vector3(),
                objPos: new Vector3(),
                offsets: [
                    [-1, -1],
                    [1, -1],
                    [-1, 1],
                    [1, 1],
                ],
            };
        }

        const { base, v, dir, shortest, objPos, offsets } = this._tempCross;
        objPos.copy(obj.position);

        for (let i = 1; i < t.children.length; i++) {
            const child = t.children[i];
            child.getWorldPosition(base); // không tạo object mới

            for (let j = 0; j < offsets.length; j++) {
                const ox = offsets[j][0];
                const oz = offsets[j][1];

                v.copy(base);
                v.x += ox * this.POS_RAY;
                v.z += oz * this.POS_RAY;

                dir.copy(TempVector3).sub(objPos).normalize();

                const hits = RaycastUtils.raycastFromPoint(v, dir, GAMEMANAGER.MeshObjets, 20, obj);
                if (hits.length === 0) continue;

                const hit = hits[0];
                if (hit.object === obj) continue;

                const distance = hit.distance;
                if (distance < far) {
                    far = distance;
                    hitFar = hit;
                    shortest.copy(v);
                }
            }
        }

        if (far < 20 && hitFar) {
            const hitPoint = hitFar.point;

            if (TempVector3.x > objPos.x) {
                if (Math.abs(hitPoint.x - hitFar.object.position.x + 0.5) < this.TOLERANCE) {
                    const dis = hitFar.object.position.x - shortest.x - 0.5;
                    this.MaxX = Math.round(objPos.x + dis);
                }
            } else {
                if (Math.abs(hitPoint.x - hitFar.object.position.x - 0.5) < this.TOLERANCE) {
                    const dis = shortest.x - hitFar.object.position.x - 0.5;
                    this.MinX = Math.round(objPos.x - dis);
                }
            }
        }
    }
    // ================= RAYCAST CROSS VERTICAL =================
    _rayCastCrossVertical(TempVector3) {
        const obj = this.owner.group;
        const t = obj.children[0];
        let far = 20;
        let hitFar = null;
        let shortest = new Vector3();

        // console.groupCollapsed('%c[Raycast ▶ CrossVertical]', 'color:#ff00ff');

        for (let i = 1; i < t.children.length; i++) {
            const child = t.children[i];
            const base = child.getWorldPosition(new Vector3());
            for (const [ox, oz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
                const v = base.clone();
                v.x += ox * this.POS_RAY;
                v.z += oz * this.POS_RAY;
                const dir = TempVector3.clone().sub(obj.position).normalize();
                const hits = RaycastUtils.raycastFromPoint(v, dir, GAMEMANAGER.MeshObjets, 20, obj);

                if (hits.length > 0) {
                    const hit = hits[0];
                    if (hit.object === obj) continue;
                    if (hit.distance < far) {
                        far = hit.distance;
                        hitFar = hit;
                        shortest.copy(v);
                        // console.log(`%cDiagonal hit (${ox},${oz}) -> ${hit.object.name}`, 'color:#ff8800', {
                        //     origin: v, dir, distance: hit.distance, hitPoint: hit.point
                        // });
                    }
                } else {
                    // console.log(`No diagonal hit (${ox},${oz}) from ${child.name}`, { origin: v });
                }
            }
        }

        if (far < 20 && hitFar) {
            const hitPoint = hitFar.point;
            // console.log('%cClosest diagonal hit:', 'color:#ffcc00', { hitObject: hitFar.object.name, hitPoint, far });
            // 
            if (TempVector3.z > obj.position.z) {
                if (Math.abs(hitPoint.z + 0.5 - hitFar.object.position.z) < this.TOLERANCE) {
                    const dis = hitFar.object.position.z - shortest.z - 0.5;
                    this.MaxZ = Math.round(obj.position.z + dis);
                }
            } else {
                if (Math.abs(hitPoint.z - hitFar.object.position.z - 0.5) < this.TOLERANCE) {
                    const dis = shortest.z - hitFar.object.position.z - 0.5;
                    this.MinZ = Math.round(obj.position.z - dis);
                }
            }

            // console.log('%cUpdated Limits (CrossVertical):', 'color:#00ff00', {
            //     MaxX: this.MaxX, MinX: this.MinX,
            //     hitObject: hitFar.object.name,
            //     hitDistance: hitFar.distance
            // });
        }

    }

}
export default BlockMoveScript;  