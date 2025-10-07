import {
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Texture,
  RepeatWrapping,
  SRGBColorSpace,
  LinearFilter,
} from "three";
import { gsap } from "gsap";
import singletonMap from "../../LoadManager";
// import { Vec3 } from "cannon-es";

export default class TutObject {
  constructor(scene) {
    this.scene = scene;
    this.CreateHandObject();
    this.CreateArrowObject();
  }

  CreateHandObject() {
    let handTex = singletonMap.get("handTex");
    if (!(handTex instanceof Texture)) {
      const img = handTex.texture?.source?.resource;
      handTex = new Texture(img);
      handTex.colorSpace = SRGBColorSpace;
      handTex.wrapS = handTex.wrapT = RepeatWrapping;
      handTex.minFilter = LinearFilter;
      handTex.magFilter = LinearFilter;
      handTex.needsUpdate = true;
    }
    const geo = new PlaneGeometry(1, 1);
    const mat = new MeshBasicMaterial({
      map: handTex,
      side: DoubleSide,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
    });
    this.Hand = new Mesh(geo, mat);
    this.Hand.renderOrder = 999;
    this.Hand.rotation.x = -Math.PI / 2;
    this.Hand.scale.set(0.5, 0.5, 0.5);
    this.Hand.visible = false;
    this.scene.add(this.Hand);
  }
  CreateArrowObject() {
    let arrowTex = singletonMap.get("arrow");
    if (!(arrowTex instanceof Texture)) {
      const img = arrowTex.texture?.source?.resource;
      arrowTex = new Texture(img);
      arrowTex.colorSpace = SRGBColorSpace;
      arrowTex.wrapS = arrowTex.wrapT = RepeatWrapping;
      arrowTex.minFilter = LinearFilter;
      arrowTex.magFilter = LinearFilter;
      arrowTex.needsUpdate = true;
    }
    const geo = new PlaneGeometry(0.5, 0.5);
    const mat = new MeshBasicMaterial({
      map: arrowTex,
      side: DoubleSide,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      opacity: 0.8,
    });
    this.arrow = new Mesh(geo, mat);

    this.arrow.rotation.x = Math.PI / 2;
    this.arrow.scale.set(0.4, 0.4, 0.4);
    this.arrow.visible = false;
    this.scene.add(this.arrow);
  }
  PlayTutorial(posStart, posEnd) {
    if (!this.Hand) return;
    this.Hand.visible = true;
    this.arrow.visible = true;
    posStart.y += 0.4;
    posStart.z += 0.2;
    posStart.x += 0.2;
    this.Hand.position.copy(posStart);
    this.arrow.position.set(posEnd.x, posEnd.y + 0.2, posEnd.z + 0);
    gsap.to(this.arrow.position, {
      y: this.arrow.position.y - 0.05,
      duration: 0.25,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    const scaleX = this.Hand.scale.x;
    const baseScale = { x: scaleX, y: scaleX, z: scaleX };
    this.Hand.scale.set(baseScale.x, baseScale.y, baseScale.z);
    // Clear animation cũ
    gsap.killTweensOf(this.Hand.position);
    gsap.killTweensOf(this.Hand.scale);
    gsap.killTweensOf(this.Hand.material);

    const tl = gsap.timeline({ repeat: -1 });

    // 1. Click-down bounce ở posStart
    tl.to(this.Hand.scale, {
      x: 0.35,
      y: 0.35,
      z: 0.35,
      duration: 0.25,
      ease: "power2.in",
    }).to(this.Hand.scale, {
      ...baseScale,
      duration: 0.25,
      ease: "power2.out",
    });
    // 2. Di chuyển tới posEnd
    tl.to(this.Hand.position, {
      x: posEnd.x + 0.1,
      y: posEnd.y + 0.4,
      z: posEnd.z + 0.4,
      duration: 1.2,
      ease: "power2.inOut",
    });

    // 3. Click-down bounce ở posEnd
    tl.to(this.Hand.scale, {
      x: 0.35,
      y: 0.35,
      z: 0.35,
      duration: 0.25,
      ease: "power2.in",
    }).to(this.Hand.scale, {
      ...baseScale,
      duration: 0.25,
      ease: "power2.out",
    });

    // 4. Fade out rồi delay
    tl.to(this.Hand.material, {
      opacity: 0,
      duration: 0.5,
      ease: "sine.inOut",
    });

    tl.set(this.Hand.position, posStart, "+=0.5");
    tl.set(this.Hand.material, { opacity: 1 });
  }
  StopTutorial() {
    if (this.timeline) {
      this.timeline.kill(); // ngắt mọi tween đang chạy
      this.timeline = null;
    }
    if (this.Hand) {
      this.Hand.visible = false; // ẩn đi
    }
    if (this.arrow) {
      this.arrow.visible = false;
    }
  }
}
