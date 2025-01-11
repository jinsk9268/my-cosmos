#version 300 es

precision highp float;

in float v_brightness;
out vec4 f_color;

uniform vec3 u_color[3];
uniform float u_time;

void main() {
  float distance = length(gl_PointCoord - vec2(0.5));
  if(distance > 0.5) discard;

  vec3 final_color = mix(u_color[0], u_color[1], sin(u_time));
  final_color = mix(final_color, u_color[2], sin(u_time)); 

  float alpha = smoothstep(0.1, 0.9, sin(distance));

  f_color = vec4(final_color, alpha);
}