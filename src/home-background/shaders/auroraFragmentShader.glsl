#version 300 es

precision highp float;

in vec2 v_uv;
in vec4 v_color;
out vec4 f_color;

uniform float u_time;

const vec2 RANDOM_SEED = vec2(12.9898, 78.233);
const float RANDOM_MULTIPLIER = 43758.5453123;
const float SMOOTH_MIN = -1.0;
const float SMOOTH_MAX = 2.8;
const float WEIGHT_TIME_SPEED = 0.6;
const float WEIGHT_MIN = 0.2;
const float WEIGHT_MAX = 0.75;
const int OCTAVES = 6;
const float FREQUENCY_MULTIPLIER = 2.0;
const float AMPLITUDE_MULTIPLIER = 0.5;
const float TEXTURE_SCALE = 3.0;

float random(in vec2 uv) {
  return fract(sin(dot(uv.xy, RANDOM_SEED)) * RANDOM_MULTIPLIER);
}

float noise(in vec2 uv) {
  vec2 i = floor(uv);
  vec2 f = fract(uv);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) + 
          (c - a) * u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

float fbm(in vec2 uv) {
  float value = 0.0;
  float amplitude = 0.5;

  for(int i = 0; i < OCTAVES; i++) {
    value += amplitude * noise(uv);
    uv *= FREQUENCY_MULTIPLIER; // 주파수 증가
    amplitude *= AMPLITUDE_MULTIPLIER; // 진폭 감소
  }

  return value;
}

void main() {
  vec4 color = v_color;
  color.y = 0.0;
  color = sin(color);

  color += fbm(v_uv * TEXTURE_SCALE);

  vec4 base_background = vec4(0.0, 0.0, 0.0, 1.0);
  float weight = smoothstep(SMOOTH_MIN, SMOOTH_MAX, v_color.y);
  float weight_factor = sin(u_time * WEIGHT_TIME_SPEED) * WEIGHT_MIN + WEIGHT_MAX;

  f_color = mix(base_background, color, weight * weight_factor);
}