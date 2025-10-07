
// EventKeys.js
export const EventKeys = Object.freeze({
  ADD_EXP: "AddExp",
  LEVEL_UP: "LevelUp",
  GAME_OVER: "GameOver"
  // … thêm các event khác ở đây
});

export class EventEmitter {
  constructor() {
    this.events = {}; // lưu danh sách eventName -> callback[]
  }

  // đăng ký lắng nghe
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  // hủy lắng nghe
  off(eventName, listener) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(l => l !== listener);
  }

  // phát sự kiện
  emit(eventName, data) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach(listener => listener(data));
  }
}

// ✅ Singleton cho toàn game
export const EventBus = new EventEmitter();
