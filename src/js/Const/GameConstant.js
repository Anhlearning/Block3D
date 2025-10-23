import { BoxGeometry, CircleGeometry, Group, MathUtils, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three";
import { BlockManagerPool } from "../Pooling/BlockPoolManager";
import { MaterialFactory } from "../Factory/MaterialFactory";
import { GAMEMANAGER } from "../Manager/GameManager";
import BlockGroup from "../Object/Block/BlockGroup";
import { Gate } from "../Object/Gate/Gate";
import { TOUCHMANAGER } from "../Manager/TouchManager";
import { createMaskMaterial } from "../Shader/MaskShader";
import { LockState, MoveType } from "../Object/Block/BlockScript";
import MapData from './MapData_Level1.json'
import DataMap from "three/src/renderers/common/DataMap.js";

export default class GameConstant {
    static mapX = MapData.MapSize.mapX;        // 6 cột
    static mapY = MapData.MapSize.mapY;        // 7 hàng
    static BLOCK_L = [
        // có thể chứa ID hoặc các tham chiếu khác
    ];
    static COLOR_DETAIL = {
        1: { color: 0xA2A1A1, name: "white" },
        2: { color: 0x3D40DB, name: "blue" },
        3: { color: 0x28BE9C, name: "xanhngoc" },
        4: { color: 0x007D15, name: "green" },
        5: { color: 0x68C00F, name: "greenyellow" },
        6: { color: 0xE07F4B, name: "cam" },
        7: { color: 0xFFAF8F, name: "camnhat" },
        8: { color: 0x7543AB, name: "timdam" },
        9: { color: 0xC83921, name: "red" },
        11: { color: 0xB0E5CE, name: "xanhngocnhat" },
        12: { color: 0xC38617, name: "vangdat" },
        13: { color: 0xF18CDE, name: "pink" },
        // nâu 
        10: { color: 0x8B7355, name: "naudat" },
        14: { color: 0x363636, name: "nauden" },
        16: { color: 0x7B1200, name: "naudo" },
        17: { color: 0x7B392C, name: "nauhatde" },
        18: { color: 0xFFE7BA, name: "Naube" },
        19: { color: 0x9D4201, name: "camdat" }, 
        20: { color: 0x8B5C31, name: "nau" }, 
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
            arrowZ: { x: 0.5000002, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5000002, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: -1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: -1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5000001, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5000002, y: 0, z: 1.5 },
            arrowX: { x: -0.5, y: 0, z: 1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -2.5 },
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
            arrowZ: { x: 2.5, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -2.5 },
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
            arrowZ: { x: 2.5, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: -1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: 2.5 },
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
            arrowZ: { x: 2.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -2.5 },
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
            arrowZ: { x: 2.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -1.5 },
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
            arrowZ: { x: 0, y: 0, z: -0.375 },
            arrowX: { x: -0.375, y: 0, z: 0 },
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
            arrowZ: { x: 0.5, y: 0, z: -1.5 },
            arrowX: { x: -0.375, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -0.375 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -2.5 },
            arrowX: { x: -0.375, y: 0, z: -1 },
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
            arrowZ: { x: 1, y: 0, z: -0.375 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -3.5 },
            arrowX: { x: -0.375, y: 0, z: -1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -0.375 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 1, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: -1 },
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
            arrowZ: { x: 1.5, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: 1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -1.5 },
            arrowX: { x: -0.5, y: 0, z: -0.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: 1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -2.5 },
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
            arrowZ: { x: 2.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: -1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: 0.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: 1.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -1.375 },
            arrowX: { x: -0.5, y: 0, z: -1.5 },
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
            arrowZ: { x: 0.5, y: 0, z: -2.5 },
            arrowX: { x: -0.5, y: 0, z: 1.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -1.5 },
            arrowX: { x: 0.675, y: 0, z: -0.5 },
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
            arrowZ: { x: 1.5, y: 0, z: -1.5 },
            arrowX: { x: 0.52, y: 0, z: 1.5 },
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
                            child.userData.isCollider = true;
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
                        boxMesh.position.set(-0.25, 0.5, -0.5);
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
                    MoveType: options.MoveType,
                    LockState: options.LockState,
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
        const MatrixMap = MapData.MatrixMap;
        for (const item of MatrixMap) {
            const object = this.createPrefab(item.name, item.type, item.options);
            object.position.set(...item.pos);
            if (item.options.rotation) {
                object.rotation.set(
                    MathUtils.degToRad(item.options.rotation.x || 0),
                    MathUtils.degToRad(item.options.rotation.y || 0),
                    MathUtils.degToRad(item.options.rotation.z || 0)
                )
            }
            if (item.name.includes("GATE")) {
                GAMEMANAGER.addObject(object, "Gate");
            }
            else {
                GAMEMANAGER.addObject(object, "Map");
            }
        }
    }
    static createBlock() {
        const MatrixBlock = MapData.MatrixBlock
        for (const item of MatrixBlock) {
            const object = this.createPrefab(item.name, item.type, item.options);
            object.group.position.set(...item.pos);
            if (item.options.rotation) {
                object.group.rotation.set(
                    MathUtils.degToRad(item.options.rotation.x || 0),
                    MathUtils.degToRad(item.options.rotation.y || 0),
                    MathUtils.degToRad(item.options.rotation.z || 0)
                )
            }
            GAMEMANAGER.addObject(object, "Block");
        }
    }
    static createFloor() {
        const cfg = MapData.MapSize;
        const sizeMatrix = cfg.mapX * cfg.mapY;
        for (let i = 0; i < sizeMatrix; i++) {
            const obj = this.createPrefab("Floor", "Geo", {});
            obj.position.set(MapData.FloorConfig.floorPositions[i].x, MapData.FloorConfig.floorPositions[i].y, MapData.FloorConfig.floorPositions[i].z);
            GAMEMANAGER.addObject(obj, "Geo");
        }
    }
    static createCubeMask() {
        const gateItems = MapData.MatrixMap.filter(item => item.name.includes("GATE"));
        for (const gate of gateItems) {
            const Size = this.GATE_DETAIL[gate.name].size;
            const { pos, options } = gate;
            let sizeX = 1.2;
            let sizeZ = 1.2;
            if (options?.directionCheck.includes("x")) {
                sizeZ *= Size;
                sizeX = 6;
            }
            else {
                sizeX *= Size;
                sizeZ = 6;
            }
            const mesh = new Mesh(new BoxGeometry(sizeX, 2.5, sizeZ), createMaskMaterial()); // mask nhỏ theo cổng
            mesh.position.set(...pos);
            mesh.renderOrder = 2001;

            if (options?.directionCheck) {
                switch (options.directionCheck) {
                    case "+x": mesh.position.x += 2.75; break;
                    case "-x": mesh.position.x -= 2.75; break;
                    case "+z": mesh.position.z += 2.75; break;
                    case "-z": mesh.position.z -= 2.75; break;
                }
            }
            GAMEMANAGER.addObject(mesh, "Geo");
        }
    }
}
