import { Raycaster, Vector2, Vector3, Plane } from 'three';

export class RaycastUtils {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();
    }

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
    static raycastFromPoint(origin, direction, targets, maxDistance = Infinity, ignoreParent = null) {
        const raycaster = new Raycaster(
            origin.clone(),
            direction.clone().normalize(),
            0,
            maxDistance
        );
        // ✅ Nếu có ignoreParent → loại bỏ nó và toàn bộ con của nó
        let filteredTargets  = targets;
        if (ignoreParent) {
            const ignoreList = new Set();

            // Duyệt đệ quy toàn bộ con cháu của ignoreParent
            const collectChildren = (obj) => {
                ignoreList.add(obj);
                for (const c of obj.children) collectChildren(c);
            };
            collectChildren(ignoreParent);

            filteredTargets = targets.filter(t => !ignoreList.has(t));
        }

        // ✅ intersectObjects(true) → quét cả các mesh con của các group
        return raycaster.intersectObjects(filteredTargets, true);

    }

}
