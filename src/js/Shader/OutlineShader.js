import { AlwaysDepth, BackSide, Color, NormalBlending, ShaderMaterial } from "three";


export function createOutlineMaterial({
    color = 0xffffff,
    outlineWidth = 2.0,
  } = {}) {
    return new ShaderMaterial({
      uniforms: {
        outlineColor: { value: new Color(color) },
        outlineWidth: { value: outlineWidth },
      },
      vertexShader: `
        uniform float outlineWidth;
        varying vec4 vColor;
  
        void main() {
          // ✅ Tính vị trí trong view space (giống UnityObjectToViewPos)
          vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  
          // ✅ Chuyển normal sang view space (UNITY_MATRIX_IT_MV)
          vec3 viewNormal = normalize(normalMatrix * normal);
  
          // ✅ Đẩy vertex ra theo hướng normal * -viewPosition.z (gần camera hơn = mỏng hơn)
          float scale = -viewPosition.z * outlineWidth / 1000.0;
          viewPosition.xyz += viewNormal * scale;
  
          gl_Position = projectionMatrix * viewPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 outlineColor;
        void main() {
          gl_FragColor = vec4(outlineColor, 1.0);
        }
      `,
      side: BackSide,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: NormalBlending,
    });
  }
