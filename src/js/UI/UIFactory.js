// UIFactory.js
// import { Container, Sprite, Text, TextStyle, Graphics } from 'pixi.js';
import CONFIG from "../Config";
import { Container, Sprite, Text, Graphics } from "../PixiAlias";
import gsap from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
export class UIFactory {
  static formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min} : ${sec}`;
  }
  static createProgressUI(map, currentPoint = 0, targetPoint = 100) {
    const container = new Container();

    // ----- Sprites gốc -----
    const BgProgress = new Sprite(map.get("BgProgress").texture);
    const CakeUI = new Sprite(map.get("CakeIconUI").texture);
    const ProgressBar = new Sprite(map.get("BgProgress").texture);

    // ----- Scale -----
    BgProgress.scale.set(0.35);
    ProgressBar.scale.set(0.35);
    CakeUI.scale.set(0.35);

    // ----- Màu nền & progress -----
    BgProgress.tint = 0x595959; // nền xám
    ProgressBar.tint = 0xffcd00; // fill trắng

    // ----- Anchor -----
    BgProgress.anchor.set(0.5);
    CakeUI.anchor.set(0.5);
    ProgressBar.anchor.set(0.5); // tạm thời center

    // ----- Vị trí -----
    const padding = 8;
    BgProgress.position.set(0, 0);
    CakeUI.position.set(BgProgress.width * 0.5 - padding, 0);
    ProgressBar.position.set(0, 0);

    // ===== Mask giữ nguyên hình dạng progress =====
    const barMask = new Graphics();
    barMask.beginFill(0xffcd00);
    barMask.drawRect(
      -BgProgress.width * 0.5,
      -BgProgress.height * 0.5,
      BgProgress.width * 0,
      BgProgress.height
    );
    barMask.endFill();

    // Gán mask cho ProgressBar
    ProgressBar.mask = barMask;

    // ----- Text hiển thị điểm -----
    const scoreText = new Text(`${currentPoint} / ${targetPoint}`, {
      fontFamily: "Luckiest Guy",
      fontSize: 20,
      fontWeight: "bold",
      fill: 0xffffff, // chữ trắng
      stroke: 0x000000, // viền đen
      strokeThickness: 3.5, // viền dày rõ nét
      letterSpacing: 0,
      align: "center",
    });
    scoreText.resolution = 2; // tăng độ nét trên màn hình high-DPI
    scoreText.anchor.set(0.5);
    scoreText.position.set(0, 0);

    // ----- Add vào container -----
    container.addChild(BgProgress);
    container.addChild(ProgressBar);
    container.addChild(barMask); // mask phải cùng container
    container.addChild(CakeUI);
    container.addChild(scoreText);

    // ----- Expose ra ngoài -----
    container.bg = BgProgress;
    container.bar = ProgressBar;
    container.barMask = barMask;
    container.icon = CakeUI;
    container.scoreText = scoreText;
    this.ProgressUI = container;
    return container;
  }
  static createLevelUpUI(map) {
    const container = new Container();
    // Overlay nền đen mờ
    const overlay = new Graphics();
    const padding = 5000;

    overlay.fill({ color: "#000000", alpha: 0.59 });
    overlay.rect(
      -padding,
      -padding,
      window.innerWidth + padding * 2,
      window.innerHeight + padding * 2
    );
    overlay.endFill();
    overlay.alpha = 1;
    container.addChild(overlay);
    container.overlay = overlay;

    // === Text NEW CAKE ===
    const newCakeText = new Text("NEW CAKE", {
      fontFamily: "Luckiest Guy",
      fontSize: 20,
      fill: 0xffffff, // trắng
      stroke: 0x000000, // viền đen
      strokeThickness: 3,
      align: "center",
    });
    newCakeText.resolution = 2;
    newCakeText.anchor.set(0.5);
    newCakeText.x = 0;
    newCakeText.y = -220;
    container.addChild(newCakeText);

    // === Text UNLOCKED ===
    const unlockedText = new Text("UNLOCKED", {
      fontFamily: "Luckiest Guy",
      fontSize: 30,
      fill: 0xffd700, // vàng
      stroke: 0x000000, // viền đen
      strokeThickness: 6,
      align: "center",
    });
    unlockedText.resolution = 2;
    unlockedText.anchor.set(0.5);
    unlockedText.x = 0;
    unlockedText.y = -180;
    container.addChild(unlockedText);

    //Icon
    const IconLevelCake = new Sprite(map.get("iconLevelup").texture);
    IconLevelCake.anchor.set(0.5);
    IconLevelCake.position.set(0, 0);
    container.addChild(IconLevelCake);
    // === Continue ===
    const continueText = new Text("Continue", {
      fontFamily: "Luckiest Guy",
      fontSize: 25,
      fill: 0xffffff,
      stroke: 0x000000,
      strokeThickness: 2,
      align: "center",
    });
    continueText.resolution = 2;
    continueText.anchor.set(0.5);
    continueText.x = 0;
    continueText.y = 200;
    container.addChild(continueText);

    // Gạch dưới cho Continue
    const underline = new Graphics();
    underline.beginFill(0xffffff);
    underline.drawRect(
      -continueText.width / 2,
      continueText.height / 2 + 4,
      continueText.width,
      3
    );
    underline.endFill();
    container.visible = false;
    continueText.addChild(underline);
    container.overlay = overlay;
    container.newcakeText = newCakeText;
    container.unlockedText = unlockedText;
    container.icon = IconLevelCake;
    container.continueText = continueText;
    this.LevelUpUI = container;
    return container;
  }
  static createBgUI(map, key) {
    const container = new Container();
    const bg = new Sprite(map.get(key).texture);
    bg.anchor.set(0.5);
    bg.scale.set(0.5);
    bg.position.set(0, 0);
    container.addChild(bg);
    return container;
  }
  static createEndGameUI(map) {
    const container = new Container();
    const cakeLogo = new Sprite(map.get("cakeLogoEffect").texture);
    // const iconCake = new Sprite(map.get('iconEndCard').texture);
    const downLoadBtn = new Sprite(map.get("downloadbtn").texture);
    const handTut = new Sprite(map.get("handUI").texture);
    const glow = new Sprite(map.get("glow").texture);
    const overlay = new Graphics();
    cakeLogo.anchor.set(0.5);
    cakeLogo.scale.set(0.7);
    cakeLogo.position.set(0, -50);

    // iconCake.anchor.set(0.5);
    // iconCake.scale.set(1);
    // iconCake.position.set(0, 0);

    downLoadBtn.anchor.set(0.5);
    downLoadBtn.scale.set(0.8);
    downLoadBtn.position.set(0, 210);

    handTut.anchor.set(0.5);
    handTut.scale.set(0.6);
    handTut.position.set(10, 230);

    glow.anchor.set(0.5);
    glow.position.set(0, 0);
    glow.scale.set(1.5, 1.5);
    const padding = 5000;

    overlay.fill({ color: "#000000", alpha: 0.8 });
    overlay.rect(
      -padding,
      -padding,
      window.innerWidth + padding * 2,
      window.innerHeight + padding * 2
    );
    overlay.endFill();
    overlay.alpha = 1;
    container.addChild(overlay);

    container.addChild(glow);
    container.addChild(cakeLogo);
    // container.addChild(iconCake);
    container.addChild(downLoadBtn);
    container.addChild(handTut);
    container.overlay = overlay;
    container.cakeLogo = cakeLogo;
    // container.icon = iconCake;
    container.downLoadBtn = downLoadBtn;
    container.handTut = handTut;
    container.glow = glow;

    this.EndGameUI = container;
    this.EndGameUI.visible = false;
    return container;
  }
  static ShowLevelUpUI() {
    const ui = this.LevelUpUI;
    if (!ui) return;

    this.LevelUpUI.visible = true;
    ui.overlay.alpha = 0;
    ui.newcakeText.scale.set(0);
    ui.unlockedText.scale.set(0);
    ui.icon.scale.set(0);
    ui.continueText.scale.set(0);

    const tl = gsap.timeline();

    // Overlay
    tl.to(ui.overlay, { alpha: 1, duration: 0.3 });

    // NEW CAKE
    tl.to(ui.newcakeText.scale, {
      x: 1.1,
      y: 1.1,
      duration: 0.35,
      ease: "back.out(2)",
    }).to(ui.newcakeText.scale, { x: 1, y: 1, duration: 0.15 });

    // UNLOCKED
    tl.to(
      ui.unlockedText.scale,
      {
        x: 1.1,
        y: 1.1,
        duration: 0.4,
        ease: "back.out(2)",
      },
      "-=0.1"
    ).to(ui.unlockedText.scale, { x: 1, y: 1, duration: 0.15 });

    // ICON
    tl.to(ui.icon.scale, {
      x: 1.2,
      y: 1.2,
      duration: 0.5,
      ease: "back.out(2)",
    }).to(ui.icon.scale, {
      x: 1,
      y: 1,
      duration: 0.2,
      ease: "power1.inOut",
    });

    // CONTINUE
    tl.to(
      ui.continueText.scale,
      {
        x: 1.1,
        y: 1.1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.1"
    ).to(ui.continueText.scale, { x: 1, y: 1, duration: 0.2 });

    if (CONFIG.PlayableAdsType != CONFIG.Adwords) {
      tl.call(() => {
        const gentleLoop = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        gentleLoop
          .to(
            ui.icon.scale,
            { x: 1.05, y: 1.05, duration: 0.4, ease: "power1.inOut" },
            0
          )
          .to(
            ui.icon,
            {
              x: "+=2",
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "sine.inOut",
            },
            0.1
          )
          .to(ui.icon.scale, {
            x: 1,
            y: 1,
            duration: 0.4,
            ease: "power1.inOut",
          });
      });
    }
  }
  static updateProgressUI(current, target) {
    if (!this.ProgressUI) return; // bảo vệ nếu chưa tạo

    const ui = this.ProgressUI;

    // Tính % tiến trình
    const percent = target > 0 ? current / target : 0;
    const clamped = Math.max(0, Math.min(1, percent));

    // Cập nhật text
    ui.scoreText.text = `${current} / ${target}`;

    // Vẽ lại mask theo phần trăm
    const bgWidth = ui.bg.width;
    const bgHeight = ui.bg.height;

    ui.barMask.clear();
    ui.barMask.beginFill(0xffffff);
    ui.barMask.drawRect(
      -bgWidth * 0.5,
      -bgHeight * 0.5,
      bgWidth * clamped,
      bgHeight
    );
    ui.barMask.endFill();
    const baseIconScale = { x: ui.icon.scale.x, y: ui.icon.scale.y };
    gsap.killTweensOf(ui.icon.scale);
    gsap.to(ui.icon.scale, {
      x: baseIconScale.x * 1.2,
      y: baseIconScale.y * 1.2,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });

    // --- Bounce cho bg ---
    const baseBgScale = { x: ui.scoreText.scale.x, y: ui.scoreText.scale.y };
    gsap.killTweensOf(ui.scoreText.scale);
    gsap.to(ui.scoreText.scale, {
      x: baseBgScale.x * 1.15,
      y: baseBgScale.y * 1.15,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power1.out",
    });
  }
  static ShowEndGameUI() {
    const ui = this.EndGameUI;
    if (!ui) return;
    // bật visible
    ui.visible = true;

    // scale gốc đã set trong createEndGameUI
    const cakeLogoScale = ui.cakeLogo.scale.x;
    // const iconCakeScale = ui.icon.scale.x;
    const btnScale = ui.downLoadBtn.scale.x;
    const handScale = ui.handTut.scale.x;
    const glowScale = ui.glow.scale.x;
    // reset trạng thái ban đầu
    ui.overlay.alpha = 0;
    ui.cakeLogo.scale.set(0);
    // ui.icon.scale.set(0);
    ui.downLoadBtn.scale.set(0);
    ui.handTut.scale.set(0);
    ui.glow.scale.set(0);

    const tl = gsap.timeline();

    // Overlay fade in
    tl.to(ui.overlay, { alpha: 1, duration: 0.3 });

    // Cake Logo
    tl.to(ui.cakeLogo.scale, {
      x: cakeLogoScale,
      y: cakeLogoScale,
      duration: 0.4,
      ease: "back.out(2)",
      onComplete: () => {
        // 🔹 Bounce timeline
        const tl = gsap.timeline();

        tl.to(ui.cakeLogo.scale, {
          x: cakeLogoScale * 1.2,
          y: cakeLogoScale * 0.85,
          duration: 0.18,
          ease: "sine.inOut",
        })
          .to(ui.cakeLogo.scale, {
            x: cakeLogoScale * 0.85,
            y: cakeLogoScale * 1.2,
            duration: 0.18,
            ease: "sine.inOut",
          })
          .to(ui.cakeLogo.scale, {
            x: cakeLogoScale * 1.1,
            y: cakeLogoScale * 0.9,
            duration: 0.18,
            ease: "sine.inOut",
          })
          .to(ui.cakeLogo.scale, {
            x: cakeLogoScale * 1.05,
            y: cakeLogoScale * 0.95,
            duration: 0.15,
            ease: "sine.inOut",
          })
          .to(ui.cakeLogo.scale, {
            x: cakeLogoScale * 0.95,
            y: cakeLogoScale * 1.05,
            duration: 0.15,
            ease: "sine.inOut",
          })
          .to(ui.cakeLogo.scale, {
            x: cakeLogoScale,
            y: cakeLogoScale,
            duration: 0.25,
            ease: "elastic.out(1, 0.4)",
          });
      },
    });

    gsap.to(ui.glow.scale, {
      x: glowScale * 1.15,
      y: glowScale * 1.15,
      duration: 1.2,
      ease: "sine.inOut",
    });

    // Download Btn
    tl.to(
      ui.downLoadBtn.scale,
      {
        x: btnScale,
        y: btnScale,
        duration: 0.4,
        ease: "back.out(2)",
      },
      "-=0.1"
    );

    // Hand Tut
    tl.to(
      ui.handTut.scale,
      {
        x: handScale,
        y: handScale,
        duration: 0.4,
        ease: "back.out(2)",
      },
      "-=0.1"
    );

    if (CONFIG.PlayableAdsType != CONFIG.Adwords) {
      tl.call(() => {
        // Hand click loop (nhấn + biến mất + xuất hiện lại)
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.5 }) // đợi 0.5s trước khi lặp
          // Nhấn xuống
          .to(
            ui.handTut,
            {
              rotation: -0.2,
              duration: 0.25,
              ease: "power2.inOut",
            },
            0
          )
          .to(
            ui.handTut.scale,
            {
              x: handScale * 0.85,
              y: handScale * 0.85,
              duration: 0.25,
              ease: "power2.inOut",
            },
            0
          )

          // Bật bounce về
          .to(ui.handTut, {
            rotation: 0,
            duration: 0.4,
            ease: "back.out(3)",
          })
          .to(
            ui.handTut.scale,
            {
              x: handScale,
              y: handScale,
              duration: 0.4,
              ease: "back.out(3)",
            },
            "<"
          )

          // Biến mất
          .to(ui.handTut, {
            alpha: 0,
            duration: 0.2,
            ease: "power1.inOut",
          })

          // Xuất hiện lại
          .to(ui.handTut, {
            alpha: 1,
            duration: 0.3,
            ease: "power1.inOut",
          });

        // Download Btn pulse loop
        const btnScale = ui.downLoadBtn.scale.x;
        gsap.to(ui.downLoadBtn.scale, {
          x: btnScale * 1.1,
          y: btnScale * 1.1,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.5,
          ease: "sine.inOut",
        });
        gsap.to(ui.glow, {
          rotation: "+=6.283",
          duration: 4,
          ease: "none",
          repeat: -1,
        });

        // const gentleLoop = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        // gentleLoop
        //   .to(ui.icon.scale, { x: 1.05, y: 1.05, duration: 0.4, ease: "power1.inOut" }, 0)
        //   .to(ui.icon, { x: "+=2", duration: 0.1, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.1)
        //   .to(ui.icon.scale, { x: 1, y: 1, duration: 0.4, ease: "power1.inOut" });
      });
    }
  }
  static playLevelUpAnimation() {
    const container = this.levelUpUI;
    container.visible = true;

    // Scale icon vào trước
    gsap.fromTo(
      container.icon.scale,
      { x: 0, y: 0 },
      {
        x: 1,
        y: 1,
        duration: 0.35,
        ease: "back.out(1.7)",
      }
    );

    // Chuẩn bị chữ
    const letters = container.levelText.text.split("");
    const letterSprites = [];
    container.levelText.text = "";

    // Tạo từng chữ cái riêng biệt
    letters.forEach((char, index) => {
      const charText = new Text({
        text: char,
        style: container.levelText.style,
      });
      charText.anchor.set(0.5);
      charText.x = index * 27 - (letters.length * 25) / 2;
      charText.y = container.levelText.y;
      container.addChild(charText);
      letterSprites.push(charText);

      // Animate scale từng chữ
      gsap.fromTo(
        charText.scale,
        { x: 0, y: 0 },
        {
          delay: 0.3 + index * 0.07,
          x: 1,
          y: 1,
          duration: 0.2,
          ease: "back.out(2)",
        }
      );
    });

    // Lắc icon sau khi chữ xong
    gsap.to(container.icon, {
      delay: 0.15 + letters.length * 0.07 + 0.1,
      y: container.icon.y - 10,
      duration: 0.15,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut",
    });

    // Tắt sau khi animation hoàn tất
    const totalDuration = 0.15 + letters.length * 0.07 + 0.7; // delay + animation + shake
    gsap.delayedCall(totalDuration, () => {
      // Scale icon nhỏ lại
      gsap.to(container.icon.scale, { x: 0.001, y: 0.001, duration: 0.2 });

      // Scale từng chữ nhỏ lại rồi destroy
      letterSprites.forEach((char, i) => {
        gsap.to(char.scale, {
          delay: i * 0.03,
          x: 0,
          y: 0,
          duration: 0.2,
          onComplete: () => char.destroy(),
        });
      });

      // Ẩn container sau chút delay
      gsap.delayedCall(0.1 + letterSprites.length * 0.03, () => {
        container.visible = false;
      });
    });
  }
  static SetActive(container, value) {
    container.visible = value;
  }
}
