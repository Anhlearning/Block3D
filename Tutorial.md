# Base Project Documentation

## Kiến trúc tổng quan
Dự án được thiết kế với mô hình **kết hợp 3D (Three.js)** và **UI 2D (Pixi.js)**, tích hợp qua một vòng lặp chung để tối ưu hiệu năng và quản lý logic. Các thành phần chính gồm:

- **ThreeApp.js**  
  - Khởi tạo **Scene 3D**  
  - Thiết lập **Physics**, ánh sáng, background, …  

- **PixiApp.js**  
  - Quản lý **UI 2D** bằng PixiJS  
  - Có thể tạo trực tiếp UI trong `PixiApp` hoặc tách thành class riêng (tham khảo `UIFactory`)  

- **Integrator**  
  - Tích hợp `ThreeApp` và `PixiApp`  
  - Vòng lặp chung đồng bộ logic & render  

- **EventEmmiter.js**  
  - Đóng vai trò **Observer Pattern**  
  - Quản lý các sự kiện toàn cục giữa ThreeApp và PixiApp (ví dụ: Collection coin, …)  

---

## Hệ thống sự kiện & tương tác
- Các event **Click**, **Drag**, **Raycast** đã được viết sẵn trong:  
  - `Utils`  
  - `ObjectManager`  

---

## ObjectBase
Mọi đối tượng 3D kế thừa từ `ObjectBase`, hỗ trợ:  
- Tính **size**, tạo **shape**, khởi tạo **body** (khi `isBody = true` trong constructor)  
- Có thể ghi đè các hàm như:  
  - `onClick()`  
  - `onDrag()`  
  - …  
  → phục vụ cho logic riêng (ví dụ: scale, tween trong `TestBox`)  

---

## LogicManager
- Xử lý **logic gameplay** (ví dụ: match object, điều kiện thắng/thua, …)  

---

## Quản lý Asset & Pool
### LoadManager
- Import và load **assets** (Model, Image, Text, …)  
- Khai báo key trong `const modelMap` cho Model  hoặc `singletonMap` cho Sprite

### PoolManager
- Quản lý **object pooling** cho Model, Sprite, Text  
- **Đăng ký pool**:
  - Model:  
    ```js
    await poolManager.register('floor')
    ```
  - Sprite:  
    ```js
    await poolManager.register('sprite:itemss_1')
    ```
  - Text:  
    ```js
    await poolManager.register('text:text1')
    ```
- **Spawn object**:
  - Model:  
    ```js
    poolManager.getPoolMap().get(modelKey)?.acquire()
    ```
  - Sprite:  
    ```js
    poolManager.getPoolMap().get(`sprite:${spriteKey}`)?.acquire()
    ```
  - Text:  
    ```js
    poolManager.getPoolMap().get(`text:${textKey}`)?.acquire()
    ```

---

## VFX 3D
- Khởi tạo trong `SpawnParticle.js`  
- Export instance `VFX`  
- Dùng:  
  ```js
  VFX.Init(Scene, assetsImportVFX)



