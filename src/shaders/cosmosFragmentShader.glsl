#version 300 es

precision highp float;

out vec4 f_color;

const vec4 STAR_COLOR = vec4(1.0, 1.0, 1.0, 1.0);

void main() {
  float distance = length(gl_PointCoord - vec2(0.5));
  if(distance > 0.5) discard;

  f_color = STAR_COLOR;
}