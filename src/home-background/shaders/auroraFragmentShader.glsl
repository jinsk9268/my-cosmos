#version 300 es

precision highp float;
precision highp sampler2D;

in vec2 v_uv;
in vec4 v_color;
out vec4 f_color;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_time;

const float COLOR_RANGE = 0.7;
const float COLOR_OFFSET = 0.3;
const float NOISE_FACTOR = 1.1;
const vec4 BACKGROUND_COLOR = vec4(0.0, 0.0, 0.0, 1.0);
const float SMOOTH_MIN = -1.0;
const float SMOOTH_MAX = 2.8;
const float WEIGHT_TIME_SPEED = 0.6;
const float WEIGHT_RANGE = 0.1;
const float WEIGHT_OFFSET = 0.9;

void main() {
  vec2 aspectRatio = vec2(u_resolution.x / u_resolution.y, 1.0);
  float dynamicScale = 0.5 + 0.05 * sin(u_time * 0.1);  // 시간에 따라 약간 변동
  vec2 moving_uv = v_uv * aspectRatio * dynamicScale + vec2(0.01 * sin(u_time * 0.1), 0.01 * cos(u_time * 0.1));
  vec4 noise = texture(u_texture, moving_uv);
  noise.rgb = pow(noise.rgb, vec3(NOISE_FACTOR));

  vec4 color = v_color;
  color.y = 0.0;
  color = sin(color) * COLOR_RANGE + COLOR_OFFSET;
  color += noise;

  vec4 base_background = BACKGROUND_COLOR;
  float weight = smoothstep(SMOOTH_MIN, SMOOTH_MAX, v_color.y);
  float weight_factor = sin(u_time * WEIGHT_TIME_SPEED) * WEIGHT_RANGE + WEIGHT_OFFSET;

  f_color = mix(base_background, color, weight * weight_factor);
}