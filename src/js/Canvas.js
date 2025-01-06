import CanvasOptions from "./CanvasOption";

class Canvas extends CanvasOptions {
	/**
	 * 애니메이션을 실행할 캔버스 클래스
	 * @param {string} canvasId
	 */
	constructor(canvasId) {
		super(canvasId);
	}

	init() {
		this.canvas.width = this.canvasCssWidth * this.dpr;
		this.canvas.height = this.canvasCssHeight * this.dpr;

		this.canvas.style.width = `${this.canvasCssWidth}px`;
		this.canvas.style.height = `${this.canvasCssHeight}px`;

		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	}
}

export default Canvas;
