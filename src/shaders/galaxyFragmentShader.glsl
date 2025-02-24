#version 300 es

precision highp float;
precision mediump sampler2DArray;

in float v_tex_idx;

uniform sampler2DArray u_textures;
uniform vec2 u_resolution;
uniform float u_time;

out vec4 f_color;

const float GLOW_FACTOR_BASE = 2.0;
const vec3 GLOW_COLOR = vec3(1.0, 0.5, 1.0);
const float TIME_SPEED = 0.4;
const float GLOW_RANGE = 0.5;
const float GLOW_OFFSET = 0.5;
const float COLOR_RANGE = 0.5;
const float COLOR_OFFSET = 0.5;

void main() {
  vec2 tex_coord = gl_PointCoord;
  vec4 tex = texture(u_textures, vec3(tex_coord, v_tex_idx));

  vec2 uv = gl_FragCoord.xy / u_resolution;
  float distance = length(uv - 0.5);
  float glow_factor = GLOW_FACTOR_BASE + (sin(u_time) * GLOW_RANGE + GLOW_OFFSET);
  float glow = exp(-distance * glow_factor);

  float b = sin(u_time * TIME_SPEED) * COLOR_RANGE + COLOR_OFFSET;
  vec3 color = vec3(uv, b) + glow * GLOW_COLOR;
  f_color = tex * vec4(color, 1.0);
}