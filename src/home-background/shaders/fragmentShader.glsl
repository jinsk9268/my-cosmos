#version 300 es

precision highp float;

in float v_brightness;
out vec4 f_color;

uniform vec3 u_color[3];
uniform float u_factor_1;
uniform float u_factor_2;

void main() {
  float distance = length(gl_PointCoord - vec2(0.5));
  if(distance > 0.5) discard;

  vec3 final_color = mix(u_color[0], u_color[1], u_factor_1);
  final_color = mix(final_color, u_color[2], u_factor_2); 
  f_color = vec4(final_color, 1.0);
}