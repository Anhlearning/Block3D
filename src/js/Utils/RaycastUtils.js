import { Raycaster, Vector2, Vector3, Plane } from 'three';

export class RaycastUtils {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();
    }
    static raycaster = new Raycaster();
    // ================== Mouse ==================
    getMouse(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        return this.mouse;
    }

    // ================== Raycast ==================
    raycastObjects(event, objects) {
        this.getMouse(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(objects);
        return intersects;
    }

    getFirstHit(event, objects) {
        const intersects = this.raycastObjects(event, objects);
        if (intersects.length > 0) {
            const hit = intersects[0];
            const worldPos = hit.point.clone();              // ✅ clone ra để dùng an toàn
            return { ...hit, worldPos };         // ✅ thêm thuộc tính worldPos
        }
        return null;
    }

    // ================== World Position ==================
    getWorldPosition(event, refPos, lockAxis = 'y') {
        this.getMouse(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);

        let plane;
        switch (lockAxis) {
            case 'x':
                plane = new Plane(new Vector3(1, 0, 0), 0);
                break;
            case 'z':
                plane = new Plane(new Vector3(0, 0, 1), 0);
                break;
            case 'y':
            default:
                plane = new Plane(new Vector3(0, 1, 0), 0);
                break;
        }

        const intersection = new Vector3();
        if (this.raycaster.ray.intersectPlane(plane, intersection)) {
            intersection[lockAxis] = refPos[lockAxis];
            return intersection;
        }
        return refPos.clone();
    }
    worldToScreen(worldPosition) {
        this.camera.updateMatrixWorld();
        const pos = worldPosition.clone().project(this.camera); // Đảm bảo rằng ma trận thế giới của camera đã được cập nhật
        return new Vector2(pos.x, pos.y);
    }
    screenToWorld({ x, y, planeHeight = 0 }) {
        const raycaster = new Raycaster();
        raycaster.setFromCamera(new Vector2(x, y), this.camera);

        // mặt phẳng song song XZ (sàn)
        const plane = new Plane(new Vector3(0, 1, 0), -planeHeight);
        const worldPos = new Vector3();

        const hit = raycaster.ray.intersectPlane(plane, worldPos);
        return hit ? worldPos : null; // null nếu không giao
    }
    static raycastFromPoint(origin, direction, targets, maxDistance = Infinity, ignoreParent = null) {
        const r = this.raycaster;
        r.ray.origin.copy(origin);
        r.ray.direction.copy(direction).normalize();
        r.near = 0;
        r.far = maxDistance;
        // Dùng mảng tạm để tránh tạo Set/List mới liên tục
        let filteredTargets = targets;

        // ✅ Cache ignore set cho parent — không tạo lại mỗi frame
        if (ignoreParent) {
            if (!ignoreParent.__ignoreSet) {
                const ignoreSet = new Set();
                const collectChildren = (obj) => {
                    ignoreSet.add(obj);
                    for (const c of obj.children) collectChildren(c);
                };
                collectChildren(ignoreParent);
                ignoreParent.__ignoreSet = ignoreSet;
            }
            filteredTargets = targets.filter(t => !ignoreParent.__ignoreSet.has(t));
        }

        const ray = r.ray;
        const filtered = [];

        for (let i = 0, len = filteredTargets.length; i < len; i++) {
            const mesh = filteredTargets[i];
            if (!mesh.geometry) continue;
            mesh.updateMatrixWorld(true);

            if (!mesh.geometry.boundingSphere) mesh.geometry.computeBoundingSphere();
            const sphere = mesh.geometry.boundingSphere;

            // cache world sphere
            if (!mesh._worldSphere) mesh._worldSphere = sphere.clone();
            mesh._worldSphere.center.copy(sphere.center).applyMatrix4(mesh.matrixWorld);
            mesh._worldSphere.radius = sphere.radius * mesh.matrixWorld.getMaxScaleOnAxis();            
            // nới biên 1 chút để tránh miss do làm tròn
            if (ray.intersectsSphere(mesh._worldSphere)) filtered.push(mesh);
        }
        return r.intersectObjects(filtered, false);
    }



}
