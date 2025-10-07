import {
  Group,
  MeshBasicMaterial,
  PlaneGeometry,
  Mesh,
  LinearFilter,
  SRGBColorSpace,
  RepeatWrapping,
  Texture,
  DoubleSide,
  Vector3,
} from "three";
import singletonMap from "../../LoadManager";
import gsap from "gsap";
export default class ComboOject {
  constructor() {
    this.group = new Group();
    this.cakeScale = 0.8;
    this.cakePosOrigin = new Vector3(0, 0, 0);
  }
  async popupCakeLogo(pos, delay = 0) {
    // Delay trước khi spawn
    await new Promise((resolve) => setTimeout(resolve, delay)); // 200ms delay

    // Spawn object mới
    const cakeLogo = this.CreateGeometryFromTexture(
      "cakeLogoEffect",
      1,
      1,
      true
    );
    cakeLogo.position.copy(pos);
    cakeLogo.scale.set(0, 0, 0);

    const baseY = cakeLogo.position.y;

    return new Promise((resolve) => {
      gsap
        .timeline({
          onComplete: () => {
            // Destroy object sau khi animation hoàn thành
            this.group.remove(cakeLogo);
            cakeLogo.geometry.dispose();
            cakeLogo.material.dispose();
            resolve();
          },
        })
        .to(cakeLogo.scale, {
          x: this.cakeScale,
          y: this.cakeScale,
          z: this.cakeScale,
          duration: 0.5,
          ease: "back.out(2)",
        })
        .to(
          cakeLogo.position,
          {
            y: baseY + 0.2,
            duration: 0.3,
            ease: "power1.out",
          },
          "-=0.2"
        )
        .to(cakeLogo.position, {
          y: baseY + 0.5,
          duration: 0.5,
          ease: "power1.in",
        })
        .to(
          cakeLogo.material,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power1.in",
          },
          "<"
        );
    });
  }
  CreateGeometryFromTexture(NameText, Xgeo = 1, Ygeo = 1, isAddGroup = true) {
    const image = singletonMap.get(NameText).texture.source?.resource;
    const planeTexture = new Texture(image);
    planeTexture.minFilter = LinearFilter;
    planeTexture.magFilter = LinearFilter;
    planeTexture.colorSpace = SRGBColorSpace;
    planeTexture.needsUpdate = true;
    planeTexture.wrapS = planeTexture.wrapT = RepeatWrapping;
    planeTexture.repeat.set(1, 1);

    const mat = new MeshBasicMaterial({
      map: planeTexture,
      side: DoubleSide,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: true,
    });
    const geo = new PlaneGeometry(Xgeo, Ygeo);
    const mesh = new Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, 0, 0);
    if (isAddGroup) this.group.add(mesh);
    return mesh;
  }
  async popup(pos, number, delay = 0) {
    await new Promise((resolve) => setTimeout(resolve, delay)); // 200ms delay
    // Spawn combo group mới
    const comboGroup = new Group();
    comboGroup.position.copy(pos);
    comboGroup.scale.set(0.01, 0.01, 0.01);

    // Lưu gốc
    const baseY = comboGroup.position.y;
    const baseZ = comboGroup.position.z;

    // Tạo Combo mesh
    const meshCombo = this.CreateGeometryFromTexture("Combo", 3.5, 1, false);
    meshCombo.scale.set(0.2, 0.2);
    comboGroup.add(meshCombo);

    // Tạo X mesh
    const meshX = this.CreateGeometryFromTexture("X", 1, 1, false);
    meshX.position.set(-0.1, 0, 0.25);
    meshX.scale.set(0.25, 0.25);
    comboGroup.add(meshX);

    // Tạo số meshes
    const digits = number
      .toString()
      .split("")
      .map((d) => parseInt(d));
    const numberMeshes = [];
    digits.forEach((digit, i) => {
      const mesh = this.CreateGeometryFromTexture(
        digit.toString(),
        1,
        1,
        false
      );
      mesh.position.set(0.15 + i * 0.15, 0, 0.25);
      mesh.scale.set(0.25, 0.25);
      comboGroup.add(mesh);
      numberMeshes.push(mesh);
    });

    // Thêm combo group vào main group
    this.group.add(comboGroup);

    return new Promise((resolve) => {
      gsap
        .timeline({
          onComplete: () => {
            // Destroy tất cả objects sau khi animation hoàn thành
            this.group.remove(comboGroup);
            comboGroup.children.forEach((child) => {
              child.geometry.dispose();
              child.material.dispose();
            });
            resolve();
          },
        })
        // Scale vào
        .to(comboGroup.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.4,
          ease: "back.out(2)",
        })
        // Nhún lên (nâng cao Y + rơi xuống theo Z)
        .to(
          comboGroup.position,
          {
            y: baseY + 0.3, // nhảy cao hơn một chút
            z: baseZ + 0.2, // bắt đầu đi xuống
            duration: 0.3,
            ease: "power1.out",
          },
          "-=0.2"
        )
        // Tiếp tục rơi xuống + fade out
        .to(comboGroup.position, {
          y: baseY + 0.5, // nâng cao hơn tí
          z: baseZ + 0.5, // rơi sâu hơn xuống dưới
          duration: 0.5,
          ease: "power1.in",
        })
        .to(
          comboGroup.children.map((m) => m.material),
          {
            opacity: 0,
            duration: 0.5,
            ease: "power1.in",
          },
          "<"
        );
    });
  }
}
export const ComboEffectObj = new ComboOject();
