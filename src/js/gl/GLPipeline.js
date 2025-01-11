import { createShader, createProgram } from "./glUtils";

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
	 * @param {Float32Array} data
	 * @param {GLenum} [usage]
	 * @param {GLenum} [bufferType]
	 * @returns {WebGLBuffer} WebGL buffer 생성하여 반환
	 */
	createBuffer(data, usage = this.gl.STATIC_DRAW, bufferType = this.gl.ARRAY_BUFFER) {
		const buffer = this.gl.createBuffer();
		this.gl.bindBuffer(bufferType, buffer);
		this.gl.bufferData(bufferType, data, usage);

		return buffer;
	}

	/**
	 * @param {WebGLBuffer} buffer
	 * @param {number} offset
	 * @param {Float32Array} data 새로 갱신할 데이터
	 */
	bindBufferSubData(buffer, offset, data) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, offset, data);
	}

	/**
	 * @param {object} param
	 * @param {GLint} param.location
	 * @param {number} param.size
	 * @param {GLEnum} param.type
	 * @param {boolean} [param.normalized]
	 * @param {number} [param.stride]
	 * @param {number} [param.offset]
	 * @returns {WebGLVertexArrayObject} vertexArray 생성하여 반환
	 */
	createVertexArray({ location, size, type, normalized = false, stride = 0, offset = 0 }) {
		const vertexArray = this.gl.createVertexArray();
		this.gl.bindVertexArray(vertexArray);
		this.gl.enableVertexAttribArray(location);
		this.gl.vertexAttribPointer(location, size, type, normalized, stride, offset);

		return vertexArray;
	}

	/**
	 * @param {object} param
	 * @param {WebGLVertexArrayObject} param.vertexArray
	 * @param {GLenum} param.module
	 * @param {number} [param.first]
	 * @param {count} param.count
	 */
	bindAndDrawArrays({ vertexArray, module, first = 0, count }) {
		this.gl.bindVertexArray(vertexArray);
		this.gl.drawArrays(module, first, count);
	}
}

export default GLPipeline;
