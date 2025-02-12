#version 300 es

in vec3 a_position;
out float v_brightness;

uniform float u_time;

const float BRIGHTNESS_BASE = 0.5;
const float INTENSITY = 60.0;
const float MIN_POINT_SIZE = 0.5;
const float MAX_SIZE_OFFSEST = 3.5;

void main() {
  v_brightness = BRIGHTNESS_BASE 
               + BRIGHTNESS_BASE * sin(u_time + a_position.x * INTENSITY);
  gl_PointSize = MIN_POINT_SIZE + MAX_SIZE_OFFSEST * v_brightness;
  gl_Position = vec4(a_position, 1.0);
}