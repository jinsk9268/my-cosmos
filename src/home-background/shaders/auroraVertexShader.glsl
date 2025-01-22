#version 300 es

in vec2 a_position;
out vec2 v_uv;
out vec4 v_color;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);

  vec4 clip_to_uv = gl_Position * 0.5 + 0.5;
  v_uv = clip_to_uv.xy;
  v_color = clip_to_uv;
}
