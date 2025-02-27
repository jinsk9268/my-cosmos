import { numArrToF32Arr, rgbToGLRgb } from "@/js/utils.js";
import { degreeToRadian } from "@/js/utils.js";

// 공통 상수 ---------------------
export const SCREEN = {
	MAX_DPR: 3,
	IOS: /Mac|iPhone|iPad|iPod/i,
	RESIZE_DELAY: 200,
	TABLET_OR_SMALLER: 768,
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
	EYE_START: [0, -25, 1],
	EYE_END_Z: 25,
	TABLET_END_Z: 50,
	CENTER: [0, -2, 0],
	UP: [0, 1, 0],
	SPEED_RATE: 0.01,
	ZOOM_NEAR: 1,
	ZOOM_FAR: 50,
	ZOOM_OFFSET: 1,
	Z_SPEED_FACTOR: 0.0005,
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

// background 관련 상수 ---------------------
export const HOME_BACKGROUND = {
	POS: numArrToF32Arr([-1, -1, 1, -1, -1, 1, 1, 1]), // 좌하, 우하, 좌상, 우상
	STAR: {
		QTY: 4000,
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

export const COMSMOS_BACKGROUND = {
	STAR_QTY: 25000,
	POS: numArrToF32Arr([
		// 앞쪽 (좌상, 우상, 좌하, 우하)
		-1, 1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1,
		// 오른쪽 (좌상, 우상, 좌하, 우하)
		1, 1, 1, 1, 1, -1, 1, -1, 1, 1, -1, -1,
		// 뒤쪽 (좌상, 우상, 좌하, 우하)
		1, 1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1,
		// 왼쪽 (좌상, 우상, 좌하, 우하)
		-1, 1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1,
		// 위쪽 (좌상, 우상, 좌하, 우하)
		-1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, 1,
		// 아래쪽 (좌상, 우상, 좌하, 우하)
		-1, -1, -1, -1, -1, 1, 1, -1, -1, 1, -1, 1,
	]),
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
		outerCoreXDist: 10,
		outerCoreYDist: 10,
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
