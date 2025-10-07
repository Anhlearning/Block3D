export class Children {
  constructor({ child = null, children = null } = {}) {
    this.children = [];
    if (child) this.children.push(child);
    if (Array.isArray(children)) this.children.push(...children);
    this.owner = null;
  }

  getType() {
    return "Children";
  }

  onAttach(owner) {
    this.owner = owner;
    for (const node of this.children) {
      if (node) owner.group.add(node);
    }
  }

  onUpdate() {}

  onDestroy() {
    if (!this.owner) return;
    for (const node of this.children) {
      if (node && node.parent === this.owner.group)
        this.owner.group.remove(node);
    }
    this.owner = null;
  }

  add(node) {
    if (!node) return;
    this.children.push(node);
    if (this.owner) this.owner.group.add(node);
  }

  addMany(nodes) {
    if (!Array.isArray(nodes)) return;
    for (const n of nodes) this.add(n);
  }

  remove(node) {
    const idx = this.children.indexOf(node);
    if (idx !== -1) this.children.splice(idx, 1);
    if (this.owner && node?.parent === this.owner.group)
      this.owner.group.remove(node);
  }

  clear() {
    if (this.owner) {
      for (const node of this.children) {
        if (node?.parent === this.owner.group) this.owner.group.remove(node);
      }
    }
    this.children.length = 0;
  }

  setChildren(nodes) {
    this.clear();
    if (!Array.isArray(nodes)) return;
    this.children.push(...nodes);
    if (this.owner) {
      for (const node of nodes) if (node) this.owner.group.add(node);
    }
  }
}

export default Children;
