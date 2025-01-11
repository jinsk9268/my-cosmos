#version 300 es

precision highp float;

in vec2 v_uv;
out vec4 f_color;

uniform float u_time;
uniform vec3 u_aurora_colors[3];

void main() {
  vec2 uv = v_uv;

  uv.x -= cos(u_time * 0.4);

  vec3 aurora = mix(u_aurora_colors[0], u_aurora_colors[1], uv.x);
  aurora = mix(aurora, u_aurora_colors[2], uv.y);

  f_color = vec4(aurora, 1.0);
}