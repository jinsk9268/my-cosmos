#version 300 es

in vec2 a_position;
out vec2 v_uv; // [0, 1] 범위의 텍스처 좌표

void main() {
  v_uv = a_position * 0.5 + 0.5; // 클립 공간 좌표[-1, 1]를 텍스처 좌표로 변환

  gl_Position = vec4(a_position, 0.0, 1.0);
}
