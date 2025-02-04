import { throwError, isNull } from "@/js/utils.js";
import {
	createShader,
	createProgram,
	getUniformType,
	numArrToF32Arr,
	isMultiDemensionArr,
} from "@/js/gl/glUtils.js";
import { ERROR_MSG } from "@/js/constants.js";

class GLPipeline {
	/**
	 * WebGL 파이프라인 관리 (shader, program, buffer, vao 생성 및 관리)
	 * @param {WebGL2RenderingContext} gl
	 * @param {string} vertexSource
	 * @param {string} fragmentSource
	 */
	constructor(gl, vertexSource, fragmentSource) {
		this.gl = gl;
		this.vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER);
		this.fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
		this.program = createProgram(gl, this.vertexShader, this.fragmentShader);
		this.vertexBuffer = this.gl.createBuffer();
		this.vertexArray = this.gl.createVertexArray();
	}

	useProgram() {
		this.gl.useProgram(this.program);
	}

	/**
	 * @param {string} name
	 * @returns {GLint} attribute location 반환
	 */
	getAttribLocation(name) {
		return this.gl.getAttribLocation(this.program, name);
	}

	/**
	 * @param {string} name
	 * @returns {WebGLUniformLocation} uniform location 반환
	 */
	getUniformLocation(name) {
		return this.gl.getUniformLocation(this.program, name);
	}

	/**
	 * @param {string} name
	 * @param {object} [struct]
	 */
	sendUniformStruct(name, struct = {}) {
		Object.entries(struct).forEach(([key, value]) => {
			const type = getUniformType(value);

			if (isNull(type)) throwError(`${key} ${ERROR_MSG.NO_TYPE}`);

			if (isMultiDemensionArr(value)) {
				const flatArr = value.flat();
				const arrHasFloat = flatArr.some((num) => !Number.isInteger(num));
				value = arrHasFloat ? numArrToF32Arr(flatArr) : flatArr;
			}

			this.gl[type](this.getUniformLocation(`${name}.${key}`), value);
		});
	}

	/**
	 * @param {Object} param
	 * @param {GLint} param.location
	 * @param {boolean} [param.transpose]
	 * @param {Float32List} param.data
	 */
	sendUniformMatrix({ location, transpose = false, data }) {
		this.gl.uniformMatrix4fv(location, transpose, data);
	}

	/**
	 * @param {object} param
	 * @param {Float32Array} param.data
	 * @param {GLenum} [param.usage]
	 */
	setVertexBuffer({ data, usage = this.gl.STATIC_DRAW }) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, usage);
	}

	/**
	 * @param {object} param
	 * @param {GLint} param.location
	 * @param {number} param.size
	 * @param {GLEnum} param.type
	 * @param {boolean} [param.normalized]
	 * @param {number} [param.stride]
	 * @param {number} [param.offset]
	 */
	setVertexArray({ location, size, type, normalized = false, stride = 0, offset = 0 }) {
		this.gl.bindVertexArray(this.vertexArray);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
		this.gl.enableVertexAttribArray(location);
		this.gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
	}

	/**
	 * @param {object} param
	 * @param {GLenum} param.module
	 * @param {number} [param.first]
	 * @param {number} param.count
	 */
	bindAndDrawArrays({ module, first = 0, count }) {
		this.gl.bindVertexArray(this.vertexArray);
		this.gl.drawArrays(module, first, count);
	}
}

export default GLPipeline;
