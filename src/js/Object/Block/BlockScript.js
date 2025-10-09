import { Color } from "three";

export const LockState = Object.freeze({
  None: 0,
  Locked: 1,
});

export const MoveType = Object.freeze({
  Free: 0,
  Horizontal: 1,
  Vertical: 2,
});

export class BlockScript {
  constructor() {
    this.lockState = LockState.None;
    this.moveType = MoveType.Free;
    this.color = new Color(0xffffff); // mặc định trắng
  }
  onAttach(owner) {
    this.owner = owner;
  }
  getType() {
    return "BlockScript";
  }

  // ====== Lock State ======
  getLockState() {
    return this.lockState;
  }

  setLockState(state) {
    this.lockState = state;
  }

  // ====== Move Type ======
  getMoveType() {
    return this.moveType;
  }

  setMoveType(type) {
    this.moveType = type;
  }

  // ====== Color ======
  getColor() {
    return this.color;
  }

  setColor(value) {
    if (typeof value === "string") this.color.set(value);
    else if (value instanceof Color) this.color.copy(value);
  }

  // ====== Permission ======
  canMove() {
    return this.lockState === LockState.None;
  }
}
