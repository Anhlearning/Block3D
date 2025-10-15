import { ShaderMaterial, UniformsUtils } from "three";

export const MaskShader = {

    uniforms: {},

    vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

    fragmentShader: `
    void main() {
    // Không xuất ra màu — chỉ ghi depth buffer
       gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //   discard;
    }
  `
};

export function createMaskMaterial(hideColor = true) {
    const mat = new ShaderMaterial({
        uniforms: UniformsUtils.clone(MaskShader.uniforms),
        vertexShader: MaskShader.vertexShader,
        fragmentShader: MaskShader.fragmentShader,
        depthWrite: true,
        depthTest: true,
        colorWrite: !hideColor,  // bật màu để debug, tắt khi mask thật
        transparent: false
    });

    return mat;
}

