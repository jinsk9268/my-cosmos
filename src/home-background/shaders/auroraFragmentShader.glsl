#version 300 es

precision highp float;

in vec4 v_color;
out vec4 f_color;

struct settings {
  float color_min;
  float color_max;
  vec4 base;
  int smooth_min;
  int smooth_max;
  float weight_time_speed;
  float weight_min;
  float weight_max;
  float color_alpha;
};

uniform float u_time;
uniform settings u_aurora;


void main() {
  vec4 color = v_color;
  color.y = 0.0;
  color = sin(color) * u_aurora.color_min + u_aurora.color_max;

  vec4 base = u_aurora.base;
  float weight = smoothstep(float(u_aurora.smooth_min), float(u_aurora.smooth_max), v_color.y);
  float weight_factor = sin(u_time * u_aurora.weight_time_speed) * u_aurora.weight_min + u_aurora.weight_max;
  vec4 background = mix(base, color * u_aurora.color_alpha, weight * weight_factor);

  f_color = background;
}