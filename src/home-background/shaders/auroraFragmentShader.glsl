#version 300 es

precision highp float;

in vec2 v_uv;
in vec4 v_color;
out vec4 f_color;

struct settings {
  int smooth_min;
  float smooth_max;
  float weight_time_speed;
  float weight_min;
  float weight_max;
  int octaves;
  int frequency_multiplier;
  float amplitude_multiplier;
  int texture_scale;
};
uniform float u_time;
uniform settings u_aurora;

const vec2 RANDOM_SEED = vec2(12.9898, 78.233);
const float RANDOM_MULTIPLIER = 43758.5453123;

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
  float frequency = float(u_aurora.frequency_multiplier);

  for(int i = 0; i < u_aurora.octaves; i++) {
    value += amplitude * noise(uv);
    uv *= frequency; // 주파수 증가
    amplitude *= u_aurora.amplitude_multiplier; // 진폭 감소
  }

  return value;
}

void main() {
  vec4 color = v_color;
  color.y = 0.0;
  color = sin(color);

  color += fbm(v_uv * float(u_aurora.texture_scale));

  vec4 base_background = vec4(0.0, 0.0, 0.0, 1.0);
  float weight = smoothstep(float(u_aurora.smooth_min), u_aurora.smooth_max, v_color.y);
  float weight_factor = sin(u_time * u_aurora.weight_time_speed) * u_aurora.weight_min + u_aurora.weight_max;

  f_color = mix(base_background, color, weight * weight_factor);
}