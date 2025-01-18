import { numArrToF32Arr, rgbToGLRgb } from "./gl/glUtils";

// 공통 상수 ---------------------
export const SCREEN = {
	MAX_DPR: 3,
};

export const ANIMATION = {
	FPS: 60,
};

// Hash 관련 상수 ---------------------
const MY_COSMOS = "my-cosmos";
export const LOCATION_HASH = {
	HOME: "home",
	MY_COSMOS,
	HASH_MY_COSMOS: `#${MY_COSMOS}`,
};

export const UNIFORM_TYPE = {
	UNIFORM_1_F: "uniform1f",
	UNIFORM_2_FV: "uniform2fv",
	UNIFORM_3_FV: "uniform3fv",
	UNIFORM_4_FV: "uniform4fv",
	UNIFORM_1_I: "uniform1i",
};

// 홈 background 관련 상수 ---------------------
const STATIC_STAR_QTY = 500;
const MOVING_STAR_QTY = 300;
export const BACKGROUND = {
	// aurora
	AURORA_POS: numArrToF32Arr([-1, -1, 1, -1, -1, 1, 1, 1]),
	AURORA_UNIFORMS: {
		color_min: 0.5,
		color_max: 0.5,
		base: numArrToF32Arr([0, 0, 0, 0]),
		smooth_min: -1,
		smooth_max: 2,
		weight_time_speed: 0.75,
		weight_min: 0.2,
		weight_max: 0.6,
		color_alpha: 0.94,
	},
	// star
	STATIC_STAR_QTY,
	MOVING_STAR_HALF_QTY: STATIC_STAR_QTY + MOVING_STAR_QTY / 2,
	STAR_QTY: STATIC_STAR_QTY + MOVING_STAR_QTY,
	STAR_UNIFORMS_V: {
		intensity: 60,
		base_size: 0.9,
		size_offset: 3.1,
		brightness_base: 0.5,
	},
	STAR_UNIFORMS_F: {
		colors: [
			[204, 204, 255],
			[159, 217, 255],
			[225, 161, 255],
		].map((arr) => rgbToGLRgb(arr)),
		alpha_min: 0.1,
		alpha_max: 1,
	},
	MIN_POS: 0.0001,
	MAX_POS: 0.0003,
	NEW_Y: 0.5,
};

// 에러 메시지 상수 ---------------------
export const ERROR_MSG = {
	NO_CANVAS: "캔버스 객체를 발견하지 못했습니다. 다시 확인해주세요.",
	NO_WEBGL2: "WebGL2를 지원하지 않는 브라우저입니다.",
	NO_NAME: "1~10 글자의 이름 또는 닉네임을 입력해주세요.",
	NO_UNIFORM_TYPE:
		"값의 유니폼 타입이 존재하지 않습니다. 해당 타입을 생성하거나 value를 다시 확인해주세요.",
};

// 메시지 상수 ---------------------
export const MSG = {
	CANCLE_BG_ANIMATION: "홈 배경 애니메이션 중지",
	START_BG_ANIMATION: "홈 배경 애니메이션 시작",
};
