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
    BoxGeometry,
    MeshStandardMaterial,
} from "three";
import { BlockManagerPool } from "../../Pooling/BlockPoolManager";
import { EventBus, EventKeys } from "../../Event/EventEmitter";
import { GAMEMANAGER } from "../../Manager/GameManager";
import { RaycastUtils } from "../../Utils/RaycastUtils";
import { LockState } from "../Block/BlockScript";
import GameConstant from "../../Const/GameConstant";
import { MaterialFactory } from "../../Factory/MaterialFactory";
import gsap from "gsap";
export class Gate {
    constructor({ colorId, name, directionCheck = "+z" }) {
        const detailGate = GameConstant.GATE_DETAIL[name];
        this.group = new Group();
        this.colorId = colorId;
        this.mesh = BlockManagerPool.acquire(detailGate.mesh);
        this.arrow = BlockManagerPool.acquire('arrow');
        const arrowMat = new MeshBasicMaterial({
            color: 0xFFFFFF,
        });
        this.arrow.traverse((child) => {
            if (child.isMesh) {
                child.material = arrowMat;
                child.material.needsUpdate = true;
            }
        });
        this.arrow.position.set(0, 1, -0.25);
        this.arrow.rotation.y = MathUtils.degToRad(-90);
        this.group.add(this.arrow);
        this.mesh.rotation.y = MathUtils.degToRad(-90);
        this.door = this.mesh;
        this.mesh.position.set(-0.5 * detailGate.size, 0, 0);
        this.checks = [];
        this.parentParticles = new Group();
        this.group.add(this.mesh);
        this.group.add(this.parentParticles);
        this.debug = true;
        this.collectDistance = 1.0;
        this.collected = false;
        const lengthCheck = detailGate.size;
        const spacing = 1.0;
        const half = (lengthCheck - 1) / 2;

        const boxGeo = new BoxGeometry(1 * lengthCheck, 1.5, 1);
        const boxMat = MaterialFactory.getUnlitMat("base");
        const boxMesh = new Mesh(boxGeo, boxMat);
        boxMesh.material.visible = false;
        boxMesh.position.set(0, 0.75, -0.2);
        boxMesh.name = colorId;
        this.group.add(boxMesh);

        for (let i = 0; i < lengthCheck; i++) {
            const check = new Group();
            check.rotation.x = MathUtils.degToRad(-90);

            const offset = (i - half) * spacing;
            check.position.set(offset, 0.5, 0);

            // ✅ Thêm sphere visual
            // const visual = new Mesh(sphereGeo, debugMat);
            // visual.position.set(0, 0, 0); // tâm check
            // check.add(visual);
            this.checks.push(check);
            this.group.add(check);
        }
        const colorData = GameConstant.COLOR_DETAIL[colorId];
        const colorHex = colorData ? colorData.color : 0xffffff;
        const mat = MaterialFactory.getLitMatBlock({
            baseKey: "baseMap",
            normalKey: "normalMap",
            metallicKey: "specularMap",
            color: colorHex,
            roughness: 0.2,
        });
        this.mesh.traverse((child) => {
            if (child.isMesh) {
                child.material = mat;
                child.material.needsUpdate = true;
            }
        });
        this.applyDirectionRotation(directionCheck);
        // 🔹 Lắng nghe sự kiện kiểm tra
        this.scaleY = this.group.scale.y
        EventBus.on(EventKeys.BLOCK_MOVE, this.onBlockMove.bind(this));

        // console.log(
        //     `%c[Gate ${this.colorId}] tạo ${lengthCheck} check points — hướng: ${directionCheck}`,
        //     "color: cyan; font-weight: bold;"
        // );
    }

    applyDirectionRotation(direction) {
        switch (direction.toLowerCase()) {
            case "+z":
                this.group.rotation.x = MathUtils.degToRad(0);
                this.direction = new Vector3(0, 0, 1);
                break;
            case "-z":
                this.group.rotation.y = MathUtils.degToRad(-180);
                this.direction = new Vector3(0, 0, -1);
                break;
            case "+x":
                this.group.rotation.set(
                    MathUtils.degToRad(0),
                    MathUtils.degToRad(90),
                    MathUtils.degToRad(0)
                );
                this.direction = new Vector3(1, 0, 0);
                break;
            case "-x":
                this.direction = new Vector3(-1, 0, 0);
                this.group.rotation.set(
                    MathUtils.degToRad(0),
                    MathUtils.degToRad(-90),
                    MathUtils.degToRad(0)
                );
                break;
            default:
                console.warn(`⚠️ Hướng directionCheck không hợp lệ: ${direction}`);
                break;
        }
        // console.log(
        //     `%c[Gate ${this.colorId}] => group.rotation = (${this.group.rotation.x.toFixed(
        //         2
        //     )}, ${this.group.rotation.y.toFixed(2)}, ${this.group.rotation.z.toFixed(2)})`,
        //     "color: orange"
        // );
    }

