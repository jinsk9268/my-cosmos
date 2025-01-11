import { rgbToGL } from "./gl/glUtils";

/** 공통 상수 */
export const SCREEN = {
	MAX_DPR: 3,
};

/** 홈 background 관련 상수 */
const STATIC_STAR_QTY = 400;
const MOVING_STAR_QTY = 200;
export const BACKGROUND = {
	// js
	STATIC_STAR_QTY,
	MOVING_STAR_HALF_QTY: STATIC_STAR_QTY + MOVING_STAR_QTY / 2,
	STAR_QTY: STATIC_STAR_QTY + MOVING_STAR_QTY,
	// glsl - aurora
	AURORA_COLORS: [
		rgbToGL([91.0, 72.0, 145.0]),
		rgbToGL([0.0, 66.0, 172.0]),
		rgbToGL([0.0, 0.0, 0.0]),
	].flat(),
	AURORA_POS: new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]),
	// glsl - star
	INTENSITY: 60.0,
	BASE_SIZE: 1.0,
	SIZE_OFFSET: 3.0,
	STAR_COLORS: [
		rgbToGL([225.0, 255.0, 255.0]),
		rgbToGL([159.0, 217.0, 255.0]),
		rgbToGL([225.0, 161.0, 255.0]),
	].flat(),
	MIN_POS: 0.0001,
	MAX_POS: 0.0003,
	NEW_Y: 0.5,
};

/** 에러 메시지 상수 */
export const ERROR_MSG = {
	NO_CANVAS: "캔버스 객체를 발견하지 못했습니다. 다시 확인해주세요.",
	NO_WEBGL2: "WebGL2를 지원하지 않는 브라우저입니다.",
};
