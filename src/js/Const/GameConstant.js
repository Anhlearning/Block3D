export default class GameConstant {
    // Danh sách block (nếu cần)
    static BLOCK_L = [
        // có thể chứa ID hoặc các tham chiếu khác
    ];
    static COLOR_DETAIL = {
        1: { color: 0xFF0003 },
        2: { color: 0x0061FF },
    }
    // Chi tiết từng loại block
    static BLOCK_DETAIL = {
        BLOCK_L: {
            name: "block_L",
            size: { x: 1, y: 2 },
            position: { x: -1.5, y: 0, z: -2.5 },
            rotation: { x: 0, y: 90, z: 0 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1, y: 0, z: 1 },
                    size: { x: 0.02, y: 0.02, z: 0.02 },
                    scale: { x: 100, y: 100, z: 100 },
                    center: { x: 0, y: 0.1, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1, y: 0, z: 3 },
                    size: { x: 0.02, y: 0.02, z: 0.02 },
                    scale: { x: 100, y: 100, z: 100 },
                    center: { x: 0, y: 0.1, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -3, y: 0, z: 1 },
                    size: { x: 0.02, y: 0.02, z: 0.02 },
                    scale: { x: 100, y: 100, z: 100 },
                    center: { x: 0, y: 0.1, z: 0 },
                },
            ]
        },
        // Có thể thêm nhiều loại block khác:
        BLOCK_T: {
            name: "BLOCK_T",
            size: { x: 3, y: 1, z: 2 },
            colliders: []
        }
    };
}
