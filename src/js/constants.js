import { numArrToF32Arr, rgbToGLRgb } from "@/js/gl/glUtils.js";
import { degreeToRadian } from "@/js/utils.js";

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

// gl 화면 관련 상수 ---------------------
export const PERSPECTIVE_CAMERA = {
	FOV: degreeToRadian(45),
	NEAR: 0.1,
	FAR: 100,
	EYE: [0, -20, 40],
	CENTER: [0, 0, 0],
	UP: [0, 1, 0],
	SPEED_RATE: 0.01,
	ZOOM_MIN: 1,
	ZOOM_MAX: 50,
	ZOOM_OFFSET: 7,
};

export const MODEL = {
	CENTER: [0, 0, 0],
};

// 유니폼 타입 관련 상수 ---------------------
export const UNIFORM_TYPE = {
	UNIFORM_1_F: "uniform1f",
	UNIFORM_2_FV: "uniform2fv",
	UNIFORM_3_FV: "uniform3fv",
	UNIFORM_4_FV: "uniform4fv",
	UNIFORM_1_I: "uniform1i",
};

// Texture 관련 상수 ---------------------
export const TEXTURE = {
	FONT_FAMILY: "Dongle",
	DIVISOR_RATE: 0.52,
	CANVAS_SIZE_RATE: 0.1,
};

// 홈 background 관련 상수 ---------------------
export const BACKGROUND = {
	// aurora
	AURORA: {
		POS: numArrToF32Arr([-1, -1, 1, -1, -1, 1, 1, 1]),
		UNIFORMS: {
			smooth_min: -1,
			smooth_max: 2.8,
			weight_time_speed: 0.6,
			weight_min: 0.2,
			weight_max: 0.75,
			octaves: 6,
			frequency_multiplier: 2,
			amplitude_multiplier: 0.5,
			texture_scale: 3,
		},
	},
	// star
	STAR: {
		QTY: 2000,
		THETA_OFFSET: 0.55,
		RADIUS_MIN: 0,
		RADIUS_SCALE: 2,
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
	NO_CTX: "Canvas 2d Context 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
	NO_NAME: "1~10 글자의 이름 또는 닉네임을 입력해주세요.",
	NO_UNIFORM_TYPE:
		"값의 유니폼 타입이 존재하지 않습니다. 해당 타입을 생성하거나 value를 다시 확인해주세요.",
};

// 메시지 상수 ---------------------
export const MSG = {
	CANCLE_BG_ANIMATION: "홈 배경 애니메이션 중지",
	START_BG_ANIMATION: "홈 배경 애니메이션 시작",
};

// 은하 모형 관련 상수 ---------------------
export const SHAPE_TYPE = {
	SPHERE: { qty: 1250, needTexture: true, radius: 8 },
	FERMAT_SPIRAL: {
		qty: 6500,
		needTexture: true,
		thetaOffset: 0.9,
		radiusMin: 50,
		scale: 10,
		twoWay: false,
	},
	SPIRAL_ARM_2: {
		qty: 10000,
		needTexture: true,
		numArms: 2,
		thickness: 1,
		coreXDist: 2,
		coreYDist: 2,
		outerCoreXDist: 5,
		outerCoreYDist: 5,
		armXDist: 4,
		armYDist: 2,
		armXMean: 8,
		armYMean: 4,
		spiral: 2,
		arms: 2,
	},
	SPIRAL_ARM_4: {
		qty: 10000,
		needTexture: true,
		numArms: 4,
		thickness: 1,
		coreXDist: 1,
		coreYDist: 1,
		outerCoreXDist: 4,
		outerCoreYDist: 4,
		armXDist: 4,
		armYDist: 2,
		armXMean: 8,
		armYMean: 4,
		spiral: 3,
		arms: 2,
	},
	SPIRAL_ARM_5: {
		qty: 10000,
		needTexture: true,
		numArms: 5,
		thickness: 1,
		coreXDist: 3,
		coreYDist: 3,
		outerCoreXDist: 5,
		outerCoreYDist: 5,
		armXDist: 4,
		armYDist: 2,
		armXMean: 8,
		armYMean: 4,
		spiral: 2,
		arms: 3,
	},
};
