import { throwError, isNull } from "./utils";
import { SCREEN, ERROR_MSG } from "./constants";

class CanvasOption {
	/**
	 * 캔버스 기본 설정을 관리하고 초기화하는 클래스
	 * @param {string} canvasId
	 */
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		if (isNull(this.canvas)) throwError(ERROR_MSG.NO_CANVAS);
		this.gl = this.canvas.getContext("webgl2");
		if (isNull(this.canvas)) throwError(ERROR_MSG.NO_WEBGL2);

		this.setCanvasOptionSizeVars();
	}

	setCanvasOptionSizeVars() {
		this.dpr = Math.min(Math.round(devicePixelRatio), SCREEN.MAX_DPR) || 1;
		this.canvasCssWidth = innerWidth;
		this.canvasCssHeight = innerHeight;
	}
}

export default CanvasOption;
