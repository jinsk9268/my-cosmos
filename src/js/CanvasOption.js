import { checkError, isNull } from "./utils";
import { SCREEN } from "./constants";

class CanvasOption {
	/**
	 * 캔버스 기본 설정을 관리하고 초기화하는 클래스
	 * @param {string} canvasId
	 */
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		checkError(isNull(this.canvas), "캔버스 객체를 발견하지 못했습니다. 다시 확인해주세요.");
		this.gl = this.canvas.getContext("webgl2");
		checkError(isNull(this.canvas), "WebGL2를 지원하지 않는 브라우저입니다.");

		this.initCanvasOptionVars();
	}

	initCanvasOptionVars() {
		this.dpr = Math.min(Math.round(devicePixelRatio), SCREEN.MAX_DPR) || 1;
		this.canvasCssWidth = innerWidth;
		this.canvasCssHeight = innerHeight;
	}
}

export default CanvasOption;
