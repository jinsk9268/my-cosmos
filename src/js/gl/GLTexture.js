import { useTextureStore } from "@/js/store.js";

class GLTexture {
	/**
	 * GL용 텍스쳐 생성 및 관리
	 * @param {WebGL2RenderingContext} gl
	 */
	constructor(gl) {
		this.gl = gl;
		this.glTextures = null;
	}

	generateGLTexture2DArray() {
		if (this.glTextures) {
			this.gl.deleteTexture(this.glTextures);
		}

		this.glTextures = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.glTextures);

		const { textCanvasDatas } = useTextureStore.getState();
		const { width, height } = textCanvasDatas[0];
		const depth = textCanvasDatas.length;

		this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

		this.gl.texImage3D(
			this.gl.TEXTURE_2D_ARRAY,
			0,
			this.gl.RGBA8,
			width,
			height,
			depth,
			0,
			this.gl.RGBA,
			this.gl.UNSIGNED_BYTE,
			null,
		);

		textCanvasDatas.forEach((canvas, idx) => {
			this.gl.texSubImage3D(
				this.gl.TEXTURE_2D_ARRAY,
				0,
				0,
				0,
				idx,
				width,
				height,
				1,
				this.gl.RGBA,
				this.gl.UNSIGNED_BYTE,
				canvas,
			);
		});

		this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
	}

	/**
	 * @param {GLenum} textureUnit
	 * @param {GLint} location
	 * @param {number} unitNum
	 */
	activeTexture2DArray(textureUnit, location, unitNum) {
		this.gl.activeTexture(textureUnit);
		this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.glTextures);
		this.gl.uniform1i(location, unitNum);
	}
}

export default GLTexture;
