import {
    Vector3,
    MathUtils,
} from "three";
import { GAMEMANAGER } from "../../Manager/GameManager.js";
import BaseMoveScript from "./BaseMoveScript.js";
import { LockState, MoveType } from "./BlockScript.js";
import { RaycastUtils } from "../../Utils/RaycastUtils.js";
import { TOUCHMANAGER } from "../../Manager/TouchManager.js";
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
        this.OffsetForEffect = 0.1;
        this.ScaleFactor = 4.0;
        this.Tolerance = 0.01;
        this.PosRay = 0.5;
    }

    getType() {
        return "BlockMoveScript";
    }

    onAttach(owner) {
        super.onAttach(owner);
        this.blockScript = owner.getComponent("BlockScript");
    }
    onDragStart(obj, e, hit) {
        this.dragging = true;
        this._loggedFirstFrame = false; // reset flag mỗi khi bắt đầu kéo

        const group = this.owner.group;
        const parent = group.parent || GAMEMANAGER.scene;

        // 1. Lấy worldPos của điểm click (raycast)
        const hitPos = hit?.worldPos ? hit.worldPos.clone() : group.getWorldPosition(new Vector3());

        // 2. Chuyển hitPos sang local-space của parent
        const localHit = parent.worldToLocal(hitPos.clone());

        // 3. Lưu offset giữa vị trí group hiện tại và vị trí click local
        this.dragOffset = new Vector3().subVectors(group.position, localHit);

        // 4. Lưu lại vị trí hiện tại
        this.currentTarget = group.position.clone();
    }
    onDragMove(obj, pos, e) {
        if (!this.dragging || !this.blockScript?.canMove()) return;

        const group = this.owner.group;
        const parent = group.parent || GAMEMANAGER.scene;
        const step = this.SPEED * GAMEMANAGER.delta;
        const localPos = parent.worldToLocal(pos.clone());
        const objPos = group.position.clone();
        const newLocalPos = new Vector3().addVectors(localPos, this.dragOffset);
        const TempVector3 = parent.localToWorld(newLocalPos);
        TempVector3.y = 0;

        // 🔍 Log frame đầu tiên
        if (!this._loggedFirstFrame) {
            this._loggedFirstFrame = true;
            console.log("=== First drag frame ===");
            console.log("World pos (raycast):", pos);
            console.log("Group world position:", group.getWorldPosition(new Vector3()));
            console.log("Group local position:", group.position);
            console.log("Offset:", this.dragOffset);
            console.log("TempVector3 (final target world pos):", TempVector3);
        }

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

        // Vertical
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
    }
    onDragEnd(obj, e) {
        this.dragging = false;
        this.snapGrid();
    }

    // Snap vị trí block về lưới gần nhất (giống Mathf.Round)
    snapGrid() {
        const p = this.owner.group.position;

        // Làm tròn về bội số của 2
        p.x = Math.round(p.x / 2) * 2;
        p.z = Math.round(p.z / 2) * 2;

        this.owner.group.position.copy(p);
        console.log("Snapped to grid (step=2):", p);
    }
    // =============== chuyển động giới hạn (MoveTowards + Lerp) ===============
    _moveLimited(position, target, step) {
        const temp = position.clone();

        // X
        if (target.x > this.MaxX)
            temp.x = MathUtils.moveTowards(position.x, this.MaxX, step * this.ScaleFactor);
        else if (target.x < this.MinX)
            temp.x = MathUtils.moveTowards(position.x, this.MinX, step * this.ScaleFactor);
        else temp.x = MathUtils.lerp(position.x, target.x, step);

        // Z
        if (target.z > this.MaxZ)
            temp.z = MathUtils.moveTowards(position.z, this.MaxZ, step * this.ScaleFactor);
        else if (target.z < this.MinZ)
            temp.z = MathUtils.moveTowards(position.z, this.MinZ, step * this.ScaleFactor);
        else temp.z = MathUtils.lerp(position.z, target.z, step);

        this.owner.group.position.copy(temp);
    }

    _applyAxisMovementX(position, target, step) {
        const temp = position.clone();
        if (target.x > this.MaxX)
            temp.x = MathUtils.moveTowards(position.x, this.MaxX, step * this.ScaleFactor);
        else if (target.x < this.MinX)
            temp.x = MathUtils.moveTowards(position.x, this.MinX, step * this.ScaleFactor);
        else temp.x = MathUtils.lerp(position.x, target.x, step);
        return temp;
    }

    _applyAxisMovementZ(position, target, step) {
        const temp = position.clone();
        if (target.z > this.MaxZ)
            temp.z = MathUtils.moveTowards(position.z, this.MaxZ, step * this.ScaleFactor);
        else if (target.z < this.MinZ)
            temp.z = MathUtils.moveTowards(position.z, this.MinZ, step * this.ScaleFactor);
        else temp.z = MathUtils.lerp(position.z, target.z, step);
        return temp;
    }

    // ================= RAYCAST STRAIGHT HORIZONTAL =================
    _rayCastStraightHorizontal(TempVector3) {
        const obj = this.owner.group;
        const t = obj.children[0];

        let farH = 20;
        let hitFar = null;

        console.groupCollapsed('%c[Raycast ▶ StraightHorizontal]', 'color:#00ffff');

        for (let i = 1; i < t.children.length; i++) {
            const child = t.children[i];
            const basePos = child.getWorldPosition(new Vector3());
            console.log(`Collider_${i} basePos:`, basePos);

            for (let k = 0; k < 2; k++) {
                const v = basePos.clone();
                v.z += this.PosRay * 2 * k - this.PosRay;

                const dir = new Vector3(TempVector3.x > obj.position.x ? 1 : -1, 0, 0);
                const hits = RaycastUtils.raycastFromPoint(v, dir, TOUCHMANAGER.ObjectsMesh, 20, obj);
                let distance = 20;

                if (hits.length > 0) {
                    const hit = hits[0];
                    if (hit.object === obj) continue;
                    distance = hit.distance;
                    if (hit.distance < farH) {
                        farH = hit.distance;
                        hitFar = hit;
                        console.log(`%c▶ Hit: ${hit.object.name}`, 'color:#ff8800', {
                            origin: v, dir, distance: hit.distance, hitPoint: hit.point
                        });
                    }
                } else {
                    console.log(`No hit from ${child.name} (dir=${dir.x > 0 ? 'right' : 'left'})`, { origin: v });
                }
            }
        }

        if (farH < 20 && hitFar) {
            const v = obj.position.clone();
            if (TempVector3.x > obj.position.x)
                this.MaxX = Math.min(v.x + hitFar.distance - 1, this.MaxX) + this.OffsetForEffect;
            else
                this.MinX = Math.max(v.x - hitFar.distance + 1, this.MinX) - this.OffsetForEffect;

            console.log('%cUpdated Limits (Horizontal):', 'color:#00ff00', {
                MaxX: this.MaxX,
                MinX: this.MinX,
                hitObject: hitFar.object.name,
                hitDistance: hitFar.distance
            });
        }

        console.groupEnd();
    }


    // ================= RAYCAST STRAIGHT VERTICAL =================
    _rayCastStraightVertical(TempVector3) {
        const obj = this.owner.group;
        const t = obj.children[0];
        let farV = 20;
        let hitFar = null;

        console.groupCollapsed('%c[Raycast ▶ StraightVertical]', 'color:#00ffff');

        for (let i = 1; i < t.children.length; i++) {
            const child = t.children[i];
            const basePos = child.getWorldPosition(new Vector3());
            console.log(`Collider_${i} basePos:`, basePos);

            for (let k = 0; k < 2; k++) {
                const v = basePos.clone();
                v.x += this.PosRay * 2 * k - this.PosRay;
                const dir = new Vector3(0, 0, TempVector3.z > obj.position.z ? 1 : -1);
                const hits = RaycastUtils.raycastFromPoint(v, dir, TOUCHMANAGER.ObjectsMesh, 20, obj);

                if (hits.length > 0) {
                    const hit = hits[0];
                    if (hit.object === obj) continue;
                    if (hit.distance < farV) {
                        farV = hit.distance;
                        hitFar = hit;
                        console.log(`%c▶ Hit: ${hit.object.name}`, 'color:#ff8800', {
                            origin: v, dir, distance: hit.distance, hitPoint: hit.point
                        });
                    }
                } else {
                    console.log(`No hit from ${child.name} (dir=${dir.z > 0 ? 'forward' : 'backward'})`, { origin: v });
                }
            }
        }

        if (farV < 20 && hitFar) {
            const v = obj.position.clone();
            if (TempVector3.z > obj.position.z)
                this.MaxZ = Math.min(v.z + hitFar.distance - 1, this.MaxZ) + this.OffsetForEffect;
            else
                this.MinZ = Math.max(v.z - hitFar.distance + 1, this.MinZ) - this.OffsetForEffect;

            console.log('%cUpdated Limits (Vertical):', 'color:#00ff00', {
                MaxZ: this.MaxZ,
                MinZ: this.MinZ,
                hitObject: hitFar.object.name,
                hitDistance: hitFar.distance
            });
        }

        console.groupEnd();
    }

    // ================= RAYCAST CROSS HORIZONTAL =================
    _rayCastCrossHorizontal(TempVector3) {
        const obj = this.owner.group;
        const t = obj.children[0];
        let far = 20;
        let hitFar = null;
        let shortest = new Vector3();

        console.groupCollapsed('%c[Raycast ▶ CrossHorizontal]', 'color:#ff00ff');

        for (let i = 1; i < t.children.length; i++) {
            const child = t.children[i];
            const base = child.getWorldPosition(new Vector3());
            for (const [ox, oz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
                const v = base.clone();
                v.x += ox * this.PosRay;
                v.z += oz * this.PosRay;
                const dir = TempVector3.clone().sub(obj.position).normalize();
                const hits = RaycastUtils.raycastFromPoint(v, dir, TOUCHMANAGER.ObjectsMesh, 20, obj);

                if (hits.length > 0) {
                    const hit = hits[0];
                    if (hit.object === obj) continue;
                    if (hit.distance < far) {
                        far = hit.distance;
                        hitFar = hit;
                        shortest.copy(v);
                        console.log(`%cDiagonal hit (${ox},${oz}) -> ${hit.object.name}`, 'color:#ff8800', {
                            origin: v, dir, distance: hit.distance, hitPoint: hit.point
                        });
                    }
                } else {
                    console.log(`No diagonal hit (${ox},${oz}) from ${child.name}`, { origin: v });
                }
            }
        }

        if (far < 20 && hitFar) {
            const hitPoint = hitFar.point;
            console.log('%cClosest diagonal hit:', 'color:#ffcc00', { hitObject: hitFar.object.name, hitPoint, far });

            if (TempVector3.x > obj.position.x) {
                if (Math.abs(hitPoint.x - hitFar.object.position.x + 1) < this.Tolerance) {
                    const dis = hitFar.object.position.x - shortest.x - 1;
                    this.MaxX = Math.round(obj.position.x + dis);
                }
            } else {
                if (Math.abs(hitPoint.x - hitFar.object.position.x - 1) < this.Tolerance) {
                    const dis = shortest.x - hitFar.object.position.x - 1;
                    this.MinX = Math.round(obj.position.x - dis);
                }
            }

            console.log('%cUpdated Limits (CrossHorizontal):', 'color:#00ff00', {
                MaxX: this.MaxX, MinX: this.MinX
            });
        }

        console.groupEnd();
    }


    // ================= RAYCAST CROSS VERTICAL =================
    _rayCastCrossVertical(TempVector3) {
        const obj = this.owner.group;
        const t = obj.children[0];
        let far = 20;
        let hitFar = null;
        let shortest = new Vector3();

        console.groupCollapsed('%c[Raycast ▶ CrossVertical]', 'color:#ff00ff');

        for (let i = 1; i < t.children.length; i++) {
            const child = t.children[i];
            const base = child.getWorldPosition(new Vector3());
            for (const [ox, oz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
                const v = base.clone();
                v.x += ox * this.PosRay;
                v.z += oz * this.PosRay;
                const dir = TempVector3.clone().sub(obj.position).normalize();
                const hits = RaycastUtils.raycastFromPoint(v, dir, TOUCHMANAGER.ObjectsMesh, 20, obj);

                if (hits.length > 0) {
                    const hit = hits[0];
                    if (hit.object === obj) continue;
                    if (hit.distance < far) {
                        far = hit.distance;
                        hitFar = hit;
                        shortest.copy(v);
                        console.log(`%cDiagonal hit (${ox},${oz}) -> ${hit.object.name}`, 'color:#ff8800', {
                            origin: v, dir, distance: hit.distance, hitPoint: hit.point
                        });
                    }
                } else {
                    console.log(`No diagonal hit (${ox},${oz}) from ${child.name}`, { origin: v });
                }
            }
        }

        if (far < 20 && hitFar) {
            const hitPoint = hitFar.point;
            console.log('%cClosest diagonal hit:', 'color:#ffcc00', { hitObject: hitFar.object.name, hitPoint, far });

            if (TempVector3.z > obj.position.z) {
                if (Math.abs(hitPoint.z + 1 - hitFar.object.position.z) < this.Tolerance) {
                    const dis = hitFar.object.position.z - shortest.z - 1;
                    this.MaxZ = Math.round(obj.position.z + dis);
                }
            } else {
                if (Math.abs(hitPoint.z - hitFar.object.position.z - 1) < this.Tolerance) {
                    const dis = shortest.z - hitFar.object.position.z - 1;
                    this.MinZ = Math.round(obj.position.z - dis);
                }
            }

            console.log('%cUpdated Limits (CrossVertical):', 'color:#00ff00', {
                MaxZ: this.MaxZ, MinZ: this.MinZ
            });
        }

        console.groupEnd();
    }

}
export default BlockMoveScript;  