#version 300 es

precision highp float;

in float v_brightness;
out vec4 f_color;

struct settings {
  vec3 colors[3];
  float alpha_min;
  int alpha_max;
};

uniform float u_time;
uniform settings u_star_f;

void main() {
  float distance = length(gl_PointCoord - vec2(0.5));
  if(distance > 0.5) discard;

  vec3 final_color = mix(u_star_f.colors[0], u_star_f.colors[1], sin(u_time));
  final_color = mix(final_color, u_star_f.colors[2], sin(u_time)); 

  float alpha = smoothstep(u_star_f.alpha_min, float(u_star_f.alpha_max), sin(distance));

  f_color = vec4(final_color * v_brightness, alpha);
}