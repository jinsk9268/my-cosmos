#version 300 es

precision highp float;
precision mediump sampler2DArray;

in float v_tex_idx;

uniform sampler2DArray u_textures;
uniform vec2 u_resolution;

out vec4 f_color;

const float GLOW_FACTOR = 3.0;
const vec3 GLOW_COLOR = vec3(1.0, 0.5, 0.5);
const float TIME_SPEED = 0.4;

void main() {
  vec2 tex_coord = gl_PointCoord;
  vec4 tex = texture(u_textures, vec3(tex_coord, v_tex_idx));

  vec2 uv = gl_FragCoord.xy / u_resolution;
  float distance = length(uv - 0.5);
  float glow = exp(-distance * GLOW_FACTOR);

  vec3 color = vec3(uv, 0.5) + glow * GLOW_COLOR;
  f_color = tex * vec4(color, 1.0);
}