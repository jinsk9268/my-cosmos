#version 300 es

precision highp float;

in float v_brightness;
uniform float u_time;
out vec4 outColor;

void main() {
  vec2 center = gl_PointCoord - vec2(0.5);
  float distance = length(center);

  if(distance > 0.5) discard;

  float r = 0.7 + 0.25 * sin(u_time); 
  float g = 0.7 + 0.25 * sin(u_time + 2.0); 
  float b = 1.0; 

  outColor = vec4(vec3(r, g, b) * v_brightness, 1.0);
}