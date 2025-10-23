import CONFIG from "../Config";
import { EventBus, EventKeys } from "../Event/EventEmitter";
import { GAMEMANAGER } from "../Manager/GameManager";
import TutObject from "../Object/Other/TutObject";
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

    this.ObjectTut = new TutObject(threeApp.scene);
    console.log(GAMEMANAGER.BlockObjects[0].position);

    this.ObjectTut.PlayTutorial(GAMEMANAGER.BlockObjects[4].position, GAMEMANAGER.GateObjects[0].position);
    CONFIG.onGameReady();
    const loop = (currentTime) => {
      this.threeApp.update();
      this.pixiApp.update();
      // if (!this.endGame && !this.editor) {
      //   if (this.pixiApp.isEnd || this.threeApp.isEnd) {
      //     this.endGame = true;
      //     this.pixiApp.isEnd = true;
      //     this.threeApp.isEnd = true;
      //   }
      // }
      requestAnimationFrame(loop);
    };
    this.registerGlobalEvents();
    requestAnimationFrame(loop);
  }
  registerGlobalEvents() {
    if (this.editor) return;

    window.addEventListener("pointerdown", this.onPointerDown.bind(this));
    window.addEventListener("pointerup", this.onPointerUp.bind(this));
    document.addEventListener(
      "visibilitychange",
      this.onVisibilityChange.bind(this)
    );
    EventBus.on(EventKeys.BLOCK_COLLECTED, () => {
      this.pixiApp.updateExProgressBar();
    })
    EventBus.on(EventKeys.LEVEL_UP, () => {
      UIFactory.ShowEndGameUI();
      SOUNDMANAGER.onVictory();
      CONFIG.onEndGame();
      this.pixiApp.isEnd = true;
      this.threeApp.isEnd = true;
      this.endGame = true;
      setTimeout(() => {
        CONFIG.openLinkApp();
      }, 1500);
    })
    EventBus.on(EventKeys.GAME_OVER, () => {
      UIFactory.ShowEndGameUI();
      SOUNDMANAGER.onLose();
      CONFIG.onEndGame();
      this.pixiApp.isEnd = true;
      this.threeApp.isEnd = true;
      this.endGame = true;
      setTimeout(() => {
        CONFIG.openLinkApp();
      }, 1500);
    })
  }

  onPointerDown() {
    if (this.endGame) {
      CONFIG.openLinkApp();
    }
    if (!this.isfirstClick) {
      this.ObjectTut.StopTutorial();
      this.pixiApp.ActiveUI(false);
    }

  }

  onPointerUp() {
    if (!this.isfirstClick) {
      SOUNDMANAGER.playBG();
      this.isfirstClick = true;
    }
  }

  onVisibilityChange() {
    if (document.hidden) {
      SOUNDMANAGER.stopAll();
    } else {
      SOUNDMANAGER.playBG();
    }
  }
}
