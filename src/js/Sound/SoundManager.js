import { Howl } from "howler";
import bgm from "../../assets/Sound/SFX_UI_BGM.mp3";
import blockclick from "../../assets/Sound/blockclick.mp3";
import blockout from "../../assets/Sound/BlockOut.mp3";
import blockdrop from "../../assets/Sound/drop.mp3";
import lose from "../../assets/Sound/lose.mp3";
import win from "../../assets/Sound/win.mp3";
import CONFIG from "../Config";

export class SoundManager {
  constructor() {
    this.sounds = {};

    window.audioThepn = this;
    this.add("bgm", bgm);
    this.add("blockclick", blockclick);
    this.add("blockout", blockout);
    this.add("blockdrop", blockdrop);
    this.add("lose", lose);
    this.add("win", win);
    // this.add("fillcake", fillcake);
    // this.add("putcake", putcake);
    // this.add("losegame", losegame);
    // this.add("fly", fly);
  }

  add(key, url, options = {}) {
    this.sounds[key] = new Howl({
      src: [url],
      preload: true,
      ...options,
    });
  }

  play(key, { loop = false, volume = 1.0 } = {}) {
    const sound = this.sounds[key];
    if (!sound) return;
    sound.volume(volume);
    sound.loop(loop);
    sound.play();
  }

  stop(key) {
    const sound = this.sounds[key];
    if (sound) sound.stop();
  }

  stopAll() {
    for (const key in this.sounds) {
      this.sounds[key].stop();
    }
  }

  unlockAll() {
    for (const key in this.sounds) {
      const sound = this.sounds[key];
      sound.mute(true);
      const id = sound.play();

      sound.once("play", () => {
        sound.stop(id);
        sound.mute(false);
      });
    }
  }
  playFly() {
    if (CONFIG.isPlaySound) this.play("fly", { volume: 1 });
  }
  playBG() {
    if (CONFIG.isPlaySound) this.play("bgm", { loop: true, volume: 0.5 });
  }
  playClickBlock() {
    if (CONFIG.isPlaySound) this.play("blockclick");
  }
  playDropBlock() {
    if (CONFIG.isPlaySound) this.play("blockdrop");
  }
  playBlockOut() {
    if (CONFIG.isPlaySound) this.play("blockout");
  }
  onVictory() {
    if (CONFIG.isPlaySound) this.play("win");
  }
  onLose() {
    if (CONFIG.isPlaySound) this.play("lose");
  }
  stopBG() {
    if (CONFIG.isPlaySound) SOUNDMANAGER.stop("bgm");
  }
}
export const SOUNDMANAGER = new SoundManager();

export default SOUNDMANAGER;
