import CONFIG from "../Config";
import { EventBus, EventKeys } from "../Event/EventEmitter";
import { GAMEMANAGER } from "../Manager/GameManager";
import { SOUNDMANAGER } from "../Sound/SoundManager";
import { UIFactory } from "../UI/UIFactory";
export default class Integrator {
  constructor(pixiApp, threeApp, Iseditor = false) {
    CONFIG.onGameReady();
    this.pixiApp = pixiApp;
    this.threeApp = threeApp;
    this.endGame = false;
    this.editor = Iseditor;
    this.isfirstClick = false;
    this.timeCount = 0;
    this.timeFlyMax = 15;
    this.lastTime = performance.now();
    this.lastBatFlyTime = 0; // Thời gian lần bay dơi cuối cùng
    this.batFlyCooldown = 3; // Cooldown 3 giây giữa các lần bay
    CONFIG.onGameReady();
    const loop = (currentTime) => {
      const deltaTime = (currentTime - this.lastTime) / 1000;
      this.lastTime = currentTime;
      this.timeCount += deltaTime;
      this.threeApp.update();
      this.pixiApp.update();
      if (!this.endGame && !this.editor) {
        if (this.pixiApp.isEnd || this.threeApp.isEnd) {
          this.endGame = true;
          this.pixiApp.isEnd = true;
          this.threeApp.isEnd = true;
          CONFIG.onEndGame();
          setTimeout(() => {
            CONFIG.openLinkApp();
          }, 1500);
        }
      }
      requestAnimationFrame(loop);
    };
    this.registerGlobalEvents();
    requestAnimationFrame(loop);
  }
  registerGlobalEvents() {
    if (this.editor) return;
    EventBus.on(EventKeys.LEVEL_UP, () => {});
    EventBus.on(EventKeys.ADD_EXP, (type, countcombo) => {});
    EventBus.on(EventKeys.GAME_OVER, () => {});

    window.addEventListener("pointerdown", this.onPointerDown.bind(this));
    window.addEventListener("pointerup", this.onPointerUp.bind(this));
    document.addEventListener(
      "visibilitychange",
      this.onVisibilityChange.bind(this)
    );
  }

  onPointerDown() {
    if (this.endGame) {
      CONFIG.openLinkApp();
    }
  }

  onPointerUp() {
    if (!this.isfirstClick) {
      // SOUNDMANAGER.playBG();
      this.isfirstClick = true;
    }
  }

  onVisibilityChange() {
    if (document.hidden) {
      SOUNDMANAGER.stopAll();
    } else {
      // soundManager.playBG();
    }
  }
}
