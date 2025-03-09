import { throwError, isNull } from "@/js/utils.js";
import { SCREEN, ERROR_MSG } from "@/js/constants.js";
import { useTextureStore } from "@/js/store.js";

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
		const isIPhone = SCREEN.I_PHONE.test(navigator.userAgent) && navigator.maxTouchPoints > 0;
		const bottomBarHeightDiff = isIPhone
			? document.documentElement.scrollHeight - visualViewport.height
			: 0;

		this.dpr = Math.min(Math.round(devicePixelRatio), SCREEN.MAX_DPR) || 1;
		this.canvasCssWidth = width;
		this.canvasCssHeight = height + bottomBarHeightDiff;

		this.canvas.style.width = `${this.canvasCssWidth}px`;
		this.canvas.style.height = `${this.canvasCssHeight}px`;

		const { setIsTabletOrSmaller } = useTextureStore.getState();
		setIsTabletOrSmaller(innerWidth <= SCREEN.TABLET_OR_SMALLER);
	}
}

export default CanvasOption;
