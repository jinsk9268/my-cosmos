import { throwError } from "@/js/utils.js";

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
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 * @param {string} uniformName
 * @param {any} uniformValue
 */
export function setUniform1f(gl, program, uniformName, uniformValue) {
	const location = gl.getUniformLocation(program, uniformName);
	gl.uniform1f(location, uniformValue);
}
