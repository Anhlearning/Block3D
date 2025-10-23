// main.js
import PixiApp from "./core/PixiApp.js";
import ThreeApp from "./core/ThreeApp.js";
import Integrator from "./core/Integrator.js";
import singletonMap from "./LoadManager.js";
import { BlockManagerPool } from "./Pooling/BlockPoolManager.js";
(async () => {
  const editor = false;
  let threeApp = null;
  let pixiApp = null;
  threeApp = new ThreeApp();
  BlockManagerPool.Init(threeApp.scene, threeApp.camera, threeApp.renderer);
  await singletonMap.loadImage();  
  await BlockManagerPool.RegisterModels();
  await threeApp.awake();
  pixiApp = new PixiApp();
  await pixiApp.awake(threeApp.getContext());

  var itemLoading = document.getElementById("item-loading");
  if (itemLoading) itemLoading.style.display = "none";

  var itemLogo = document.getElementById("logo-falcon");
  if (itemLogo) itemLogo.style.display = "none";

  const integrator = new Integrator(pixiApp, threeApp, editor);
  pixiApp.editor = editor;
  const onResize = () => {
    threeApp.onResize();
    pixiApp.onResize();
  };  
  onResize();
  window.addEventListener("resize", onResize);
})();
