import CanvasOption from "@/js/canvas/CanvasOption.js";
import { isNull } from "@/js/utils";
import { TEXTURE, ERROR_MSG } from "@/js/constants.js";

const { FONT_FAMILY, DIVISOR_RATE, CANVAS_SIZE_RATE } = TEXTURE;

class CanvasTexture extends CanvasOption {
	constructor(inputValue) {
		super();
		this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
		if (isNull(this.ctx)) throwError(ERROR_MSG.NO_CTX);

		this.inputValue = inputValue;
		this.fontSizeDivisor = this.inputValue.length === 1 ? 1 : this.inputValue.length * DIVISOR_RATE;
		this.initCanvasAndFontSize();
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillStyle = "white";
	}

	initCanvasAndFontSize() {
		const size = Math.round((innerWidth + innerHeight) * CANVAS_SIZE_RATE);
		this.initCanvasOptionSizeVars(size, size);

		this.canvas.width = this.canvasCssWidth * this.dpr;
		this.canvas.height = this.canvasCssHeight * this.dpr;
		this.ctx.scale(this.dpr, this.dpr);

		this.fontSize = size / this.fontSizeDivisor;
		this.ctx.font = `${this.fontSize}px ${FONT_FAMILY}`;
	}

	createTextTexture() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillText(this.inputValue, this.canvasCssWidth / 2, this.canvasCssHeight / 2);

		return this.canvas;
	}
}

export default CanvasTexture;
