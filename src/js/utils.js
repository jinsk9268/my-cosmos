import { createNoise3D } from "simplex-noise";

/**
 * @param {boolean} isError
 * @param {string} message
 */
export function throwError(message) {
	throw new Error(message);
}

/**
 * @param {any} value
 * @returns {boolean} value가 null이면 true, 아니면 false를 반환
 */
export function isNull(value) {
	return value === null;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} min과 max 사이 랜덤한 수 반환
 */
export function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} min과 max 사이 랜덤한 정수 반환
 */
export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @param {number[]} arr
 * @returns {Float32Array} WebGL에 전달하기 위해 number 배열의 타입을 Float32Array로 변환해 반환
 */
export function numArrToF32Arr(arr = []) {
	return new Float32Array(arr);
}

/**
 * @param {number[]} rgb
 * @returns {number[]} RGB 컬러를 WebGL 자료형(Float32Array)에 맞게 변환해서 반환
 */
export function rgbToGLRgb(rgb) {
	return rgb.map((color) => color / 255);
}

/**
 * @param {number} degree
 * @returns {number} 라디안으로 변환한 값 반환
 */
export function degreeToRadian(degree) {
	return (degree * Math.PI) / 180;
}

/**
 * 가우시안(정규) 분포를 따르는 랜덤 값 생성
 * @param {number} [mean] 정규 분포의 평균(중심값)
 * @param {number} [stdev] 정규 분포의 표준편차 (standard deviation)
 * @returns {number} 지정된 평균과 표준편차를 따르는 정규 분포에서 생성된 랜덤 값 반환
 */
export function gaussianRandom(mean = 0, stdev = 1) {
	const u = 1 - Math.random();
	const v = Math.random();
	const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

	return z * stdev + mean;
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {number} noise 값 반환
 */
export function getNoise3d(x, y, z) {
	const noise3d = createNoise3D(Math.random);
	return noise3d(x, y, z);
}
