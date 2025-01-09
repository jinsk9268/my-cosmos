#version 300 es

in vec3 a_position;
out float v_brightness;

uniform float u_time;
uniform float u_intensity;
uniform float u_base_size;
uniform float u_size_offset;

void main() {
  v_brightness = 0.5 + 0.5 * sin(u_time + a_position.x * u_intensity);
  gl_PointSize = u_base_size + u_size_offset * v_brightness;
  gl_Position = vec4(a_position, 1.0);
}