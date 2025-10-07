import { Howl } from "howler";
import bgm from "../../assets/Sound/halloween-background-music-412348.mp3";
import pickCake from "../../assets/Sound/Sfx_Pick_Cake_1.mp3";
import moveCake from "../../assets/Sound/Sfx_Move_Cake.mp3";
import newCake from "../../assets/Sound/win.mp3";
import fillcake from "../../assets/Sound/Sfx_Fill_Cake.mp3";
import putcake from "../../assets/Sound/Sfx_Put_Cake.mp3";
import losegame from "../../assets/Sound/LoseGame.mp3";
import fly from "../../assets/Sound/fly.mp3";
import CONFIG from "../Config";

export class SoundManager {
  constructor() {
    this.sounds = {};

    window.audioThepn = this;
    this.add("bgm", bgm);
    this.add("pickCake", pickCake);
    this.add("moveCake", moveCake);
    this.add("victory", newCake);
    this.add("fillcake", fillcake);
    this.add("putcake", putcake);
    this.add("losegame", losegame);
    this.add("fly", fly);
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
  playClickCake() {
    if (CONFIG.isPlaySound) this.play("pickCake");
  }
  playMoveCake() {
    if (CONFIG.isPlaySound) {
      const sound = this.sounds["moveCake"];

      // Nếu âm thanh đang phát, đợi cho đến khi âm thanh kết thúc
      if (sound.playing()) {
        sound.once("end", () => {
          sound.play(); // Phát lại khi âm thanh kết thúc
        });
      } else {
        // Nếu âm thanh chưa được phát, trực tiếp phát nó
        sound.play();
      }
    }
  }
  playFillCake() {
    if (CONFIG.isPlaySound) this.play("fillcake");
  }
  playPutCake() {
    if (CONFIG.isPlaySound) this.play("putcake");
  }
  onVictory() {
    if (CONFIG.isPlaySound) this.play("victory");
  }
  onLose() {
    if (CONFIG.isPlaySound) this.play("losegame");
  }
  stopBG() {
    if (CONFIG.isPlaySound) SOUNDMANAGER.stop("bgm");
  }
}
export const SOUNDMANAGER = new SoundManager();

export default SOUNDMANAGER;
