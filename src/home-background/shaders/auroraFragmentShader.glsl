#version 300 es

precision highp float;
precision highp sampler2D;

in vec2 v_uv;
in vec4 v_color;
out vec4 f_color;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_time;

const float SCALE_BASE = 0.5;
const float SCALE_OFFSET = 0.05;
const float MOVE_TIME_SPEED = 0.1;
const float ROTATING_BASE = 0.04;
const float COLOR_RANGE = 0.65;
const float COLOR_OFFSET = 0.35;
const float NOISE_FACTOR = 1.1;
const vec4 BACKGROUND_COLOR = vec4(0.0, 0.0, 0.0, 1.0);
const float SMOOTH_MIN = -1.0;
const float SMOOTH_MAX = 2.8;
const float WEIGHT_TIME_SPEED = 0.6;
const float WEIGHT_RANGE = 0.1;
const float WEIGHT_OFFSET = 0.9;
const float ALPHA_MIN = 0.0;
const float ALPHA_MAX = 4.0;

void main() {
  vec2 aspect_ratio = vec2(u_resolution.x / u_resolution.y, 1.0);
  float moving_scale = SCALE_BASE + SCALE_OFFSET * sin(u_time * MOVE_TIME_SPEED); 
  vec2 rotating_uv = vec2(ROTATING_BASE * sin(u_time * MOVE_TIME_SPEED), ROTATING_BASE * cos(u_time * MOVE_TIME_SPEED));
  vec2 moving_uv = v_uv * aspect_ratio * moving_scale + rotating_uv;
  vec4 noise = texture(u_texture, moving_uv);
  noise.rgb = pow(noise.rgb, vec3(NOISE_FACTOR));

  vec4 color = v_color;
  color.y = 0.0;
  color = sin(color) * COLOR_RANGE + COLOR_OFFSET;
  color += noise;

  vec4 base_background = BACKGROUND_COLOR;
  float weight = smoothstep(SMOOTH_MIN, SMOOTH_MAX, v_color.y);
  float weight_factor = sin(u_time * WEIGHT_TIME_SPEED) * WEIGHT_RANGE + WEIGHT_OFFSET;
  float alpha = smoothstep(ALPHA_MIN, ALPHA_MAX, u_time);

  f_color = mix(base_background, color, weight * weight_factor * alpha);
}