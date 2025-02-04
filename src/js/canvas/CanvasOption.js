import { throwError, isNull } from "@/js/utils.js";
import { SCREEN, ERROR_MSG } from "@/js/constants.js";

class CanvasOption {
	/**
	 * 캔버스 기본 설정을 관리하고 초기화하는 클래스
	 * @param {string} canvasId
	 */
	constructor(canvasId = null) {
		this.canvas = isNull(canvasId)
			? document.createElement("canvas")
			: document.getElementById(canvasId);
		if (isNull(this.canvas)) throwError(ERROR_MSG.NO_CANVAS);
	}

	initCanvasOptionSizeVars(width = innerWidth, height = innerHeight) {
		this.dpr = Math.min(Math.round(devicePixelRatio), SCREEN.MAX_DPR) || 1;
		this.canvasCssWidth = width;
		this.canvasCssHeight = height;

		this.canvas.style.width = `${this.canvasCssWidth}px`;
		this.canvas.style.height = `${this.canvasCssHeight}px`;
	}
}

export default CanvasOption;
