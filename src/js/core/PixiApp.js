// import { Application, Container, Text, TextStyle } from 'pixi.js';
import { EventBus, EventKeys } from "../Event/EventEmitter";
import singletonMap from "../LoadManager";
import { AnimatedSprite, Application, Container, Sprite } from "../PixiAlias";
import { UIFactory } from "../UI/UIFactory";
import gsap from "gsap";
import { GAMEMANAGER } from "../Manager/GameManager";
import SOUNDMANAGER from "../Sound/SoundManager";
import CONFIG from "../Config";
export default class PixiApp {
  constructor() {
    this.app = new Application();
    this.editor = false;
    this.bgStage = new Container();
  }

  async awake(sharedContext) {
    await this.app.init({
      context: sharedContext,
      width: window.innerWidth,
      height: window.innerHeight,
      clearBeforeRender: false,
      antialias: true,
    });
    document.body.appendChild(this.app.canvas);
    await document.fonts.load('48px "Luckiest Guy"');
    await new Promise(requestAnimationFrame);
    this.app.stage.eventMode = "static";
    this.isEnd = false;
    this.currentBlockMatch = 0;
    this.timeCount = 90;
    this.isStarted = false;
    this.InitVariablesAFunc();
  }
  InitVariablesAFunc() {
    this.creatUI();
  }
  update() {
    this.app.renderer.resetState();
    if (this.isStarted && !this.isEnd) {
      this.timeCount -= GAMEMANAGER.delta;
      if (this.timeCount <= 0) {
        EventBus.emit(EventKeys.GAME_OVER);
        this.isEnd = true;
      }
      this.ClockUI.setTime(this.timeCount);
    }
    this.app.render({ container: this.app.stage });
  }
  updateExProgressBar() {
    SOUNDMANAGER.playBlockOut();
    this.currentBlockMatch++;
    UIFactory.setProgress(parseFloat((this.currentBlockMatch / GAMEMANAGER.BlockObjects.length).toFixed(2)), true);
    if (this.currentBlockMatch == GAMEMANAGER.BlockObjects.length) {
      EventBus.emit(EventKeys.LEVEL_UP);
    }
  }
  creatUI() {
    this.progressBar = UIFactory.createProgressUI(singletonMap);
    this.progressBar.visible = true;
    this.app.stage.addChild(this.progressBar);
    this.EndGameUI = UIFactory.createEndGameUI(singletonMap);
    this.app.stage.addChild(this.EndGameUI);
    this.Text = UIFactory.createTextTut();
    this.app.stage.addChild(this.Text);
    this.ClockUI = UIFactory.createClockUI(singletonMap, this.timeCount);
    this.ClockUI.visible = false;
    this.app.stage.addChild(this.ClockUI);

  }
  ActiveUI(value) {
    this.isStarted = true;
    this.Text.visible = value;
  }
  onResize() {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    this.app.renderer.resize(screenW, screenH);
    const ratio = screenW / screenH;

    this.EndGameUI.x = screenW / 2;
    this.EndGameUI.y = screenH / 2;
    this.progressBar.x = screenW / 2;
    this.progressBar.y = 80 * (screenH / 667);
    this.Text.x = screenW / 2;
    this.Text.y = screenH - 100 * (screenH / 667);
    this.ClockUI.x = screenW / 2;
    this.ClockUI.y = 70 * (screenH / 667);
    const scalableElements = [
      this.progressBar,
      this.EndGameUI,
      this.Text,
      this.ClockUI
      // this.LevelUpUI,
    ];
    const setScale = (scale) => {
      scalableElements.forEach(el => el.scale.set(scale));
    };
    // Logic tính scale
    if (ratio < 1) {
      if (ratio > 0.6) {
        if (screenH > 1020) {
          setScale(screenW / 500);
        } else if (screenH < 775) {
          setScale(screenH / 775);
        } else {
          const scale = Math.min(screenW / 375, screenH / 775);
          setScale(scale);
        }
      } else {
        if (screenH < 775) {
          setScale(screenH / 775);
        } else {
          setScale(1);
        }
      }
    } else {
      if (screenH < 667) {
        setScale(screenH / 667);
      } else {
        setScale(screenW < 375 ? 1 : screenH / 667);
      }
    }
    gsap.killTweensOf(this.Text.scale);
    const currentScale = this.Text.scale.x;
    if (CONFIG.PlayableAdsType != CONFIG.Adwords) {
      gsap.to(this.Text.scale, {
        x: 1.25 * currentScale,
        y: 1.25 * currentScale,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }
  }
}
