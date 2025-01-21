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
const STAR_QTY = 1500;
const STAR_THETA_RATIO = 0.55;
export const BACKGROUND = {
	// aurora
	AURORA: {
		POS: numArrToF32Arr([-1, -1, 1, -1, -1, 1, 1, 1]),
		UNIFORMS: {
			color_min: 0.4,
			color_max: 0.5,
			base: numArrToF32Arr([0, 0, 0, 0]),
			smooth_min: -1,
			smooth_max: 2,
			weight_time_speed: 0.6,
			weight_min: 0.2,
			weight_max: 0.65,
			color_alpha: 0.94,
		},
	},
	// star
	STAR: {
		QTY: STAR_QTY,
		THETA_RATIO: STAR_THETA_RATIO,
		RADIUS_MIN: 0,
		RADIUS_MAX: Math.sqrt((STAR_QTY - 1) * STAR_THETA_RATIO),
		SADIUS_SCALE: 2,
		UNIFORMS_V: {
			intensity: 60,
			base_size: 0.5,
			size_offset: 3.5,
			brightness_base: 0.5,
		},
		UNIFORMS_F: {
			colors: [
				[204, 204, 255],
				[159, 217, 255],
				[225, 161, 255],
			].map((arr) => rgbToGLRgb(arr)),
			alpha_min: 0.1,
			alpha_max: 1,
		},
	},
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
