#version 300 es

in vec3 a_position;
out float v_brightness;

uniform float u_time;
uniform bool u_is_mobile;

const float BRIGHTNESS_BASE = 0.7;
const float INTENSITY = 70.0;
const float MIN_POINT_SIZE = 0.5;
// const float MAX_SIZE_OFFSEST = u_is_mobile ? 2.0 : 1.2;

void main() {
  v_brightness = BRIGHTNESS_BASE 
               + BRIGHTNESS_BASE * sin(u_time + a_position.x * INTENSITY);
  gl_PointSize = MIN_POINT_SIZE + (u_is_mobile ? 2.0 : 1.2) * v_brightness;
  gl_Position = vec4(a_position, 1.0);
}