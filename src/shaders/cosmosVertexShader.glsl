#version 300 es

in vec3 a_position;

uniform mat4 u_projection_mat;
uniform mat4 u_view_without_translate_mat;
uniform float u_time;

const vec3 RANDOM_SEED = vec3(12.9898, 78.233, 54.53);
const float RANDOM_FACTOR = 43758.5453;
const float STAR_MIN_SIZE = 1.0;
const float STAR_MAX_SIZE = 2.0;
const float SPEED_FACTOR = 0.5;
const float FLICKER_NOISE_SCALE = 60.0;
const float PI = 3.14159265359;
const float FLICKER_RANGE = 0.3;
const float FLICKER_OFFSET = 0.7;
const float FLICKER_EXTRA_THRESHOLD = 0.98;
const float FLICKER_EXTRA_INTENSITY = 0.5;

float random(vec3 seed) {
  return fract(sin(dot(seed, RANDOM_SEED)) * RANDOM_FACTOR);
}

void main() {
  gl_Position = u_projection_mat * u_view_without_translate_mat * vec4(a_position, 1.0);

  float star_size = STAR_MAX_SIZE + random(a_position) * STAR_MAX_SIZE;
  float flicker = sin(u_time * SPEED_FACTOR + random(a_position * FLICKER_NOISE_SCALE) * PI) * FLICKER_RANGE + FLICKER_OFFSET;
  if (random(a_position * FLICKER_NOISE_SCALE) > FLICKER_EXTRA_THRESHOLD) {
      flicker += FLICKER_EXTRA_INTENSITY; 
  }
  gl_PointSize = star_size * flicker;
}