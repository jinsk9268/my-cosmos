#version 300 es

in vec3 a_position;
out float v_brightness;

struct settings {
  int intensity;
  float base_size;
  float size_offset;
  float brightness_base;
};

uniform float u_time;
uniform settings u_star_v;

void main() {
  v_brightness = u_star_v.brightness_base 
               + u_star_v.brightness_base * sin(u_time + a_position.x * float(u_star_v.intensity));
  gl_PointSize = u_star_v.base_size + u_star_v.size_offset * v_brightness;
  gl_Position = vec4(a_position, 1.0);
}