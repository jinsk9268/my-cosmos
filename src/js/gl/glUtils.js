import { throwError, randomFloat } from "@/js/utils.js";
import { UNIFORM_TYPE } from "@/js/constants.js";

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
 * @param {number[]} arr
 * @returns {Float32Array} WebGL에 전달하기 위해 number 배열의 타입을 Float32Array로 변환해 반환
 */
export function numArrToF32Arr(arr = []) {
	return new Float32Array(arr);
}

/**
 * @param {number[]} rgb
 * @returns {number[]} RGB 컬러를 WebGL 자료형(Float32Array)에 맞게 변환해서 반환
 */
export function rgbToGLRgb(rgb) {
	return rgb.map((color) => color / 255);
}

/**
 * @param {any} value
 * @returns {boolean} 파라미터가 다차원 배열이면 true 반환, 아니면 false 반환
 */
export function isMultiDemensionArr(value) {
	return Array.isArray(value) && Array.isArray(value[0]);
}

/**
 * @param {number | Float32Array} value
 * @returns {string} glsl uniform 자료형 반환, 없는 경우 null 반환
 */
export function getUniformType(value) {
	const { UNIFORM_1_F, UNIFORM_2_FV, UNIFORM_3_FV, UNIFORM_4_FV, UNIFORM_1_I } = UNIFORM_TYPE;
	let type = null;

	if (typeof value === "number") {
		return Number.isInteger(value) ? UNIFORM_1_I : UNIFORM_1_F;
	}

	if (Array.isArray(value) || value.constructor === Float32Array) {
		const length = value.length;

		if (length === 2) return UNIFORM_2_FV;
		if (length === 3) return UNIFORM_3_FV;
		if (length === 4) return UNIFORM_4_FV;
	}

	return type;
}
