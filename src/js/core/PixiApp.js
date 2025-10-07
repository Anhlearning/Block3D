// import { Application, Container, Text, TextStyle } from 'pixi.js';
import { EventBus, EventKeys } from "../Event/EventEmitter";
import singletonMap from "../LoadManager";
import { AnimatedSprite, Application, Container, Sprite } from "../PixiAlias";
import { UIFactory } from "../UI/UIFactory";
import bat_sheet from "../../assets/Image/UI/bat_sheet.png";
import gsap from "gsap";
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
    this.InitVariablesAFunc();
  }
  InitVariablesAFunc() {}
  update() {
    this.app.renderer.resetState();
    this.app.render({ container: this.app.stage });
  }
  createBatContainer() {
    this.batContainer = new Container();

    const batAnim = new AnimatedSprite(
      singletonMap.spriteSheets.get("bat_sheet"),
      true
    );
    batAnim.gotoAndPlay(0);
    batAnim.anchor.set(0.5);
    batAnim.animationSpeed = 0.4 + Math.random() * 0.5;

    this.batContainer.addChild(batAnim);

    return this.batContainer;
  }

  creatUI() {
    // this.ProgressBar = UIFactory.createProgressUI(
    //   singletonMap,
    //   this.ExpCurrentLevel,
    //   this.ExpTargetLevel
    // );
    // this.app.stage.addChild(this.ProgressBar);
    // this.LevelUpUI = UIFactory.createLevelUpUI(singletonMap);
    // this.app.stage.addChild(this.LevelUpUI);
    // this.EndGameUI = UIFactory.createEndGameUI(singletonMap);
    // UIFactory.ShowEndGameUI();
    // this.app.stage.addChild(this.EndGameUI);
  }
  onResize() {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    this.app.renderer.resize(screenW, screenH);
    const ratio = screenW / screenH;

    // this.bgStage.position.set(0, 0);
    // this.ProgressBar.x = window.innerWidth / 2;
    // this.ProgressBar.y = 50 * (screenH / 667);
    // this.batContainer.position.set(0, window.innerHeight + 20);
    // this.EndGameUI.x = screenW / 2;
    // this.EndGameUI.y = screenH / 2;
    // // this.LevelUpUI.x = screenW / 2;
    // // this.LevelUpUI.y = screenH / 2;

    // const scalableElements = [
    //   this.ProgressBar,
    //   this.EndGameUI,
    //   // this.LevelUpUI,
    // ];
    // const setScale = (scale) => {
    //   scalableElements.forEach((el) => el.scale.set(scale));
    // };

    // // Logic tính scale
    // if (ratio < 1) {
    //   if (ratio > 0.6) {
    //     if (screenH > 1020) {
    //       setScale(screenW / 500);
    //     } else if (screenH < 775) {
    //       setScale(screenH / 775);
    //     } else {
    //       const scale = Math.min(screenW / 375, screenH / 775);
    //       setScale(scale);
    //     }
    //   } else {
    //     if (screenH < 775) {
    //       setScale(screenH / 775);
    //     } else {
    //       setScale(1);
    //     }
    //   }
    // } else {
    //   if (screenH < 667) {
    //     setScale(screenH / 667);
    //   } else {
    //     setScale(screenW < 375 ? 1 : screenH / 667);
    //   }
    // }
  }
}
