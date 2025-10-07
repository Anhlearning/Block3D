import { ObjectPool } from './ObjectPool.js';
import { loadModel } from '../LoadManager.js';
import singletonMap from '../LoadManager.js';
import { modelMap } from '../LoadManager.js';
export class PoolManager {
  constructor() {
    this.pools = new Map();
  }

  async RegisterModels() {
    for (const key in modelMap) {
      if (!this.pools.has(key)) {
        await this.register(key);
      }
    }
  }
  async register(key) {
    if (this.pools.has(key)) return;
    if (key.startsWith('sprite:')) {
      const spriteKey = key.replace('sprite:', '');
      const template = singletonMap?.get(spriteKey);

      // Nếu là PIXI.Sprite thì clone đúng cách
      const pool = new ObjectPool(() => {
        const clone = new PIXI.Sprite(template.texture);
        clone.anchor.set(template.anchor.x, template.anchor.y);
        clone.scale.set(template.scale.x, template.scale.y);
        clone.visible = true;
        return clone;
      }, 10);

      pool.template = template;
      this.pools.set(key, pool);
    }
    else if (key.startsWith('text:')) {
      const textKey = key.replace('text:', '');
      const template = singletonMap?.get(textKey);
      if (!template) {
        console.warn(`❌ Không tìm thấy template trong map: ${textKey}`);
        return;
      }
      const pool = new ObjectPool(() => {
        const el = template.cloneNode(true);
        document.body.appendChild(el);
        return el;
      }, 10);
      pool.template = template;
      this.pools.set(key, pool);
    } else {
      const modelTemplate = await loadModel(key);
      const pool = new ObjectPool(() => modelTemplate.clone(), 24);
      pool.model = modelTemplate;
      this.pools.set(key, pool);
    }
  }

  acquire(key) {
    const pool = this.pools.get(key);
    if (!pool) {
      throw new Error(`No pool registered for key: ${key}`);
    }
    return pool.acquire();
  }

  release(key, model) {
    const pool = this.pools.get(key);
    if (pool) {
      pool.release(model);
    }
  }

  reset(key) {
    const pool = this.pools.get(key);
    if (pool) {
      pool.reset();
    }
  }

  getPoolMap() {
    return this.pools;
  }
}

