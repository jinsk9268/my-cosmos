import { throwError, randomFloat } from "@/js/utils.js";

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {string} source GLSL 소스 코드
 * @param {gl.VERTEX_SHADER | gl.FRAGMENT_SHADER} type
 * @returns {WebGLShader} shader 생성 성공 시 vertexShader or fragmentShader 반환 | 실패 시 에러 처리
 */
export function createShader(gl, source, type) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

	const errorMsg = gl.getShaderInfoLog(shader);
	gl.deleteShader(shader);
	throwError(errorMsg);
}

/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 * @returns {WebGLProgram} program 생성 성공 시 program 반환 | 실패 시 에러 처리
 */
export function createProgram(gl, vertexShader, fragmentShader) {
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;

	const errorMsg = gl.getProgramInfoLog(program);
	gl.deleteProgram(program);
	throwError(errorMsg);
}

/**
 * @param {object} param
 * @param {Float32Array} param.positions
 * @param {number} param.idx
 * @param {number} [param.x]
 * @param {number} [param.y]
 * @param {number} [param.z]
 */
export function setVec3XYZ({
	positions,
	idx,
	x = randomFloat(-1, 1),
	y = randomFloat(-1, 1),
	z = randomFloat(-1, 1),
}) {
	positions[idx] = x;
	positions[idx + 1] = y;
	positions[idx + 2] = z;
}

/**
 * @param {number[]} rgb
 * @returns RGB 컬러를 WebGL 자료형(Float32Array)에 맞게 변환해서 반환
 */
export function rgbToGL(rgb) {
	return rgb.map((color) => color / 255.0);
}
