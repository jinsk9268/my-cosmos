import { useTextureStore } from "@/js/store.js";

class GLTexture {
	/**
	 * GL용 텍스쳐 생성 및 관리
	 * @param {WebGL2RenderingContext} gl
	 * @param {ImageData[]} textureImageData
	 */
	constructor(gl) {
		this.gl = gl;
		this.glTextures = null;
	}

	generateGLTextures() {
		if (this.glTextures) this.gl.deleteTexture(this.glTextures);

		const { textCanvasDatas } = useTextureStore.getState();

		this.glTextures = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.glTextures);

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
}

export default GLTexture;
