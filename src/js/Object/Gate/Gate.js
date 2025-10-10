import {
    Group,
    Raycaster,
    Vector3,
    MathUtils,
    Mesh,
    SphereGeometry,
    MeshBasicMaterial
} from "three";
import { EventBus } from "../../Event/EventEmitter";
import { BlockManagerPool } from "../../Pooling/BlockPoolManager";

export class Gate {
    constructor({ colorId, mesh, lengthCheck = 3 }) {
        this.group = new Group();
        this.colorId = colorId;
        this.mesh = BlockManagerPool.acquire(mesh);
        this.door = this.mesh;
        this.checks = [];
        this.parentParticles = new Group();
        this.group.add(this.mesh);
        this.group.add(this.parentParticles);

        this.collectDistance = 1.5;
        this.collected = false;

        const spacing = 2; // khoảng cách giữa các check
        const half = (lengthCheck - 1) / 2;

        for (let i = 0; i < lengthCheck; i++) {
            const check = new Group();
            const offset = (i - half) * spacing;
            check.position.set(offset, 0, 0); // căn giữa đối xứng
            this.checks.push(check);
            this.group.add(check);
        }

        EventBus.on("CHECK_GATE", this.onBlockMove.bind(this));

        console.log(
            `[Gate ${this.colorId}] created with ${lengthCheck} check points:`,
            this.checks.map((c) => c.position.x)
        );
    }

    /**
     * Tương đương OnBlockMove trong Unity
     */
    onBlockMove(blockGroup) {
        if (!blockGroup) return;

        const data = blockGroup.getComponent("BlockMoveScript");
        if (!data) return;

        if (data.blockScript.colorId !== this.colorId) return;

        if (!data.blockScript.canMove()) return;

        const dirRef = new Vector3();
        if (this.checks.length > 0) {
            this.checks[0].getWorldDirection(dirRef);
        } else {
            dirRef.set(0, 0, 1); // fallback
        }

        const sizeBlock =
            typeof blockGroup.GetSize === "function"
                ? blockGroup.GetSize(dirRef)
                : 1; // fallback
        let sizeCorrect = 0;
        let canCollect = false;

        // ✅ 5. Lặp qua các check points của Gate
        for (const check of this.checks) {
            const vec = new Vector3();
            check.getWorldDirection(vec);
            vec.normalize();
            vec.multiplyScalar(this.gateParent?.scale?.x ?? 1);

            // Hai điểm trái/phải
            const right = new Vector3();
            check.getWorldDirection(right);
            right.cross(new Vector3(0, 1, 0)).normalize();

            const o1 = check.getWorldPosition(new Vector3()).addScaledVector(right, 0.25);
            const o2 = check.getWorldPosition(new Vector3()).addScaledVector(right, -0.25);

            // Bắn 2 tia ray
            for (const origin of [o1, o2]) {
                const hits = RaycastUtils.raycastFromPoint(origin, vec, this.raycastTargets, 100, this.group);

                if (hits.length === 0) continue;

                const hit = hits[0];
                const hitBlock =
                    hit.object.userData?.blockGroup || hit.object.parent?.userData?.blockGroup;

                if (hitBlock && hitBlock === blockGroup) {
                    const distance = hit.point.clone().sub(origin).length();
                    if (distance <= this.collectDistance) canCollect = true;
                    sizeCorrect++;

                    if (sizeCorrect >= sizeBlock * 2 && canCollect) {
                        this.collectBlock(blockGroup, vec);
                        return;
                    }
                } else {
                    sizeCorrect = 0;
                }
            }
        }
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
