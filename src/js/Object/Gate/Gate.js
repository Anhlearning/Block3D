import {
    Group,
    MathUtils,
    Mesh,
    MeshBasicMaterial,
    SphereGeometry,
    Line,
    LineBasicMaterial,
    BufferGeometry,
    Vector3,
    Color,
    Quaternion,
} from "three";
import { BlockManagerPool } from "../../Pooling/BlockPoolManager";
import { EventBus, EventKeys } from "../../Event/EventEmitter";
import { GAMEMANAGER } from "../../Manager/GameManager";
import { RaycastUtils } from "../../Utils/RaycastUtils";
import { TOUCHMANAGER } from "../../Manager/TouchManager";
import { LockState } from "../Block/BlockScript";
export class Gate {
    constructor({ colorId, mesh, lengthCheck = 3, directionCheck = "+z" }) {
        this.group = new Group();
        this.colorId = colorId;
        this.mesh = BlockManagerPool.acquire(mesh);
        this.mesh.rotation.y = MathUtils.degToRad(-90)
        this.door = this.mesh;
        this.checks = [];
        this.parentParticles = new Group();
        this.group.add(this.mesh);
        this.group.add(this.parentParticles);
        this.debug = true;
        this.collectDistance = 1.5;
        this.collected = false;

        const spacing = 2; // khoảng cách giữa các check
        const half = (lengthCheck - 1) / 2;

        // 🔹 Tạo check points + debug mesh
        const debugMat = new MeshBasicMaterial({ color: 0x00ffff, wireframe: false });
        const sphereGeo = new SphereGeometry(0.1, 8, 8);

        for (let i = 0; i < lengthCheck; i++) {
            const check = new Group();
            check.rotation.x = MathUtils.degToRad(-90);
            const offset = (i - half) * spacing;
            check.position.set(offset, 0, 0);
            this.checks.push(check);
            this.group.add(check);
        }

        // 🔹 Xoay group theo directionCheck
        this.applyDirectionRotation(directionCheck);

        // 🔹 Lắng nghe sự kiện kiểm tra
        EventBus.on(EventKeys.BLOCK_MOVE, this.onBlockMove.bind(this));

        console.log(
            `%c[Gate ${this.colorId}] tạo ${lengthCheck} check points — hướng: ${directionCheck}`,
            "color: cyan; font-weight: bold;"
        );
    }

    applyDirectionRotation(direction) {
        switch (direction.toLowerCase()) {
            case "-z":
                this.group.rotation.x = MathUtils.degToRad(0);
                break;
            case "+z":
                this.group.rotation.x = MathUtils.degToRad(90);
                break;
            case "+x":
                this.group.rotation.set(
                    MathUtils.degToRad(0),
                    MathUtils.degToRad(-90),
                    MathUtils.degToRad(90)
                );
                break;
            case "-x":
                this.group.rotation.set(
                    MathUtils.degToRad(0),
                    MathUtils.degToRad(90),
                    MathUtils.degToRad(-90)
                );
                break;
            default:
                console.warn(`⚠️ Hướng directionCheck không hợp lệ: ${direction}`);
                break;
        }

        console.log(
            `%c[Gate ${this.colorId}] => group.rotation = (${this.group.rotation.x.toFixed(
                2
            )}, ${this.group.rotation.y.toFixed(2)}, ${this.group.rotation.z.toFixed(2)})`,
            "color: orange"
        );
    }


