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

//#endregion

//#region ImagesAssets

//#endregion loadImage
export const modelMap = {};
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
