import { BoxGeometry, CircleGeometry, Group, MathUtils, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three";
import { BlockManagerPool } from "../Pooling/BlockPoolManager";
import { MaterialFactory } from "../Factory/MaterialFactory";
import { GAMEMANAGER } from "../Manager/GameManager";
import BlockGroup from "../Object/Block/BlockGroup";
import { Gate } from "../Object/Gate/Gate";
import { TOUCHMANAGER } from "../Manager/TouchManager";


export default class GameConstant {
    // Danh sách block (nếu cần)
    static BLOCK_L = [
        // có thể chứa ID hoặc các tham chiếu khác
    ];
    static COLOR_DETAIL = {
        1: { color: 0xffffff, name: "white" },
        2: { color: 0x3D40DB, name: "blue" },
        3: { color: 0x28BE9C, name: "xanhngoc" },
        4: { color: 0x007D15, name: "green" },
        5: { color: 0x68C00F, name: "greenyellow" },
        6: { color: 0xE07F4B, name: "cam" },
        7: { color: 0xFFAF8F, name: "camnhat" },
        8: { color: 0x7543AB, name: "timdam" },
        9: { color: 0xC83921, name: "red" },
        10: { color: 0x6F4327, name: "naudat" },
        11: { color: 0xB0E5CE, name: "xanhngocnhat" },
        12: { color: 0xC38617, name: "vangdat" },
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
    static GATE_DETAIL = {
        GATE1: {
            mesh: "gate1",
            size: 1,
        },
        GATE2: {
            mesh: "gate2",
            size: 2,
        },
        GATE3: {
            mesh: "gate3",
            size: 3,
        }
    }
    static MAP_DETAIL = {
        wall1: {
            mesh: "wall1",
            children: 1,
            rotation: { x: 0, y: 180, z: 0 },
            childrenPos: [
                new Vector3(0, 0, 0),
            ],
        },
        wall2: {
            mesh: "wall1",
            children: 2,
            rotation: { x: 0, y: 180, z: 0 },
            childrenPos: [
                new Vector3(0, 0, 0),
                new Vector3(0, 0, 1),
            ],
        },
        wall3: {
            mesh: "wall1",
            children: 3,
            rotation: { x: 0, y: 180, z: 0 },
            childrenPos: [
                new Vector3(0, 0, 0),
                new Vector3(0, 0, 1),
                new Vector3(0, 0, 2),
            ],
        },
        wall4: {
            mesh: "wall1",
            children: 4,
            rotation: { x: 0, y: 180, z: 0 },
            childrenPos: [
                new Vector3(0, 0, 0),
                new Vector3(0, 0, 1),
                new Vector3(0, 0, 2),
                new Vector3(0, 0, 3),
            ],
        },
        cornerTopLeft: {
            mesh: "corner",
            children: 1,
            rotation: { x: 0, y: 0, z: 0 },
            childrenPos: [
                new Vector3(0.5, 0, 0.5),
            ],
        },
        cornerTopRight: {
            mesh: "corner",
            children: 1,
            rotation: { x: 0, y: -90, z: 0 },
            childrenPos: [
                new Vector3(-0.5, 0, 0.5),
            ],
        },
        cornerBotLeft: {
            mesh: "corner",
            children: 1,
            rotation: { x: 0, y: 90, z: 0 },
            childrenPos: [
                new Vector3(0.5, 0, -0.5),
            ],
        },
        cornerBotRight: {
            mesh: "corner",
            children: 1,
            rotation: { x: 0, y: 180, z: 0 },
            childrenPos: [
                new Vector3(-0.5, 0, -0.5),
            ],
        },
    };
    static createPrefab(namePrefabs, Type, options = {}) {
        let detailPrefab = null;
        switch (Type) {
            case "Map":
                detailPrefab = this.MAP_DETAIL[namePrefabs];
                const childSize = detailPrefab.children;
                const nameMesh = detailPrefab.mesh;
                const gr = new Group();
                for (let i = 0; i < childSize; i++) {
                    const MeshChild = BlockManagerPool.acquire(nameMesh);
                    const mat = MaterialFactory.getLitMatBlock({
                        baseKey: "baseMap",
                        normalKey: "normalMap",
                        metallicKey: "specularMap",
                        color: 0xB59650,
                        roughness: 1,
                    });
                    MeshChild.traverse((child) => {
                        if (child.isMesh) {
                            child.material = mat;
                            child.material.needsUpdate = true;
                        }
                    });
                    if (namePrefabs.includes("corner")) {
                        const boxGeo = new BoxGeometry(0.5, 1, 0.5);
                        const boxMat = MaterialFactory.getUnlitMat("base");
                        const boxMesh = new Mesh(boxGeo, boxMat);
                        boxMesh.material.visible = false;
                        boxMesh.position.set(-0.25, 0.5, -0.25);
                        MeshChild.add(boxMesh);
                        MeshChild.rotation.set(
                            MathUtils.degToRad(detailPrefab.rotation.x || 0),
                            MathUtils.degToRad(detailPrefab.rotation.y || 0),
                            MathUtils.degToRad(detailPrefab.rotation.z || 0)
                        )
                        MeshChild.add(boxMesh);
                    }
                    else {
                        const boxGeo = new BoxGeometry(0.5, 1.5, 1);
                        const boxMat = MaterialFactory.getUnlitMat("base");
                        const boxMesh = new Mesh(boxGeo, boxMat);
                        boxMesh.name = "BOXMESH";
                        boxMesh.material.visible = false;
                        boxMesh.position.set(-0.45, 0.5, -0.5);
                        MeshChild.add(boxMesh);
                        MeshChild.rotation.set(
                            MathUtils.degToRad(detailPrefab.rotation.x || 0),
                            MathUtils.degToRad(detailPrefab.rotation.y || 0),
                            MathUtils.degToRad(detailPrefab.rotation.z || 0)
                        )
                        MeshChild.add(boxMesh);
                    }
                    MeshChild.position.copy(detailPrefab.childrenPos[i]);
                    gr.add(MeshChild);

                }

                // const circleGeo = new CircleGeometry(0.1, 32);
                // const circleMat = new MeshBasicMaterial({
                //     color: 0xff0000,
                //     wireframe: false,
                //     transparent: true,
                //     opacity: 0.8,
                // });
                // const circleMesh = new Mesh(circleGeo, circleMat);
                // circleMesh.rotation.x = -Math.PI / 2;
                // circleMesh.position.set(0, 0, 0);
                // gr.add(circleMesh);
                return gr;
            case "Gate":
                const Gate1 = new Gate({
                    colorId: options.colorId,
                    name: namePrefabs,
                    directionCheck: options.directionCheck,
                })
                return Gate1.group;
            case "Block":
                const block = new BlockGroup({
                    BlockName: namePrefabs,
                    colorId: options.colorId,
                    scene: GAMEMANAGER.scene,
                    camera: GAMEMANAGER.camera,
                    renderer: GAMEMANAGER.renderer,
                    physicsWorld: GAMEMANAGER.physicsWorld,
                });
                return block;
            case "Geo":
                const geo = new PlaneGeometry(1, 1, 1);
                const mat = MaterialFactory.getUnlitMat("floor", 0xF8E8C1);
                const mesh = new Mesh(geo, mat);
                mesh.rotation.x = -Math.PI / 2;
                return mesh;
            default:
                break;
        }

        return null;
    }

    static CreateMap() {
        const MatrixMap = [
            { name: "cornerTopLeft", type: "Map", pos: new Vector3(-4, 0, -2), options: {} },
            { name: "wall1", type: "Map", pos: new Vector3(-4, 0, -1.5), options: {} },
            { name: "GATE1", type: "Gate", pos: new Vector3(-4, 0, 0), options: { colorId: 9, directionCheck: "-x" } },
            { name: "GATE1", type: "Gate", pos: new Vector3(-4, 0, 1), options: { colorId: 3, directionCheck: "-x" } },
            { name: "GATE1", type: "Gate", pos: new Vector3(-4, 0, 2), options: { colorId: 12, directionCheck: "-x" } },
            { name: "GATE3", type: "Gate", pos: new Vector3(-4, 0, 4), options: { colorId: 4, directionCheck: "-x" } },
            { name: "wall2", type: "Map", pos: new Vector3(-4, 0, 5.5), options: {} },

            { name: "cornerBotLeft", type: "Map", pos: new Vector3(-4, 0, 8), options: {} },
            { name: "GATE2", type: "Gate", pos: new Vector3(-2.5, 0, 8), options: { colorId: 3, directionCheck: "+z" } },
            { name: "GATE2", type: "Gate", pos: new Vector3(-0.5, 0, 8), options: { colorId: 6, directionCheck: "+z" } },
            { name: "GATE1", type: "Gate", pos: new Vector3(1.0, 0, 8), options: { colorId: 8, directionCheck: "+z" } },
            { name: "GATE1", type: "Gate", pos: new Vector3(2.0, 0, 8), options: { colorId: 12, directionCheck: "+z" } },
            { name: "cornerBotRight", type: "Map", pos: new Vector3(3.0, 0, 8), options: {} },

            { name: "wall2", type: "Map", pos: new Vector3(3.0, 0, 7.5), options: { rotation: { x: 0, y: 180, z: 0 } } },
            { name: "GATE3", type: "Gate", pos: new Vector3(3.0, 0, 4.0), options: { colorId: 4, directionCheck: "+x" } },
            { name: "wall3", type: "Map", pos: new Vector3(3.0, 0, 2.5), options: { rotation: { x: 0, y: 180, z: 0 } } },
            { name: "GATE1", type: "Gate", pos: new Vector3(3.0, 0, -1), options: { colorId: 3, directionCheck: "+x" } },

            { name: "cornerTopRight", type: "Map", pos: new Vector3(3.0, 0, -2), options: {} },
            { name: "GATE2", type: "Gate", pos: new Vector3(-2.5, 0, -2), options: { colorId: 9, directionCheck: "-z" } },
            { name: "GATE2", type: "Gate", pos: new Vector3(-0.5, 0, -2), options: { colorId: 2, directionCheck: "-z" } },
            { name: "GATE2", type: "Gate", pos: new Vector3(1.5, 0, -2), options: { colorId: 8, directionCheck: "-z" } },
            // { name: "wall2", type: "Map", pos: new Vector3(3, 0, 5.5), options: {} },
            // { name: "GATE1", type: "Gate", pos: new Vector3(3, 0, 8), options: { colorId: 3, directionCheck: "+z" } },
        ]
        for (const item of MatrixMap) {
            const object = this.createPrefab(item.name, item.type, item.options);
            object.position.copy(item.pos);
            if (item.options.rotation) {
                object.rotation.set(
                    MathUtils.degToRad(item.options.rotation.x || 0),
                    MathUtils.degToRad(item.options.rotation.y || 0),
                    MathUtils.degToRad(item.options.rotation.z || 0)
                )
            }
            GAMEMANAGER.addScene(object);
        }
    }
    static createBlock() {
        const MatrixBlock = [
            { name: "BLOCK_L2x2D0", type: "Block", pos: new Vector3(0, 0, 2), options: { colorId: 3 } },
            { name: "BLOCK_Rectangle2x1", type: "Block", pos: new Vector3(-3, 0, -1), options: { colorId: 3 } },
            { name: "BLOCK_Rectangle2x1", type: "Block", pos: new Vector3(0, 0, -1), options: { colorId: 3 } },
            { name: "BLOCK_Rectangle1x2", type: "Block", pos: new Vector3(2, 0, 0), options: { colorId: 12 } },
            { name: "BLOCK_Rectangle1x1", type: "Block", pos: new Vector3(-2, 0, 0), options: { colorId: 8 } },
            { name: "BLOCK_Rectangle1x1", type: "Block", pos: new Vector3(1, 0, 0), options: { colorId: 9 } },
            { name: "BLOCK_Rectangle1x2", type: "Block", pos: new Vector3(-2, 0, 2), options: { colorId: 3 } },

        ]
        for (const item of MatrixBlock) {
            const object = this.createPrefab(item.name, item.type, item.options);
            object.group.position.copy(item.pos);
            if (item.options.rotation) {
                object.group.rotation.set(
                    MathUtils.degToRad(item.options.rotation.x || 0),
                    MathUtils.degToRad(item.options.rotation.y || 0),
                    MathUtils.degToRad(item.options.rotation.z || 0)
                )
            }
            GAMEMANAGER.addBlockObject(object.group);
            TOUCHMANAGER.addObject(object);
        }
    }
    static createFloor() {
        const MatrixFloor = [];
        const startX = -3;   // X đầu tiên
        const startZ = -1;     // Z đầu tiên
        const cols = 6;        // 6 cột
        const rows = 9;        // 7 hàng
        const spacing = 1;     // Khoảng cách mỗi ô

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = startX + col * spacing;
                const z = startZ + row * spacing;
                const y = -0.01; // hàng đầu tiên thấp hơn chút
                MatrixFloor.push({
                    name: "Floor",
                    type: "Geo",
                    pos: new Vector3(x, y, z),
                    options: {},
                });
            }
        }
        for (const item of MatrixFloor) {
            const object = this.createPrefab(item.name, item.type, item.options);
            object.position.copy(item.pos);
            if (item.options.rotation) {
                object.rotation.set(
                    MathUtils.degToRad(item.options.rotation.x || 0),
                    MathUtils.degToRad(item.options.rotation.y || 0),
                    MathUtils.degToRad(item.options.rotation.z || 0)
                )
            }
            GAMEMANAGER.scene.add(object);
        }
    }
}
