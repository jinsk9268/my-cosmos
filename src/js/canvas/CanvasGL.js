import CanvasOption from "@/js/canvas/CanvasOption.js";
import { isNull } from "@/js/utils.js";
import { ANIMATION, ERROR_MSG } from "@/js/constants.js";

class CanvasGL extends CanvasOption {
	/**
	 * GL설정 및 애니메이션 관리
	 * @param {string} canvasId
	 */
	constructor(canvasId) {
		super(canvasId);
		this.gl = this.canvas.getContext("webgl2", { debug: true });
		if (isNull(this.gl)) throwError(ERROR_MSG.NO_WEBGL2);

		this.gl.enable(this.gl.DEPTH_TEST);
		this.setCanvasGLSize();

		this.fps = ANIMATION.FPS;
		this.interval = 1000 / this.fps;
		this.animationId = null;
		this.animationFunc = null;
	}

	setCanvasGLSize() {
		this.initCanvasOptionSizeVars();

		this.gl.canvas.width = this.canvasCssWidth * this.dpr;
		this.gl.canvas.height = this.canvasCssHeight * this.dpr;

		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.aspect = this.gl.canvas.width / this.gl.canvas.height;
	}

	renderAnimation() {
		let then = document.timeline?.currentTime || performance.now();

		const frame = (now) => {
			const delta = now - then;

			if (delta >= this.interval) {
				const uTime = now * 0.001;
				this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

				this.animationFunc(uTime);

				then = now - (delta % this.interval);
			}

			this.animationId = requestAnimationFrame(frame);
		};

		this.animationId = requestAnimationFrame(frame);
	}

	cancelAnimation() {
		cancelAnimationFrame(this.animationId);
		this.animationId = null;
	}
}

export default CanvasGL;
