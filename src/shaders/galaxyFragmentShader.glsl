#version 300 es

precision highp float;
precision mediump sampler2DArray;

in float v_tex_idx;

uniform sampler2DArray u_textures;

out vec4 f_color;

void main() {
  vec2 tex_coord = gl_PointCoord;
  vec4 tex = texture(u_textures, vec3(tex_coord, v_tex_idx));

  f_color = tex;
}