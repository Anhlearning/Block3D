// MaterialFactory.js
import {
  MeshBasicMaterial,
  Texture,
  RepeatWrapping,
  SRGBColorSpace,
  FrontSide,
  LinearFilter,
  DoubleSide,
  MeshStandardMaterial,
  Color,
  NoColorSpace,
  LinearSRGBColorSpace,
} from "three";
import singletonMap from "../LoadManager";

export class MaterialFactory {
  static materialCache = {};

  static getUnlitMat(textureKey = "base", color = null) {
    if (textureKey == "base") {
      const mat = new MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 1,
      });
      this.materialCache[textureKey] = mat;
      return mat;
    }
    if (this.materialCache[textureKey]) {
      return this.materialCache[textureKey];
    }

    // Lấy texture từ singletonMap
    let tex = singletonMap.get(textureKey);
    if (!(tex instanceof Texture)) {
      const img = tex.source?.resource;
      tex = new Texture(img);
      tex.colorSpace = SRGBColorSpace;
      tex.wrapS = tex.wrapT = RepeatWrapping;
      tex.minFilter = LinearFilter;
      tex.magFilter = LinearFilter;
      tex.needsUpdate = true;
    }
    tex.repeat.set(1, 1);
    tex.flipY = false;
    // Tạo material và cache
    const mat = new MeshBasicMaterial({
      map: tex,
      color: color,
      side: FrontSide,
      transparent: true,
      depthWrite: true,
    });

    this.materialCache[textureKey] = mat;
    return mat;
  }
  static getShadow(textureKey) {
    if (this.materialCache[`shadow_${textureKey}`]) {
      return this.materialCache[`shadow_${textureKey}`];
    }

    let tex = singletonMap.get(textureKey).texture.source?.resource;
    const texObj = new Texture(tex);
    texObj.colorSpace = SRGBColorSpace;
    texObj.wrapS = texObj.wrapT = RepeatWrapping;
    texObj.minFilter = LinearFilter;
    texObj.magFilter = LinearFilter;
    texObj.needsUpdate = true;

    const mat = new MeshBasicMaterial({
      map: texObj,
      side: DoubleSide,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      opacity: 0.8,
    });

    this.materialCache[`shadow_${textureKey}`] = mat;
    return mat;
  }
  static getDecorator(albedoKey, emissionKey) {
    const cacheKey = `decor_${albedoKey}_${emissionKey}`;
    if (this.materialCache[cacheKey]) {
      return this.materialCache[cacheKey];
    }

    // Lấy albedo texture
    let albedoTex = singletonMap.get(albedoKey);
    if (!(albedoTex instanceof Texture)) {
      const img = albedoTex.texture?.source?.resource;
      albedoTex = new Texture(img);
      albedoTex.colorSpace = SRGBColorSpace;
      albedoTex.wrapS = albedoTex.wrapT = RepeatWrapping;
      albedoTex.minFilter = LinearFilter;
      albedoTex.magFilter = LinearFilter;
      albedoTex.needsUpdate = true;
    }
    albedoTex.flipY = false;

    // Lấy emission texture
    let emissionTex = singletonMap.get(emissionKey);
    if (!(emissionTex instanceof Texture)) {
      const img = emissionTex.texture?.source?.resource;
      emissionTex = new Texture(img);
      emissionTex.colorSpace = SRGBColorSpace;
      emissionTex.wrapS = emissionTex.wrapT = RepeatWrapping;
      emissionTex.minFilter = LinearFilter;
      emissionTex.magFilter = LinearFilter;
      emissionTex.needsUpdate = true;
    }
    emissionTex.flipY = false;

    // Tạo material có albedo + emission
    const mat = new MeshStandardMaterial({
      map: albedoTex, // albedo (base color)
      emissiveMap: emissionTex, // bản đồ phát sáng
      emissiveIntensity: 1.2, // độ sáng
      emissive: 0xffffff, // màu sáng
      side: FrontSide,
      transparent: true,
      depthWrite: true,
      toneMapped: true,
    });

    this.materialCache[cacheKey] = mat;
    return mat;
  }
  static getLitMatBlock({
    GroupName = "Block",
    baseKey,
    normalKey,
    metallicKey,
    color,
    roughness = 0.3
  }) {
    // 🔹 Tạo cache key chỉ theo màu
    const colorHex =
      typeof color === "number"
        ? color.toString(16).padStart(6, "0")
        : new Color(color).getHexString();
    const cacheKey = [
      GroupName,
      baseKey || "none",
      normalKey || "none",
      metallicKey || "none",
      colorHex,
      roughness.toFixed(3),
    ].join("_");

    if (this.materialCache[cacheKey]) {
      return this.materialCache[cacheKey];

    }

    // ===== Helper load texture =====
    const loadTex = (key) => {
      let tex = singletonMap.get(key);
      if (!(tex instanceof Texture)) {
        const img = tex.source?.resource;
        tex = new Texture(img);
        tex.wrapS = tex.wrapT = RepeatWrapping;
        tex.minFilter = LinearFilter;
        tex.magFilter = LinearFilter;
        tex.needsUpdate = true;
      }

      // auto set đúng colorSpace
      if (key.includes("base")) tex.colorSpace = SRGBColorSpace;
      else tex.colorSpace = LinearSRGBColorSpace;

      tex.flipY = false;
      tex.repeat.set(1, 1);
      return tex;
    };

    // ===== Load các texture =====
    const baseMap = loadTex(baseKey);
    const normalMap = loadTex(normalKey);   // ✅ dùng linear space
    const metallicMap = loadTex(metallicKey);

    // ===== Material chính =====
    const mat = new MeshStandardMaterial({
      map: baseMap,
      normalMap: normalMap || null,
      roughnessMap: metallicMap || null,  // unity smoothness (A)
      color: new Color(color),
      roughness: roughness,               // unity smoothness -> roughness
      // side: FrontSide,
      // transparent: false,
      // depthWrite: true,
      // toneMapped: true,
    });

    // ✅ Cache theo màu
    this.materialCache[cacheKey] = mat;
    return mat;
  }

}
