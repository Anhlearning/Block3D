// LoadGLB.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import {
//     TextureAtlas,
//     SpineTexture,
//     AtlasAttachmentLoader,
//     SkeletonJson,
//     Spine
// } from '@esotericsoftware/spine-pixi-v8';
// import { Texture, Sprite } from 'pixi.js';
import { Texture, Sprite, Rectangle } from "./PixiAlias";
//#region  Model Assets
import block_plus from '../assets/Models/Cube+.glb';
import block_1x1 from '../assets/Models/Cube1x1.glb';
import block_1x2 from '../assets/Models/Cube1x2.glb';
import block_1x3 from '../assets/Models/Cube1x3.glb';
import block_1x4 from '../assets/Models/Cube1x4.glb';
import block_2x2 from '../assets/Models/Cube2X2.glb';
import block_2x3 from '../assets/Models/Cube2X3.glb';
import block_L from '../assets/Models/CubeL.glb';
import block_T from '../assets/Models/CubeT.glb';
import block_V from '../assets/Models/CubeV.glb';
import block_Z from '../assets/Models/CubeZ.glb';
import block_v from '../assets/Models/Cube_v.glb';
import block_t from '../assets/Models/Cube_t.glb';
import exit3 from '../assets/Models/exit3.glb';
import gate1 from '../assets/Models/Gate1.glb';
import gate2 from '../assets/Models/Gate2.glb';
import gate3 from '../assets/Models/Gate3.glb';
import gate4 from '../assets/Models/Gate4.glb';
import wall1 from '../assets/Models/wall1.glb';
import corner from '../assets/Models/Corner.glb';
import arrow from '../assets/Models/arrow.glb'
//#endregion

//#region ImagesAssets
import baseMap from '../assets/Image/Texture/XBlockUV.png';
import specularMap from '../assets/Image/Texture/XBlockUV_Rn.png';
import normapMap from '../assets/Image/Texture/XBlockUV_Rn_specular.png';
import floor from '../assets/Image/Env/Floor.png';
import Bg from '../assets/Image/Env/Bg.png';
//#endregion loadImage
export const modelMap = {
  'block_plus': block_plus,
  'block_1x1': block_1x1,
  'block_1x2': block_1x2,
  'block_1x3': block_1x3,
  'block_1x4': block_1x4,
  'block_2x2': block_2x2,
  'block_2x3': block_2x3,
  'block_T': block_T,
  'block_L': block_L,
  'block_V': block_V,
  'block_Z': block_Z,
  'block_v': block_v,
  'block_t': block_t,
  'exit3': exit3,
  'gate1': gate1,
  'gate2': gate2,
  'gate3': gate3,
  'gate4': gate4,
  'wall1': wall1,
  'corner': corner,
  'arrow': arrow,
};

const loader = new GLTFLoader();
export async function loadGLBFromBase64(base64WithPrefix) {
  const arrayBuffer = base64ToArrayBuffer(base64WithPrefix);
  return new Promise((resolve, reject) => {
    loader.parse(arrayBuffer, "", resolve, reject);
  });
}

function base64ToArrayBuffer(base64Data) {
  const base64 = base64Data.split(",")[1];
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export function loadSpine(options) {
  return new Promise((resolve, reject) => {
    const {
      imageBase64,
      atlasRaw,
      skeletonJson,
      imageName = "guiding.png",
      scale = 1,
    } = options;

    const img = new Image();
    img.src = imageBase64;

    img.onload = () => {
      try {
        const texture = Texture.from(img);
        const baseTexture = texture.source;

        const spineTexture = new SpineTexture(baseTexture);
        const textureMap = new Map();
        textureMap.set(imageName, spineTexture);

        const atlas = new TextureAtlas(atlasRaw, () => null);
        atlas.setTextures(textureMap);

        const attachmentLoader = new AtlasAttachmentLoader(atlas);
        const skeletonParser = new SkeletonJson(attachmentLoader);
        const skeletonData = skeletonParser.readSkeletonData(skeletonJson);

        const spineObj = new Spine(skeletonData);
        spineObj.scale.set(scale);

        resolve(spineObj);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("❌ Không thể load ảnh từ base64."));
    };
  });
}
// LoadImg.js

export function loadImage(imageSrc, scale = 1) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      try {
        const texture = Texture.from(img);
        const sprite = new Sprite(texture);

        sprite.anchor.set(0.5);
        sprite.scale.set(scale);

        resolve(sprite);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error("❌ Không thể load ảnh."));
    };
  });
}
export async function loadModel(key) {
  const glb = modelMap[key];
  if (!glb) throw new Error(`Model with key "${key}" not found.`);
  const gltf = await loadGLBFromBase64(glb);
  // gltf.scene.traverse((child) => {
  //     if (child.isMesh) {
  //         child.castShadow = true;
  //         child.receiveShadow = true;
  //     }
  // });
  return gltf.scene;
}
class SingletonMap {
  constructor() {
    this.map = null;
    this.inited = false;
    this.spriteSheets = new Map();
  }
  async loadSheet() {
    const Load = async (name, base64, col, row, w, h) => {
      let baseTexture = await loadImage(base64, 1);
      baseTexture = baseTexture.texture;
      const frames = [];
      for (let y = 0; y < col; y++) {
        for (let x = 0; x < row; x++) {
          frames.push(
            new Texture({
              source: baseTexture,
              frame: new Rectangle(x * w, y * h, w, h),
            })
          );
        }
      }
      this.spriteSheets.set(name, frames);
    };
    await Promise.all([
      // Load("name", "base64", col, row, w, h),
    ]);
  }

  async loadImage() {
    if (this.inited) return;
    const map = new Map();

    const load = async (key, src) => {
      const Texture = await loadImage(src, 1);
      map.set(key, Texture.texture);
    };

    await Promise.all([
      //load("key","src");
      load('baseMap', baseMap),
      load('specularMap', specularMap),
      load('normalMap', normapMap),
      load('floor', floor),
      load('bg', Bg),
    ]);

    this.map = map;
    this.inited = true;
  }

  get(key) {
    if (!this.map)
      throw new Error(
        `❗ SingletonMap chưa được init! Gọi await singletonMap.init(app) trước.`
      );
    return this.map.get(key);
  }

  has(key) {
    return this.map?.has(key);
  }

  getAll() {
    return this.map;
  }

  isReady() {
    return this.inited;
  }
}

const singletonMap = new SingletonMap();
export default singletonMap;
