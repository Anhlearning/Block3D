// SpawnParticle.js
import { Vector3 } from 'three';
import { BatchedParticleRenderer, QuarksLoader } from 'three.quarks';

class SpawnParticle {
    constructor(scale) {
        this.scene = null;
        this.template = null;
        this.batchRenderer = null;
        this.loader = new QuarksLoader();
        this.groups = [];
        this.pendingSpawns = []; // Hàng đợi spawn theo thời gian
        this.scale = scale;
    }

    async init(scene, source) {
        this.scene = scene;
        this.batchRenderer = new BatchedParticleRenderer();
        this.scene.add(this.batchRenderer);
        const loader = new QuarksLoader(); // ✅ KHỞI TẠO loader đúng

        return new Promise((resolve) => {
            const handleLoadedObject = (obj) => {
                this.template = obj.clone(true);
                this.scene.add(obj); // ép compile shader

                obj.traverse((child) => {
                    if (child && child.type === 'ParticleEmitter' && child.system) {
                        child.system.autoDestroy = false;
                        child.system.stop();
                        this.batchRenderer.addSystem(child.system);
                    }
                });

                requestAnimationFrame(() => {
                    this.scene.remove(obj);
                    resolve(); // ✅ chỉ resolve sau khi compile xong
                });
            };

            if (typeof source === 'string') {
                loader.load(source, handleLoadedObject);
            } else {
                const parsed = loader.parse(source); // ✅ dùng loader của Quarks
                handleLoadedObject(parsed);
            }
        });
    }
    /**
     * Gọi để spawn hiệu ứng (delay tính bằng giây, mặc định 0)
     */
    spawn(position = new Vector3(0, 0, 0), delay = 0) {
        // console.log(this);

        if (!this.template || !this.scene) return;
        this.pendingSpawns.push({
            position,
            delay,
            elapsed: 0
        });
    }

    /**
     * Thực hiện spawn thực tế
     */
    _doSpawn(position) {
        const instance = this.template.clone(true);
        instance.scale.set(this.scale, this.scale, this.scale);
        instance.position.copy(position);
        instance.renderOrder = 999;

        this.scene.add(instance);
        this.groups.push(instance);
        instance.traverse((child) => {
            if (child.material) {
                child.material.depthTest = false;
                child.material.depthWrite = false;
                child.material.needsUpdate = true;
                child.renderOrder = 999;
            }
            if (child.type === 'ParticleEmitter') {
                this.batchRenderer.addSystem(child.system);
            }
        });

        if (instance.type === 'ParticleEmitter') {
            this.batchRenderer.addSystem(instance.system);
        }
    }

    /**
     * Gọi trong vòng lặp render
     */
    update(delta) {
        // Update particle renderer
        if (this.batchRenderer) this.batchRenderer.update(delta);

        // Xử lý các spawn đang chờ
        for (let i = this.pendingSpawns.length - 1; i >= 0; i--) {
            const spawn = this.pendingSpawns[i];
            spawn.elapsed += delta;
            if (spawn.elapsed >= spawn.delay) {
                this._doSpawn(spawn.position);
                this.pendingSpawns.splice(i, 1);
            }
        }
    }

    /**
     * Xoá tất cả emitter khỏi scene
     */
    clearAll() {
        for (const g of this.groups) {
            this.scene.remove(g);
        }
        this.groups = [];
        if (this.batchRenderer) this.batchRenderer.clear();
    }
}

export const CompleteVFX = new SpawnParticle(0.12);
export const PutVFX = new SpawnParticle(0.1);