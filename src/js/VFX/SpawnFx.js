import {
    Emitter,
    Rate,
    Span,
    Life,
    Body,
    Position,
    BoxZone,
    Vector3D,
    RadialVelocity,
    Mass,
    Radius,
    Rotate,
    Scale,
    Gravity,
} from "three-nebula";
import { BoxGeometry, Mesh, MeshLambertMaterial } from "three";

// 🔹 Hàm tạo emitter mới với hướng & màu tùy chọn
function createEmitter(color = "#00ffcc", direction = new Vector3D(0, 1, 0)) {
    const geometry = new BoxGeometry(0.2, 0.2, 0.2);
    const material = new MeshLambertMaterial({ color });
    const mesh = new Mesh(geometry, material);

    const emitter = new Emitter();
    emitter
        .setRate(new Rate(new Span(6, 7), new Span(0.015, 0.03)))
        .addInitializers([
            new Mass(1),
            new Radius(new Span(2, 5)),
            new Life(0.01, 1.0),
            new Body(mesh),
            new Position(new BoxZone(1, 1, 1)),
            new RadialVelocity(new Span(2.5, 5), direction, 10),
        ])
        .addBehaviours([
            new Rotate("random", "random"),
            new Scale(1, 0.1),
            new Gravity(0),
        ]);

    return { emitter, mesh };
}

// 🔸 Singleton Class
export default class CubeEmitterManager {
    static instance = null;

    constructor(particleSystem, scene) {
        if (CubeEmitterManager.instance) return CubeEmitterManager.instance;

        this.particleSystem = particleSystem;
        this.scene = scene;
        this.activeEmitters = [];

        CubeEmitterManager.instance = this;
    }

    static getInstance(particleSystem, scene) {
        if (!CubeEmitterManager.instance) {
            CubeEmitterManager.instance = new CubeEmitterManager(particleSystem, scene);
        }
        return CubeEmitterManager.instance;
    }

    // 🟢 Tạo emitter mới
    spawn(position, direction = new Vector3D(0, 1, 0), color = "#00ffcc", parent = null) {
        const { emitter, mesh } = createEmitter(color, direction);
        this.particleSystem.addEmitter(emitter);
        emitter.setPosition(position);
        emitter.emit();

        this.activeEmitters.push({ emitter, mesh, parent });
        return emitter;
    }

    // 🔴 Hủy emitter cụ thể
    despawn(emitter) {
        if (!emitter) return;
        try {
            emitter.destroy();            
            this.activeEmitters = this.activeEmitters.filter((e) => e.emitter !== emitter);
        } catch (err) {
            console.warn("Despawn error:", err);
        }
    }

    // 🧹 Hủy toàn bộ emitter đang hoạt động
    despawnAll() {
        for (const { emitter } of this.activeEmitters) {
            this.despawn(emitter);
        }
        this.activeEmitters = [];
    }
}
