#version 300 es

in vec3 a_position;
in float a_tex_idx;

uniform mat4 u_projection_mat;
uniform mat4 u_view_mat;
uniform mat4 u_model_mat;
uniform float u_time;

out float v_tex_idx;

const float TIME_FACTOR = 40.0;
const float TIME_START = 0.0;
const float TIME_END = 1.0;
const float SPREAD_START = 6.0;
const float SPREAD_END = 1.0;
const float POINT_BASE_SIZE = 60.0;

void main() {
  v_tex_idx = a_tex_idx;

  float new_time = fract(u_time * 0.001);
  float t = clamp(new_time * TIME_FACTOR, TIME_START, TIME_END);
  float easeT = smoothstep(TIME_START, TIME_END, t);

  float spreadFactor = mix(SPREAD_START, SPREAD_END, easeT); 
  vec3 spreadPosition = a_position * spreadFactor;

  vec4 position = vec4(spreadPosition, 1.0);
  gl_Position = u_projection_mat * u_view_mat * u_model_mat * position;
  
  float distance_from_center = length(a_position.xy);
  gl_PointSize = POINT_BASE_SIZE - abs(distance_from_center);
}