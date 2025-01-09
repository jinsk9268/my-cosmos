import { rgbToGL } from "./gl/glUtils";

/** 공통 상수 */
export const SCREEN = {
	MAX_DPR: 3,
};

/** 홈 background 관련 상수 */
export const BACKGROUND = {
	// js
	STAR_QTY: 500,
	RAIN_STAR_QTY: 200,
	// glsl
	INTENSITY: 60.0,
	BASE_SIZE: 1.0,
	SIZE_OFFSET: 4.0,
	BG_R: 0.0,
	BG_G: 0.0,
	BG_B: 0.0,
	BG_A: 1.0,
	BASE_FACTOR: 0.5,
	TIME_OFFSET: 2.0,
	STAR_COLOR_1: rgbToGL([159.0, 217.0, 255.0]),
	STAR_COLOR_2: rgbToGL([0.0, 66.0, 172.0]),
	STAR_COLOR_3: rgbToGL([225.0, 161.0, 255.0]),
	MIN_POS: 0.0001,
	MAX_POS: 0.0005,
	NEW_Y: 0.5,
};

/** 에러 메시지 상수 */
export const ERROR_MSG = {
	NO_CANVAS: "캔버스 객체를 발견하지 못했습니다. 다시 확인해주세요.",
	NO_WEBGL2: "WebGL2를 지원하지 않는 브라우저입니다.",
};
