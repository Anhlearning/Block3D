export default class GameConstant {
    // Danh sách block (nếu cần)
    static BLOCK_L = [
        // có thể chứa ID hoặc các tham chiếu khác
    ];
    static COLOR_DETAIL = {
        1: { color: 0xffffff },
        2: { color: 0x6B57AD },
        3: { color: 0x28BE9C },
        4: { color: 0x007D15 },
        5: { color: 0x68C00F },
        6: { color: 0xE07F4B },
        7: { color: 0xFFAF8F },
        8: { color: 0x7543AB },
        9: { color: 0xC83921 },
        10: { color: 0x6F4327 },
        11: { color: 0xB0E5CE },
        12: { color: 0xC38617 },
    }
    // Chi tiết từng loại block
    static BLOCK_DETAIL = {
        //#region  L2x2
        BLOCK_L2x2D0: {
            name: "block_V",
            size: { x: 2, y: 2 },
            position: { x: -0.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: -90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L2x2D90: {
            name: "block_V",
            size: { x: 2, y: 2 },
            position: { x: -0.5, y: 0, z: -1.5 },
            rotation: { x: 0, y: 180, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L2x2D180: {
            name: "block_V",
            size: { x: 2, y: 2 },
            position: { x: 1.5, y: 0, z: -1.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L2x2D270: {
            name: "block_V",
            size: { x: 2, y: 2 },
            position: { x: 1.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        //#endregion
        //#region  L2x3 
        BLOCK_L2x3D0: {
            name: "block_L",
            size: { x: 2, y: 3 },
            position: { x: 1.5, y: 0, z: -2.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L2x3D90: {
            name: "block_L",
            size: { x: 3, y: 2 },
            position: { x: 2.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L2x3D180: {
            name: "block_L",
            size: { x: 2, y: 3 },
            position: { x: -0.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: -90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L2x3D270: {
            name: "block_L",
            size: { x: 3, y: 2 },
            position: { x: -0.5, y: 0, z: -1.5 },
            rotation: { x: 0, y: 180, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        //#endregion
        //#region  L3X2
        BLOCK_L3x2D0: {
            name: "block_L",
            size: { x: 3, y: 2 },
            position: { x: 2.5, y: 0, z: -1.5 },
            rotation: { x: 0, y: 180, z: 0 },
            scale: { x: -1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L3x2D90: {
            name: "block_L",
            size: { x: 2, y: 3 },
            position: { x: 1.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: -1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L3x2D180: {
            name: "block_L",
            size: { x: 2, y: 3 },
            position: { x: -0.5, y: 0, z: -0.5 },
            rotation: { x: 0, y: -90, z: 0 },
            scale: { x: -1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L3x2D270: {
            name: "block_L",
            size: { x: 2, y: 2 },
            position: { x: -0.5, y: 0, z: 1.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: -1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        //#endregion
        //#region L3x3
        BLOCK_L3x3D0: {
            name: "block_v",
            size: { x: 3, y: 3 },
            position: { x: -0.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: -90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_5",
                    position: { x: -0.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L3x3D90: {
            name: "block_v",
            size: { x: 3, y: 3 },
            position: { x: -0.5, y: 0, z: -2.5 },
            rotation: { x: 0, y: 180, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_5",
                    position: { x: -0.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L3x3D180: {
            name: "block_v",
            size: { x: 3, y: 3 },
            position: { x: 2.5, y: 0, z: -2.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_5",
                    position: { x: -0.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_L3x3D270: {
            name: "block_v",
            size: { x: 3, y: 3 },
            position: { x: 2.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_5",
                    position: { x: -0.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        //#endregion
        //#region  Plus3x3
        BLOCK_Plus3X3: {
            name: "block_plus",
            size: { x: 3, y: 3 },
            position: { x: 2.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_5",
                    position: { x: -1.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        //#endregion
        //#region  Rectangle
        BLOCK_Rectangle1x1: {
            name: "block_1x1",
            size: { x: 1, y: 1 },
            position: { x: 0.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_Rectangle1x2: {
            name: "block_1x2",
            size: { x: 1, y: 2 },
            position: { x: 0.5, y: 0, z: -1.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },

            ]
        },
        BLOCK_Rectangle2x1: {
            name: "block_1x2",
            size: { x: 2, y: 1 },
            position: { x: 1.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },

            ]
        },
        BLOCK_Rectangle1x3: {
            name: "block_1x3",
            size: { x: 1, y: 3 },
            position: { x: 0.5, y: 0, z: -2.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_Rectangle3x1: {
            name: "block_1x3",
            size: { x: 3, y: 1 },
            position: { x: 2.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_Rectangle1x4: {
            name: "block_1x4",
            size: { x: 1, y: 4 },
            position: { x: 0.5, y: 0, z: -3.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -3.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_Rectangle4x1: {
            name: "block_1x4",
            size: { x: 4, y: 1 },
            position: { x: 3.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -3.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_Rectangle2x2: {
            name: "block_2x2",
            size: { x: 2, y: 2 },
            position: { x: 1.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        //#endregion
        //#region  T 
        BLOCK_T3x2D0: {
            name: "block_T",
            size: { x: 3, y: 2 },
            position: { x: 2.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_T3x2D90: {
            name: "block_T",
            size: { x: 2, y: 3 },
            position: { x: -0.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: -90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_T3x2D180: {
            name: "block_T",
            size: { x: 3, y: 2 },
            position: { x: -0.5, y: 0, z: -1.5 },
            rotation: { x: 0, y: 180, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_T3x2D270: {
            name: "block_T",
            size: { x: 2, y: 3 },
            position: { x: 1.5, y: 0, z: -2.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -2.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_T3x3D0: {
            name: "block_t",
            size: { x: 3, y: 2 },
            position: { x: -0.5, y: 0, z: -0.5 },
            rotation: { x: 0, y: 180, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -1.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_5",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_T3x3D90: {
            name: "block_t",
            size: { x: 3, y: 3 },
            position: { x: 2.5, y: 0, z: -2.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -1.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_5",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_T3x3D180: {
            name: "block_t",
            size: { x: 3, y: 3 },
            position: { x: 2.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -1.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_5",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_T3x3D270: {
            name: "block_t",
            size: { x: 3, y: 3 },
            position: { x: -0.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: -90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -1.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_5",
                    position: { x: -2.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        //#endregion
        //#region  Z 
        BLOCK_Z3x2D90: {
            name: "block_Z",
            size: { x: 2, y: 3 },
            position: { x: 1.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_Z3x2D90Reverse: {
            name: "block_Z",
            size: { x: 2, y: 3 },
            position: { x: -0.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: -1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_Z3x2D0: {
            name: "block_Z",
            size: { x: 3, y: 2 },
            position: { x: 2.5, y: 0, z: -1.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        BLOCK_Z3x2D0Reverse: {
            name: "block_Z",
            size: { x: 3, y: 2 },
            position: { x: 2.5, y: 0, z: 0.5 },
            rotation: { x: 0, y: 90, z: 0 },
            scale: { x: -1, y: 1, z: 1 },
            colliders: [
                {
                    name: "Collider_1",
                    position: { x: -1.5, y: 0.5, z: -0.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_2",
                    position: { x: -0.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_3",
                    position: { x: -1.5, y: 0.5, z: -1.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
                {
                    name: "Collider_4",
                    position: { x: -0.5, y: 0.5, z: -2.5 },
                    size: { x: 1, y: 1, z: 1 },
                    scale: { x: 1, y: 1, z: 1 },
                    center: { x: 0, y: 0.01, z: 0 },
                },
            ]
        },
        //#endregion
    };
}
