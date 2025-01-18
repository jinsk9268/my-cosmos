#version 300 es

in vec2 a_position;
out vec4 v_color;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_color = gl_Position * 0.5 + 0.5;
}