    onBlockMove(blockGroup) {
        if (!blockGroup) return;

        const data = blockGroup.getComponent?.("BlockMoveScript");
        if (!data) return;

        if (data.blockScript.colorId !== this.colorId) return;
        if (!data.blockScript.canMove()) return;

        const dirRef = new Vector3();
        if (this.checks.length > 0) {
            // ✅ Lấy hướng UP thật trong world-space
            dirRef.set(0, 1, 0);
            dirRef.applyQuaternion(this.checks[0].getWorldQuaternion(new Quaternion()));
        } else {
            dirRef.set(0, 1, 0); // fallback: hướng lên trục Y
        }


        const sizeBlock =
            typeof blockGroup.GetSize === "function"
                ? blockGroup.GetSize(dirRef)
                : 1;

        let sizeCorrect = 0;
        let canCollect = false;

        for (const check of this.checks) {
            const vec = new Vector3(0, 1, 0);
            vec.applyQuaternion(check.getWorldQuaternion(new Quaternion()));
            vec.normalize();
            vec.multiplyScalar(this.gateParent?.scale?.x ?? 1);

            const right = new Vector3();
            check.getWorldDirection(right);
            right.cross(new Vector3(0, 1, 0)).normalize();

            const o1 = check.getWorldPosition(new Vector3()).addScaledVector(right, 0.25);
            const o2 = check.getWorldPosition(new Vector3()).addScaledVector(right, -0.25);

            // 🟡 Debug hướng ray
            if (this.debug) {
                console.log(
                    `%c[Gate ${this.colorId}] ${check.name}\n→ Dir: (${vec.x.toFixed(
                        2
                    )}, ${vec.y.toFixed(2)}, ${vec.z.toFixed(2)})`,
                    "color:#00ffff"
                );
            }

            // 🟢 Vẽ ray trực tiếp trong scene
            if (this.debug) {
                this.drawRay(o1, vec, 2, 0x00ffff, 800);
                this.drawRay(o2, vec, 2, 0xff00ff, 800);
            }

            // Bắn 2 tia ray
            for (const origin of [o1, o2]) {
                const hits = RaycastUtils.raycastFromPoint(
                    origin,
                    vec,
                    TOUCHMANAGER.ObjectsMesh,
                    100,
                    this.group
                );

                if (hits.length === 0) continue;

                const hit = hits[0];
                console.log(hit);

                if (hit.object.userData.blockGroup === blockGroup) {
                    const distance = hit.point.clone().sub(origin).length();
                    if (distance <= this.collectDistance) canCollect = true;
                    sizeCorrect++;

                    // 🟢 Khi ray trúng block hợp lệ → vẽ ray xanh lá
                    if (this.debug) this.drawRay(origin, vec, distance, 0x00ff00, 1000);

                    if (sizeCorrect >= sizeBlock * 2 && canCollect) {
                        blockGroup.getComponent("BlockScript").setLockState(LockState.Locked);
                        console.log(
                            `%c✅ Block ${blockGroup.name} hợp lệ — distance=${distance.toFixed(
                                3
                            )}, size=${sizeCorrect}/${sizeBlock * 2}`,
                            "color: #00ff99; font-weight: bold;"
                        );
                        return;
                    }
                } else {
                    sizeCorrect = 0;
                }
            }
        }
    }

    /**
     * 🧩 Vẽ ray trực tiếp trong scene (như Debug.DrawRay của Unity)
     */
    drawRay(origin, direction, length = 1, color = 0xff0000, duration = 1000) {
        const end = origin.clone().addScaledVector(direction.clone().normalize(), length);
        const geometry = new BufferGeometry().setFromPoints([origin.clone(), end]);
        const material = new LineBasicMaterial({ color: new Color(color) });
        const line = new Line(geometry, material);

        this.group.add(line);

        // Tự hủy sau duration (ms)
        setTimeout(() => {
            this.group.remove(line);
            geometry.dispose();
            material.dispose();
        }, duration);
    }
    collectBlock(blockGroup, dir) {
        const data = blockGroup.userData.block;
        data.collected = true;
        this.collected = true;

        console.log(`[Gate ${this.colorId}] Collect block:`, blockGroup.name);

        const startPos = blockGroup.position.clone();
        const targetPos = startPos.clone().addScaledVector(dir.clone().normalize().negate(), 10);
        const duration = 3;
        const startTime = performance.now();

        const animate = (time) => {
            const t = Math.min((time - startTime) / (duration * 1000), 1);
            blockGroup.position.lerpVectors(startPos, targetPos, t);

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                blockGroup.visible = false;
                console.log("Block disappeared");
                this.openDoor();
            }
        };
        requestAnimationFrame(animate);
    }

    openDoor() {
        const startY = this.door.position.y;
        const targetY = startY - 0.75;
        const duration = 0.1;
        const startTime = performance.now();

        const animate = (time) => {
            const t = Math.min((time - startTime) / (duration * 1000), 1);
            this.door.position.y = MathUtils.lerp(startY, targetY, t);
            if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    destroy() {
        EventBus.off("CHECK_GATE", this.onBlockMove.bind(this));
    }
}
