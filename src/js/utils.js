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
