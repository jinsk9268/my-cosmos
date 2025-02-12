#version 300 es

precision highp float;

in float v_brightness;
out vec4 f_color;

uniform float u_time;
uniform vec3 u_colors[3];

const float ALPHA_MIN = 0.1;
const float ALPHA_MAX = 1.9;

void main() {
  float distance = length(gl_PointCoord - vec2(0.5));
  if(distance > 0.5) discard;

  vec3 final_color = mix(u_colors[0], u_colors[1], sin(u_time));
  final_color = mix(final_color, u_colors[2], sin(u_time)); 

  float alpha = smoothstep(ALPHA_MIN, ALPHA_MAX, sin(distance));

  f_color = vec4(final_color * v_brightness, alpha);
}