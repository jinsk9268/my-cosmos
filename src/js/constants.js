import { numArrToF32Arr, rgbToGLRgb } from "@/js/utils.js";
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
	FOV: degreeToRadian(60),
	NEAR: 0.1,
	FAR: 100,
	EYE_START: [0, -20, 1],
	EYE_END: [0, -25, 35],
	CENTER: [0, -2, 0],
	UP: [0, 1, 0],
	SPEED_RATE: 0.01,
	ZOOM_MIN: 1,
	ZOOM_MAX: 50,
	ZOOM_OFFSET: 7,
};

export const MODEL = {
	CENTER: [0, 0, 0],
};

// Texture 관련 상수 ---------------------
export const TEXTURE = {
	FONT_FAMILY: "Dongle",
	DIVISOR_RATE: 0.56,
	CANVAS_SIZE_RATE: 0.1,
};

// 홈 background 관련 상수 ---------------------
export const BACKGROUND = {
	// aurora
	AURORA: {
		POS: numArrToF32Arr([-1, -1, 1, -1, -1, 1, 1, 1]),
	},
	// star
	STAR: {
		QTY: 2000,
		THETA_OFFSET: 0.55,
		RADIUS_MIN: 0,
		RADIUS_SCALE: 2,
		U_COLORS: numArrToF32Arr(
			[
				[204, 204, 255],
				[159, 217, 255],
				[225, 161, 255],
			]
				.map((arr) => rgbToGLRgb(arr))
				.flat(),
		),
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
	FERMAT_SPIRAL_CYCLONE: {
		qty: 8000,
		needTexture: true,
		thetaOffset: 0.55,
		radiusMin: 50,
		scale: 6.5,
		twoWay: true,
	},
	FERMAT_SPIRAL_TORUS: {
		qty: 8000,
		needTexture: true,
		thetaOffset: 0.25,
		radiusMin: 60,
		scale: 6,
		twoWay: true,
	},
	FERMAT_SPIRAL_WHIRL: {
		qty: 7000,
		needTexture: true,
		thetaOffset: 0.9,
		radiusMin: 65,
		scale: 7,
		twoWay: false,
	},
	SPIRAL_ARM_2: {
		qty: 7000,
		needTexture: true,
		numArms: 2,
		thickness: 1,
		coreXDist: 2,
		coreYDist: 2,
		outerCoreXDist: 8,
		outerCoreYDist: 8,
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
		coreXDist: 2,
		coreYDist: 2,
		outerCoreXDist: 5,
		outerCoreYDist: 5,
		armXDist: 8,
		armYDist: 4,
		armXMean: 8,
		armYMean: 4,
		spiral: 3,
		arms: 3,
	},
	SPIRAL_ARM_5: {
		qty: 10000,
		needTexture: true,
		numArms: 5,
		thickness: 1,
		coreXDist: 2,
		coreYDist: 2,
		outerCoreXDist: 5,
		outerCoreYDist: 5,
		armXDist: 10,
		armYDist: 2,
		armXMean: 6,
		armYMean: 4,
		spiral: 2,
		arms: 5,
	},
	SPIRAL_ARM_6: {
		qty: 12000,
		needTexture: true,
		numArms: 6,
		thickness: 1,
		coreXDist: 4,
		coreYDist: 2,
		outerCoreXDist: 10,
		outerCoreYDist: 5,
		armXDist: 10,
		armYDist: 2,
		armXMean: 6,
		armYMean: 4,
		spiral: 3,
		arms: 2,
	},
};
