import { throwError } from "@/js/utils.js";

class GLPipeline {
	/**
	 * WebGL 파이프라인 관리 (shader, program, buffer, vao 생성 및 관리)
	 * @param {WebGL2RenderingContext} gl
	 * @param {string} vertexSource
	 * @param {string} fragmentSource
	 */
	constructor(gl, vertexSource, fragmentSource) {
		this.gl = gl;
		this.vertexShader = this.createShader(vertexSource, gl.VERTEX_SHADER);
		this.fragmentShader = this.createShader(fragmentSource, gl.FRAGMENT_SHADER);
		this.program = this.createProgram(this.vertexShader, this.fragmentShader);
		this.vertexBuffer = this.gl.createBuffer();
		this.vertexArray = this.gl.createVertexArray();
	}

	/**
	 * @param {string} source GLSL 소스 코드
	 * @param {gl.VERTEX_SHADER | gl.FRAGMENT_SHADER} type
	 * @returns {WebGLShader} shader 생성 성공 시 vertexShader or fragmentShader 반환 | 실패 시 에러 처리
	 */
	createShader(source, type) {
		const shader = this.gl.createShader(type);
		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);

		if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) return shader;

		const errorMsg = this.gl.getShaderInfoLog(shader);
		this.gl.deleteShader(shader);
		throwError(errorMsg);
	}

	/**
	 * @param {WebGLShader} vertexShader
	 * @param {WebGLShader} fragmentShader
	 * @returns {WebGLProgram} program 생성 성공 시 program 반환 | 실패 시 에러 처리
	 */
	createProgram(vertexShader, fragmentShader) {
		const program = this.gl.createProgram();
		this.gl.attachShader(program, vertexShader);
		this.gl.attachShader(program, fragmentShader);
		this.gl.linkProgram(program);

		if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) return program;

		const errorMsg = this.gl.getProgramInfoLog(program);
		this.gl.deleteProgram(program);
		throwError(errorMsg);
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

	deleteGLDatas() {
		this.gl.deleteBuffer(this.vertexBuffer);
		this.vertexBuffer = this.gl.createBuffer();

		this.gl.deleteVertexArray(this.vertexArray);
		this.vertexArray = this.gl.createVertexArray();
	}
}

export default GLPipeline;
