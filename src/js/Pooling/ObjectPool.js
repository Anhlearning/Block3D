export class ObjectPool {
  constructor(createFn, maxSize = 10) {
    this.createFn = createFn;
    this.maxSize = maxSize;
    this.stack = [];

    // Warm pool: tạo sẵn maxSize objects
    for (let i = 0; i < this.maxSize; i++) {
      const obj = this.createFn();
      this._deactivate(obj);
      this.stack.push(obj);
    }
  }

  acquire(...args) {
    let obj;
    if (this.stack.length === 0) {
      obj = this.createFn(...args);
    } else {
      obj = this.stack.pop();
    }
    this._activate(obj);
    return obj;
  }

  release(obj) {
    if (!obj) return;
    this._deactivate(obj);
    this.stack.push(obj);
  }

  reset() {
    // reset toàn bộ stack (set inactive hết)
    this.stack.forEach((obj) => this._deactivate(obj));
  }

  // ================= Helper =================
  _activate(obj) {
    if (obj.Group3D) {
      obj.Group3D.visible = true;
      obj.Group3D.active = true;
    } else {
      obj.visible = true;
      obj.active = true;
    }
  }

  _deactivate(obj) {
    if (obj.Group3D) {
      obj.Group3D.visible = false;
      obj.Group3D.active = false;
      if (obj.Group3D.parent) {
        obj.Group3D.parent.remove(obj.Group3D);
      }
    } else {
      obj.visible = false;
      obj.active = false;
      if (obj.parent) {
        obj.parent.remove(obj);
      }
    }
  }
}
