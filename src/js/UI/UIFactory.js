// UIFactory.js
// import { Container, Sprite, Text, TextStyle, Graphics } from 'pixi.js';
import CONFIG from "../Config";
import { Container, Sprite, Text, Graphics, TextStyle } from "../PixiAlias";
import gsap from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
export class UIFactory {
  static createClockUI(map, seconds = 0) {
    const container = new Container();
    const bg = new Sprite(map.get('clock'));
    bg.anchor.set(0.5);
    bg.scale.set(0.4);
    container.addChild(bg);

    const style = new TextStyle({
      fontFamily: 'Luckiest Guy',
      fontSize: 20,
      fill: 0xffffff,
      stroke: {
        color: '#000000',
        width: 2
      },
      letterSpacing: 0.5
    });

    const label = new Text({
      text: UIFactory.formatTime(seconds),
      style: style
    });
    label.resolution = 4;
    label.anchor.set(0.5);
    label.x = 10;
    label.y = 0;
    container.addChild(label);

    container.label = label;

    container.setTime = (secs) => {
      container.label.text = UIFactory.formatTime(secs);
    };

    container.scale.set(1);
    return container;
  }
  static formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${min} : ${sec}`;
  }
  static createTextTut() {
    const container = new Container();
    const style = new TextStyle({
      fontFamily: 'Luckiest Guy',
      fontSize: 30,
      fill: 0xffffff,
      stroke: {
        color: '#000000',
        width: 3
      },
      letterSpacing: 0.55
    });

    const label = new Text({
      text: "Swipe to move",
      style: style
    });
    label.resolution = 4;
    label.anchor.set(0.5);
    label.x = 0;
    label.y = 0;
    container.addChild(label);

    return container;
  }
  static createProgressUI(map) {
    const container = new Container();
    const baby = new Sprite(map.get('baby'));
    const normal = new Sprite(map.get('normal'));
    const genius = new Sprite(map.get('genius'));
    const brain = new Sprite(map.get('brain'));
    const bgProgress = new Sprite(map.get('bgProgress'));
    const progressBar = new Sprite(map.get('progressBar'));

    bgProgress.anchor.set(0.5);
    bgProgress.scale.set(0.6, 0.6);
    bgProgress.position.set(0, 0);
    container.addChild(bgProgress);

    progressBar.anchor.set(0, 0.5);
    progressBar.position.set(-214.2705, 0);
    progressBar.scale.set(0, 1);
    bgProgress.addChild(progressBar);


    baby.anchor.set(0.5);
    baby.scale.set(0.3, 0.3);
    normal.anchor.set(0.5);
    normal.scale.set(0.3, 0.3);
    genius.anchor.set(0.5);
    genius.scale.set(0.3, 0.3);

    const segmentWidth = bgProgress.width / 3;

    baby.position.set(-bgProgress.width / 2 + segmentWidth * 0.35, -34);
    normal.position.set(-bgProgress.width / 2 + segmentWidth * 1.5, -37);
    genius.position.set(-bgProgress.width / 2 + segmentWidth * 2.75, -38);

    container.addChild(baby, normal, genius);

    brain.anchor.set(0.5, 0.5);
    brain.scale.set(0.8, 0.8);
    brain.position.set(-bgProgress.width / 2, 0);
    container.addChild(brain);
    this.progressBar = progressBar;

    container.setProgress = (value) => {
      const clamped = Math.max(0, Math.min(1, value));
      progressBar.scale.x = clamped;
    };
    return container;
  }
  static setProgress(value, animate = true) {
    const clamped = Math.max(0, Math.min(1, value));
    if (animate) {
      gsap.to(this.progressBar.scale, {
        x: clamped,
        duration: 0.8,
        ease: 'sine.out'
      });
    } else {
      progressBar.scale.x = clamped;
    }
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
    const cakeLogo = new Sprite(map.get("blockLogo"));
    const downLoadBtn = new Sprite(map.get("downloadbtn"));
    const handTut = new Sprite(map.get("handUI"));
    const glow = new Sprite(map.get("glow"));
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
    handTut.scale.set(0.4);
    handTut.position.set(10, 235);

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