    onBlockMove(blockGroup) {
        if (!blockGroup) return;
        const data = blockGroup.getComponent?.("BlockMoveScript");
        if (!data) return;

        if (data.blockScript.colorId !== this.colorId) return;
        if (!data.blockScript.canMove()) return;

        const dirRef = new Vector3();
        if (this.checks.length > 0) {
            dirRef.set(0, 1, 0);
            dirRef.applyQuaternion(this.checks[0].getWorldQuaternion(new Quaternion()));
        } else {
            dirRef.set(0, 1, 0); // fallback: hướng lên trục Y
        }


        const sizeBlock =
            typeof blockGroup.GetSize === "function"
                ? blockGroup.GetSize(dirRef)
                : 1;
        console.log(sizeBlock);
        
        let sizeCorrect = 0;
        let canCollect = false;

        this.checks.forEach((check, checkIndex) => {
            const pos = check.getWorldPosition(new Vector3());
            const quat = check.getWorldQuaternion(new Quaternion());

            // Hướng raycast
            const vec = new Vector3(0, 1, 0);
            vec.applyQuaternion(quat).normalize();
            vec.multiplyScalar(this.gateParent?.scale?.x ?? 1);

            // Trục tham chiếu
            const right = new Vector3(1, 0, 0).applyQuaternion(quat).normalize();
            const up = new Vector3(0, 1, 0).applyQuaternion(quat).normalize();
            const forward = new Vector3(0, 0, 1).applyQuaternion(quat).normalize();

            // Offset 2 điểm
            const o1 = pos.clone().addScaledVector(right, 0.25);
            const o2 = pos.clone().addScaledVector(right, -0.25);

            // Debug rays
            if (this.debug) {
                this.drawRay(o1, vec, 2, 0x00ffff, 800);
                this.drawRay(o2, vec, 2, 0xff00ff, 800);
            }

            // Bắn 2 tia ray
            [o1, o2].forEach((origin, i) => {
                const originName = i === 0 ? "o1" : "o2";
                const hits = RaycastUtils.raycastFromPoint(
                    origin,
                    vec,
                    GAMEMANAGER.BlockObjects,
                    100,
                    this.group
                );

                if (hits.length === 0) return;

                const hit = hits[0];

                
                if (hit.object.userData.blockGroup === blockGroup) {
                    // console.log(
                    //     `%cCheck[${checkIndex}] → ${originName} hit: ${hit.object.name} distance: ${hit.distance}`,
                    //     "color: yellow"
                    // );
                    const distance = hit.point.clone().sub(origin).length();
                    if (distance <= this.collectDistance) canCollect = true;
                    sizeCorrect++;
                    // Vẽ ray xanh lá khi hợp lệ
                    if (this.debug) this.drawRay(origin, vec, distance, 0x00ff00, 1000);

                    if (sizeCorrect >= sizeBlock * 2 && canCollect) {
                        blockGroup.getComponent("BlockMoveScript").snapGrid();
                        blockGroup.getComponent("BlockScript").setLockState(LockState.Locked);
                        this.collectBlock(blockGroup.group, vec);
                        console.log(
                            `%c✅ Block ${blockGroup.name} hợp lệ — check=${checkIndex}, origin=${originName}, distance=${distance.toFixed(3)}, size=${sizeCorrect}/${sizeBlock * 2}`,
                            "color: #00ff99; font-weight: bold;"
                        );
                        return;
                    }
                } else {
                    sizeCorrect = 0;
                }
            });
        });
    }
    drawRay(origin, direction, length = 1, color = 0xff0000, duration = 1000) {
        // ✅ Tính toạ độ end theo world
        const end = origin.clone().addScaledVector(direction.clone().normalize(), length);

        const geometry = new BufferGeometry().setFromPoints([origin.clone(), end]);
        const material = new LineBasicMaterial({ color: new Color(color) });
        const line = new Line(geometry, material);

        // ❌ Không nên add vào group có rotation
        // ✅ Add trực tiếp vào scene hoặc layer debug
        GAMEMANAGER.scene.add(line);

        setTimeout(() => {
            GAMEMANAGER.scene.remove(line);
            geometry.dispose();
            material.dispose();
        }, duration);
    }
    collectBlock(blockGroup, dir) {
        this.collected = true;

        console.log(`[Gate ${this.colorId}] Collect block:`, blockGroup.name);
        console.log(dir);

        const startPos = blockGroup.position.clone();
        const targetPos = startPos.clone().addScaledVector(dir.clone().normalize().negate(), 10);
        console.log(startPos);
        console.log(targetPos);

        // 🕒 Delay 0.1 giây trước khi bắt đầu
        gsap.delayedCall(0.1, () => {
            // 🎞 Di chuyển block trong 3 giây
            gsap.to(blockGroup.position, {
                x: targetPos.x,
                y: targetPos.y,
                z: targetPos.z,
                duration: 3,
                ease: "power2.inOut",

                // 🎯 Khi hoàn thành
                onComplete: () => {
                    blockGroup.visible = false;
                    console.log("Disappear");
                },
            });
        });
        this.animateScaleY(0.6, 0.15, 1.15, 0.5);
    }
    animateScaleY(targetScaleY = 0.5, durationDown = 0.3, delayHold = 2, durationUp = 0.7) {
        const group = this.group;
        const originY = group.scale.y;

        // Dừng animation cũ để tránh chồng hiệu ứng
        gsap.killTweensOf(group.scale);

        // 🔽 Giai đoạn 1: scale xuống nhanh
        gsap.to(group.scale, {
            y: targetScaleY,
            duration: durationDown,
            ease: "power2.in",
            onComplete: () => {
                // ⏸ Giữ nguyên trong delayHold giây
                gsap.delayedCall(delayHold, () => {
                    // 🔼 Giai đoạn 2: scale lên chậm hơn
                    gsap.to(group.scale, {
                        y: originY,
                        duration: durationUp,
                        ease: "power2.out",
                    });
                });
            },
        });
    }

    destroy() {
        EventBus.off("CHECK_GATE", this.onBlockMove.bind(this));
    }
}
