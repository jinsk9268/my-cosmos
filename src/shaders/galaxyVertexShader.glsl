#version 300 es

in vec3 a_position;
in float a_tex_idx;

uniform mat4 u_projection_mat;
uniform mat4 u_view_mat;
uniform mat4 u_model_mat;

out float v_tex_idx;

void main() {
  vec4 position = vec4(a_position, 1.0);
  
  gl_PointSize = 40.0;
  gl_Position = u_projection_mat * u_view_mat * u_model_mat * position;
  v_tex_idx = a_tex_idx;
}